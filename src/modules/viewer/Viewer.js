import THREEScene from '../scene/THREEScene'
import { MapLib, THREE } from '../../name-space'
import { MapScene } from '@dvgis/maplibre-three-plugin'
import { SceneMode } from '../constant'
import { BaseLayerCollection, BaseLayerType } from '../base-layer'
import { LayerType } from '../layer'
import { MouseEvent } from '../event'
import { DomUtil } from '../utils'
import { createWidgets } from '../widget'
import { getParam } from '../../global-api/index.js'

const DEF_STYLE = {
  version: 8,
  sources: {},
  layers: [],
}

const DEF_OPTS = {
  sceneMode: SceneMode.MAP_SCENE,
}

class Viewer {
  constructor(container, options = {}) {
    if (!getParam('isInitialized')) {
      throw 'the sdk is not initialized, please do the ready function '
    }
    this._container = container
    this._options = {
      ...DEF_OPTS,
      ...options,
    }
    this._sceneMode = this._options.sceneMode
    this._baseLayerCache = {}
    this._layerCache = {}
    this._ready = Promise.resolve()
    this._clock = new THREE.Clock()
    const containerEl =
      typeof container === 'string'
        ? document.getElementById(container)
        : container
    if (this._sceneMode === SceneMode.MAP_SCENE) {
      this._map = new MapLib.Map({
        container,
        style: DEF_STYLE,
        maxPitch: 85,
      })
      this._canvas = this._map.getCanvas()

      //rename class
      containerEl.className = containerEl.className.replace(
        ' maplibregl-map',
        ''
      )
      containerEl.firstElementChild.className = 'canvas-container'
      containerEl.removeChild(containerEl.lastElementChild)
      this._ready = new Promise((resolve) => {
        this._map.once('style.load', (e) => {
          resolve()
        })
      })
      this._scene = new MapScene(this._map, {})
    } else {
      const canvasContainer = DomUtil.create(
        'div',
        'canvas-container',
        containerEl
      )
      this._canvas = document.createElement('canvas')
      this._canvas.style.width = containerEl.clientWidth + 'px'
      this._canvas.style.height = containerEl.clientHeight + 'px'
      canvasContainer.appendChild(this._canvas)
      this._scene = new THREEScene(this)
    }
    this._canvas.className = 'viewer-canvas'

    // new MouseEvent(this)

    this._widgetContainer = DomUtil.create(
      'div',
      'widget-container',
      containerEl
    )
    const widgets = createWidgets()
    for (let key in widgets) {
      widgets[key].fire('install', this)
    }
  }

  get container() {
    return this._container
  }

  get widgetContainer() {
    return this._widgetContainer
  }

  get map() {
    return this._map
  }

  get sceneMode() {
    return this._sceneMode
  }

  get scene() {
    return this._scene
  }

  get ready() {
    return this._ready
  }

  get canvas() {
    return this._canvas
  }

  get clock() {
    return this._clock
  }

  _reAddLayers() {
    this.getLayers()
      .filter((layer) =>
        [LayerType.VECTOR, LayerType.CLUSTER, LayerType.GEOJSON].includes(
          layer.type
        )
      )
      .forEach((layer) => {
        layer.fire('add', this)
      })
  }

  /**
   *
   * @param terrain
   * @returns {Viewer}
   */
  setTerrain(terrain) {
    return this
  }

  /**
   *
   * @param type
   * @returns {Viewer}
   */
  setProjection(type) {
    if (this._sceneMode !== SceneMode.MAP_SCENE) {
      throw 'this scene mode not support the function'
    }
    this._ready.then(() => {
      this._map.setProjection({
        type,
      })
    })
    return this
  }

  /**
   *
   * @param baseLayer
   * @param options
   * @returns {Viewer}
   */
  addBaseLayer(baseLayer, options = {}) {
    if (!baseLayer) {
      return this
    }

    if (this._sceneMode !== SceneMode.MAP_SCENE) {
      throw 'this scene mode not support the function'
    }

    if (this._baseLayerCache[baseLayer.id]) {
      throw `the base layer ${baseLayer.id} already exists`
    }
    if (
      Array.isArray(baseLayer) &&
      baseLayer.find((item) => item.type === BaseLayerType.STYLE)
    ) {
      throw `the style layer do not support multiple simultaneous loads`
    }

    this._ready.then(() => {
      const baseLayerCollection = new BaseLayerCollection()
      if (Array.isArray(baseLayer)) {
        baseLayer.forEach((item) => {
          baseLayerCollection.add(item)
        })
      } else {
        baseLayerCollection.add(baseLayer)
      }
      if (this._baseLayerCache[baseLayerCollection.getId()]) {
        throw `the base layer already exists`
      }
      baseLayerCollection.fire('add', this._map)
      this._baseLayerCache[baseLayerCollection.getId()] = baseLayerCollection
      this['baseLayerPicker'].addBaseLayer({
        iconUrl: options.iconUrl,
        name: options.name,
      })
      //If no base layer is selected in the viewer, the first one will be selected by default.
      let hasSelected = false
      for (let key in this._baseLayerCache) {
        hasSelected = hasSelected || this._baseLayerCache[key].selected
      }
      if (!hasSelected) {
        if (baseLayerCollection.getType() === BaseLayerType.STYLE) {
          this._map.once('style.load', this._reAddLayers.bind(this))
        } else {
          this._reAddLayers()
        }
        baseLayerCollection.selected = true
      }
    })
    return this
  }

  /**
   *
   * @param {*} baseLayer
   * @returns
   */
  removeBaseLayer(baseLayer) {
    if (!baseLayer) {
      return this
    }
    if (this._sceneMode !== SceneMode.MAP_SCENE) {
      throw 'this scene mode not support the function'
    }
    if (!this._baseLayerCache[baseLayer.id]) {
      throw `the baseLayer not exits`
    }
    this._ready.then(() => {
      baseLayer.fire('remove')
      delete this._baseLayerCache[baseLayer.id]
    })
    return this
  }

  /**
   *
   * @param {*} index
   * @returns
   */
  changeBaseLayer(index) {
    if (this._sceneMode !== SceneMode.MAP_SCENE) {
      throw 'this scene mode not support the function'
    }
    this._ready.then(() => {
      let currentId = undefined
      let nextId = undefined
      Object.keys(this._baseLayerCache).forEach((layerId, keyIndex) => {
        if (this._baseLayerCache[layerId].selected) {
          currentId = layerId
        }
        if (keyIndex === index) {
          nextId = layerId
        }
      })
      if (!currentId || !nextId) {
        return this
      }
      if (currentId === nextId) {
        return this
      }
      this._baseLayerCache[currentId].selected = false
      //change vector base layer, needs reAdd the 2d layers
      if (this._baseLayerCache[currentId].getType() === BaseLayerType.STYLE) {
        const _this = this
        if (this._baseLayerCache[nextId].getType() === BaseLayerType.STYLE) {
          this._map.once('style.load', () => {
            _this._reAddLayers() // reAdd all layers
          })
          _this._baseLayerCache[nextId].selected = true
        } else {
          this._map.once('style.load', () => {
            _this._reAddLayers() // reAdd all layers
            _this._baseLayerCache[nextId].selected = true
          })
          this._map.setStyle(DEF_STYLE, { diff: false }) //remove all layer
        }
      } else {
        this._baseLayerCache[nextId].selected = true
      }
    })
    return this
  }

  /**
   *
   * @param layer
   * @returns {Viewer}
   */
  addLayer(layer) {
    if (!layer) {
      return this
    }
    if (this._layerCache[layer.id]) {
      throw `the layer ${layer.id} already exists`
    }
    if (this._sceneMode === SceneMode.MAP_SCENE) {
      this._layerCache[layer.id] = layer
    } else {
      layer.fire('add', this)
      this._layerCache[layer.id] = layer
    }
    return this
  }

  /**
   *
   * @param layer
   * @returns {Viewer}
   */
  removeLayer(layer) {
    if (!layer) {
      return this
    }
    if (!this._layerCache[layer.id]) {
      throw `the layer ${layer.id} not exists`
    }
    layer.fire('remove')
    return this
  }

  /**
   *
   * @returns {*[]}
   */
  getLayers() {
    let result = []
    for (let key in this._layerCache) {
      result.push(this._layerCache[key])
    }
    return result
  }

  /**
   *
   * @param method
   * @param context
   * @returns {Viewer}
   */
  eachLayer(method, context) {
    return this
  }

  /**
   *
   * @param position
   * @returns {Viewer}
   */
  flyToPosition(position) {
    if (this._sceneMode === SceneMode.MAP_SCENE) {
      // this._map.easeTo({})
    }
    return this
  }

  /**
   *
   * @param position
   * @returns {Viewer}
   */
  zoomToPosition(position) {
    // if (this._sceneMode === SceneMode.MAP_SCENE) {
    // } else {
    // }
    return this
  }

  /**
   *
   * @param type
   * @param callback
   * @returns {Viewer}
   */
  on(type, callback) {
    return this
  }

  /**
   *
   * @param type
   * @param callback
   * @returns {Viewer}
   */
  off(type, callback) {
    return this
  }

  /**
   *
   * @param type
   * @param callback
   * @returns {Viewer}
   */
  once(type, callback) {
    return this
  }

  /**
   *
   */
  remove() {}
}

export default Viewer
