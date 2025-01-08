/**
 * @Author: Caven Chen
 */

import { MapLib } from '../../../name-space'
import { DomUtil } from '../../utils'
import Widget from '../Widget'
import { SceneMode } from '../../constant'
import { BaseLayerCollection } from '../../base-layer'

const DEF_STYLE = {
  version: 8,
  sources: {},
  layers: [],
}

class HawkEyeMap extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'widget hawk-eye-map')
    this._map = undefined
    this._promise = undefined
    this._baseLayerCollection = new BaseLayerCollection()
  }

  _mountContent() {
    this._map = new MapLib.Map({
      container: this._wrapper,
      style: DEF_STYLE,
    })
    this._promise = new Promise((resolve) => {
      this._map.once('style.load', (e) => {
        resolve()
      })
    })
    this._map.getCanvas().className = 'viewer-canvas'
    this._wrapper.className = this._wrapper.className.replace(
      ' maplibregl-map',
      ''
    )
    this._wrapper.firstElementChild.className = 'canvas-container'
    this._wrapper.removeChild(this._wrapper.lastElementChild)
    this._ready = true
  }

  _installHook() {
    if (this._viewer.sceneMode === SceneMode.MAP_SCENE) {
      const self = this
      Object.defineProperty(this._viewer, 'hawkEyeMap', {
        get() {
          return self
        },
      })
    }
  }

  _onMove() {
    this._map.jumpTo({
      center: this._viewer.map.getCenter().toArray(),
      zoom: this._viewer.map.getZoom(),
    })
  }

  _bindEvent() {
    this._map.resize()
    this._viewer.map.on('move', this._onMove.bind(this))
  }

  _unbindEvent() {
    this._viewer.map.off('move', this._onMove.bind(this))
  }

  /**
   *
   * @param baseLayer
   * @returns {HawkeyeMap}
   */
  addBaseLayer(baseLayer) {
    if (!this._map || !this._enabled || !this._promise) {
      return this
    }
    this._promise.then(() => {
      this._baseLayerCollection.removeAll()
      if (Array.isArray(baseLayer)) {
        baseLayer.forEach((item) => {
          this._baseLayerCollection.add(item)
        })
      } else {
        this._baseLayerCollection.add(baseLayer)
      }
      this._baseLayerCollection.fire('add', this._map)
      this._baseLayerCollection.selected = true
    })
    return this
  }
}

export default HawkEyeMap
