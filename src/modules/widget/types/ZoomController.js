/**
 * @Author: Caven Chen
 */
import { zoom_in, zoom_out } from '../../icons'
import { DomUtil } from '../../utils'
import Widget from '../Widget'
import { SceneMode } from '../../constant'

class ZoomController extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'widget zoom-controller')
  }

  _mountContent() {
    const zoomIn = DomUtil.parseDom(zoom_in, true, 'zoom-in')
    zoomIn.dataset.type = 'zoomIn'
    zoomIn.addEventListener('click', this._onClick.bind(this))
    const zoomOut = DomUtil.parseDom(zoom_out, true, 'zoom-out')
    zoomOut.dataset.type = 'zoomOut'
    zoomOut.addEventListener('click', this._onClick.bind(this))
    this._wrapper.appendChild(zoomIn)
    this._wrapper.appendChild(zoomOut)
    this._ready = true
  }

  _onClick(e) {
    e.preventDefault()
    switch (e.target.dataset.type) {
      case 'zoomIn': {
        this._viewer.map.zoomIn()
        break
      }
      case 'zoomOut': {
        this._viewer.map.zoomOut()
        break
      }
      default: {
        break
      }
    }
  }

  _installHook() {
    if (this._viewer.sceneMode === SceneMode.MAP_SCENE) {
      const self = this
      Object.defineProperty(this._viewer, 'zoomController', {
        get() {
          return self
        },
      })
    }
  }
}

export default ZoomController
