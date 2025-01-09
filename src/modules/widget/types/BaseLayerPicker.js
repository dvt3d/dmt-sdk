/**
 * @Author: Caven Chen
 */

import Widget from '../Widget'
import { DomUtil } from '../../utils'
import { SceneMode } from '../../constant'

class BaseLayerPicker extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'widget base-layer-picker')
    this._baseLayers = []
  }

  _mountContent() {
    const self = this
    this._wrapper.onmouseover = () => {
      let width = 80
      let rightMargin = 5
      if (self._baseLayers.length > 0) {
        width = self._baseLayers.length * (width + rightMargin) - rightMargin
      }
      self._wrapper.style.width = `${width}px`
    }
    this._wrapper.onmouseout = () => {
      self._wrapper.style.width = '80px'
    }
    this._ready = true
  }

  _installHook() {
    if (this._viewer.sceneMode === SceneMode.MAP_SCENE) {
      const self = this
      Object.defineProperty(this._viewer, 'baseLayerPicker', {
        get() {
          return self
        },
      })
      this.enabled = true
    }
  }

  _addBaseLayer(baseLayer) {
    const self = this
    this._baseLayers.push(baseLayer)
    const baseLayerEl = DomUtil.create('div', 'base-layer-item', this._wrapper)
    const index = this._baseLayers.length - 1
    index === 0 && DomUtil.addClass(baseLayerEl, 'active')
    baseLayerEl.dataset.index = String(index)
    baseLayerEl.onclick = (e) => {
      let old = document.getElementsByClassName('base-layer-item active')
      if (old && old.length) {
        old[0].className = 'base-layer-item'
      }
      if (self._viewer) {
        e.target.className = 'base-layer-item active'
        self._viewer.changeBaseLayer(+e.target.dataset.index || 0)
      }
    }
    if (baseLayer['iconUrl']) {
      baseLayerEl.style.cssText = `
       background:url(${baseLayer['iconUrl']});
    `
    }
    let span = DomUtil.create('span', '', baseLayerEl)
    span.innerHTML = baseLayer.name || '地图'
  }

  /**
   *
   * @param baseLayer
   * @returns {BaseLayerPicker}
   */
  addBaseLayer(baseLayer) {
    if (this._enabled) {
      this._addBaseLayer(baseLayer)
      if (this._baseLayers.length > 1) {
        this._wrapper.style.visibility = 'visible'
      }
    }
    return this
  }
}

export default BaseLayerPicker
