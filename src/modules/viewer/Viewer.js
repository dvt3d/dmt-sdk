import THREEScene from '../scene/THREEScene'
import { MapLib, THREE } from '../../name-space'
import { MapScene } from '@dvgis/maplibre-three-plugin'
import { SceneMode } from '../constant'
import Logo from '../../logo/Logo'

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

      const logo = new Logo(this._canvas, this._options)
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
      this._scene = new MapScene(this._map, {
        renderLoop: (ins) => {
          ins.renderer.resetState()
          ins.renderer.render(ins.scene, ins.camera)
          logo.update(ins.renderer)
        },
      })
    } else {
      const canvasContainer = document.createElement('div')
      canvasContainer.className = 'canvas-container'
      containerEl.appendChild(canvasContainer)
      this._canvas = document.createElement('canvas')
      this._canvas.style.width = containerEl.clientWidth + 'px'
      this._canvas.style.height = containerEl.clientHeight + 'px'
      canvasContainer.appendChild(this._canvas)
      this._scene = new THREEScene(this)
    }
    this._canvas.className = 'viewer-canvas'
  }

  get container() {
    return this._container
  }

  get map() {
    return this._map
  }

  get scene() {
    return this._scene
  }

  get only3d() {
    return this._only3d
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

  get defaultSceneLayer() {
    return 'map_scene_layer'
  }

  /**
   *
   * @param {*} baseLayer
   * @returns
   */
  addBaseLayer(baseLayer) {
    if (baseLayer) {
      if (this._baseLayerCache[baseLayer.id]) {
        throw 'the base layer already exists'
      }
      let hasSelected = false
      for (let key in this._baseLayerCache) {
        let item = this._baseLayerCache[key]
        hasSelected = hasSelected || item.selected
      }
      baseLayer.fire('add', this)
      this._baseLayerCache[baseLayer.id] = baseLayer
      if (!hasSelected) {
        baseLayer.selected = true
      }
    }
    return this
  }

  /**
   *
   * @param {*} baseLayer
   * @returns
   */
  removeBaseLayer(baseLayer) {
    return this
  }

  /**
   *
   * @param {*} index
   * @returns
   */
  changeBaseLayer(index) {
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
    if (
      this._baseLayerCache[currentId].provider.type === 'Style' &&
      this._baseLayerCache[nextId].provider.type !== 'Style'
    ) {
      const reloadLayers = () => {
        this._map.off('style.load', reloadLayers.bind(this))
        let layers = this.getLayers()
        for (let i = 0; i < layers.length; i++) {
          let layer = layers[i]
          delete this._layerCache[layer.id]
          this.addLayer(layer)
        }
      }
      this._map.on('style.load', reloadLayers.bind(this))
      this._map.setStyle(DEF_STYLE, { diff: false }) //remove all layer
    }
    this._baseLayerCache[currentId].selected = false
    this._baseLayerCache[nextId].selected = true
    return this
  }

  /**
   *
   * @param layer
   * @returns {Viewer}
   */
  addLayer(layer) {
    if (layer) {
      if (this._layerCache[layer.id]) {
        throw 'the layer already exists'
      }
      this._ready.then(() => {
        layer.fire('add', this)
        this._layerCache[layer.id] = layer
      })
    }
    return this
  }

  /**
   *
   * @param layer
   * @returns {Viewer}
   */
  removeLayer(layer) {
    if (layer) {
      if (!this._layerCache[layer.id]) {
        throw 'the layer not exists'
      }
      this._ready.then(() => {
        layer.fire('remove')
      })
    }
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
    return this
  }

  /**
   *
   * @param position
   * @returns {Viewer}
   */
  zoomToPosition(position) {
    return this
  }

  on(type, callback) {
    return this
  }

  off(type, callback) {
    return this
  }

  once() {}

  remove() {}
}

export default Viewer
