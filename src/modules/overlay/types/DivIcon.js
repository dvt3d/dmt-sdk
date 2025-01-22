/**
 * @Author: Caven Chen
 */

import { THREE } from '../../../name-space'
import Overlay from '../Overlay'
import Parse from '../../parse/Parse'
import State from '../../state/State'
import { DomUtil } from '../../utils'

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
    this._delegate = new THREE.CSS3DSprite(this._el)
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getType('div_icon')
  }

  get wrapper() {
    return this
  }

  set show(show) {
    if (this._show == show) {
      return
    }
    this._show = show
  }

  get show() {
    return this._show
  }

  set position(position) {
    this._position = Parse.parsePosition(position)
  }

  get position() {
    return this._position
  }

  set content(content) {
    this._content = content
    DomUtil.setContent(this._delegate.element, content)
  }

  get content() {
    return this._content
  }

  _mountedHook() {
    this._delegate.position.copy(this._position)
    DomUtil.setContent(this._delegate.element, this._content)
  }

  /**
   *
   * @param style
   * @returns {Label}
   */
  setStyle(style) {
    return this
  }
}

Overlay.registerType('div_icon')

export default DivIcon
