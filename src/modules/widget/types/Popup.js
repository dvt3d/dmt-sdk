/**
 * @Author: Caven Chen
 */

import { THREE } from '../../../name-space'
import { DomUtil } from '../../utils'
import Widget from '../Widget'
import Parse from '../../parse/Parse'

class Popup extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'widget popup')
    this._contentEl = DomUtil.create('div', 'content', this._wrapper)
    this._renderer = undefined
    this._delegate = undefined
  }

  _mountContent() {
    this._renderer = new THREE.CSS2DRenderer({
      element: this._wrapper,
    })
    this._renderer.setSize(
      this._viewer.canvas.clientWidth,
      this._viewer.canvas.clientHeight
    )
    this._delegate = new THREE.CSS2DObject(this._contentEl)
    this._wrapper.style.visibility = 'hidden'
    this._viewer.scene.world.add(this._delegate)
    this._ready = true
  }

  _installHook() {
    const self = this
    Object.defineProperty(this._viewer, 'popup', {
      get() {
        return self
      },
    })
    this.enabled = true
  }

  /**
   *
   * @param {*} position
   * @param {*} content
   * @returns {Popup}
   */
  showAt(position, content) {
    if (!this._ready) {
      return this
    }
    this._delegate.position.copy(Parse.parsePosition(position))
    DomUtil.setContent(this._contentEl, content)
    this._wrapper.style.visibility = 'visible'
    return this
  }

  /**
   * hide widget
   * @returns {Popup}
   */
  hide() {
    if (!this._ready) {
      return this
    }
    this._wrapper.style.cssText = `
        visibility:hidden;
        `
    return this
  }

  /**
   *
   * @param {*} frameState
   * @returns {Popup}
   */
  render(frameState) {
    if (!this._ready) {
      return this
    }
    if (this._wrapper.style.visibility === 'hidden') {
      return this
    }
    this._renderer.render(frameState.scene, frameState.camera)
    return this
  }
}

export default Popup
