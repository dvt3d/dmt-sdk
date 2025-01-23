/**
 * @Author: Caven Chen
 */

import { THREE } from '../../../name-space'
import Overlay from '../Overlay'
import Parse from '../../parse/Parse'
import State from '../../state/State'
import { DomUtil, Util } from '../../utils'

class DivIcon extends Overlay {
  constructor(position, content) {
    if (!position) {
      throw 'position is required'
    }
    if (!content) {
      throw 'content is required'
    }
    super()
    this._position = Parse.parsePosition(position)
    this._content = content
    this._wrapper = DomUtil.create('div', 'div-icon')
    this._delegate = new THREE.CSS3DSprite(this._wrapper)
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getType('div_icon')
  }

  set show(show) {
    if (this._show == show) {
      return
    }
    this._show = show
    this._delegate.visible = show
  }

  get show() {
    return this._show
  }

  set position(position) {
    this._position = Parse.parsePosition(position)
    this._delegate.position.copy(this._position)
  }

  get position() {
    return this._position
  }

  set content(content) {
    this._content = content
    DomUtil.setContent(this._wrapper, content)
  }

  get content() {
    return this._content
  }

  _mountedHook() {
    this._delegate.position.copy(this._position)
    DomUtil.setContent(this._wrapper, this._content)
    let params = {
      layer: this._layer,
      overlay: this,
      position: this._position,
    }
    this._wrapper.addEventListener('click', () => {
      this.fire('click', params)
    })
  }

  /**
   *
   * @param style
   * @returns {DivIcon}
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    Util.merge(this._style, style)
    this._style.className &&
      DomUtil.addClass(this._wrapper, this._style.className)
    return this
  }
}

Overlay.registerType('div_icon')

export default DivIcon
