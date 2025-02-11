/**
 * @Author: Caven Chen
 */

import { MapLib, THREE } from '../../name-space'

import { MapScene } from '@dvgis/maplibre-three-plugin'
import THREEScene from '../scene/THREEScene'
import { SceneMode } from '../constant'
import { BaseLayerCollection, BaseLayerType } from '../base-layer'
import { LayerType } from '../layer'
import { MouseEvent } from '../event'
import { DomUtil } from '../utils'
import { createWidgets } from '../widget'
import { getParam } from '../../global-api'

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
    this._projection = this._options.projection || { type: 'mercator' }
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
        transformRequest: (url, type) => {
          const requestMap = getParam('request-map')
          if (requestMap) {
            for (let key in requestMap) {
              return requestMap[key](url)
            }
          }
          return { url }
        },
      })

      this._ready = new Promise((resolve) => {
        this._map.once('style.load', (e) => {
          this._map.setProjection(this._projection)
          resolve()
        })
      })
      this._canvas = this._map.getCanvas()

      /**
       * change the default container
       */
      containerEl.className = containerEl.className.replace(
        ' maplibregl-map',
        ''
      )
      containerEl.firstElementChild.className = 'canvas-container'
      containerEl.removeChild(containerEl.lastElementChild)
      this._scene = new MapScene(this._map, {
        renderLoop: (ins) => {
          ins.renderer.resetState()
          this.popup && this.popup.render(ins)
          this._domRenderer &&
            this._domRenderer &&
            this._hasDomLayer() &&
            this._domRenderer.render(ins.scene, ins.camera)
          ins.renderer.render(ins.scene, ins.camera)
        },
      })
    } else {
      const canvasContainer = DomUtil.create(
        'div',
        'canvas-container',
        containerEl
      )
      this._canvas = DomUtil.create('canvas', '', canvasContainer)
      this._canvas.style.width = containerEl.clientWidth + 'px'
      this._canvas.style.height = containerEl.clientHeight + 'px'
      this._scene = new THREEScene(this)
    }

    this._canvas.className = 'viewer-canvas'

    new MouseEvent(this)

    /**
     * Register the widgets
     */

    this._widgetContainer = DomUtil.create(
      'div',
      'widget-container',
      containerEl
    )
    const widgets = createWidgets()
    for (let key in widgets) {
      widgets[key].fire('install', this)
    }

    /**
     * Register the dom layer renderer
     */
    this._domRenderer = new THREE.CSS3DRenderer({
      element: DomUtil.create('div', 'dom-layer-container', containerEl),
    })
    this._domRenderer.setSize(
      this._canvas.clientWidth,
      this._canvas.clientHeight
    )
    window.addEventListener('resize', () => {
      this._domRenderer.setSize(
        this._canvas.clientWidth,
        this._canvas.clientHeight
      )
    })
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
    this._map.setProjection(this._projection)
  }

  _hasDomLayer() {
    for (let key in this._layerCache) {
      if (this._layerCache[key].type === LayerType.DOM) {
        return true
      }
    }
    return false
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
   * @param {*} sky
   * @returns {Viewer}
   */
  setSky(sky) {
    this._ready.then(() => {
      this._map.setSky(sky)
    })
    return this
  }

  /**
   *
   * @param projection
   * @returns {Viewer}
   */
  setProjection(projection) {
    if (this._sceneMode !== SceneMode.MAP_SCENE) {
      throw 'this scene mode not support the function'
    }
    this._ready.then(() => {
      this._map.setProjection(projection)
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

      let currentType = this._baseLayerCache[currentId].getType()
      let nextType = this._baseLayerCache[nextId].getType()

      //change to vector base layer, needs re-add the 2d layers
      if (nextType === BaseLayerType.STYLE) {
        this._map.once('style.load', () => {
          this._reAddLayers() // re-add 2d layers
        })
        this._baseLayerCache[nextId].selected = true
      } else {
        if (currentType !== BaseLayerType.STYLE) {
          // from raster to raster, no needs re-add the 2d layers
          this._baseLayerCache[nextId].selected = true
        } else {
          // from vector to raster, needs readd the 2d layers
          this._map.once('style.load', () => {
            this._reAddLayers() // re-add 2d layer
            this._baseLayerCache[nextId].selected = true
          })
          this._map.setStyle(DEF_STYLE, { diff: false }) //remove 2d layer
        }
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
    const filters = [LayerType.VECTOR, LayerType.CLUSTER, LayerType.GEOJSON]
    if (this._sceneMode === SceneMode.MAP_SCENE) {
      if (!filters.includes(layer.type)) {
        layer.fire('add', this)
      }
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
   * @param {*} id
   * @returns
   */
  getLayer(id) {
    return this._layerCache[id] || undefined
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
   * @param {*} id
   * @returns
   */
  hasLayer(id) {
    return !!this._layerCache[id]
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
   */
  remove() {}
}

export default Viewer
