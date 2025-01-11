import { Event } from '../event'
import { Util } from '../utils'
import OverlayType from './OverlayType'
import State from '../state/State'

class Overlay extends Event {
  constructor() {
    super()
    this._overlayId = Util.uuid()
    this._bid = Util.uuid()
    this._attr = {}
    this._show = true
    this._style = {}
    this._layer = undefined
    this._state = undefined
    this.on('add', this._onAdd.bind(this))
    this.on('remove', this._onRemove.bind(this))
  }

  get overlayId() {
    return this._overlayId
  }

  set id(id) {
    this._bid = id
  }

  get id() {
    return this._bid
  }

  set attr(attr) {
    this._attr = attr
  }

  get attr() {
    return this._attr
  }

  get state() {
    return this._state
  }

  /**
   *
   * @param layer
   * @private
   */
  _onAdd(layer) {
    this._layer = layer
    this._state = State.ADDED
  }

  /**
   *
   * @private
   */
  _onRemove() {
    this._state = State.REMOVED
  }

  /**
   *
   * @param style
   * @returns {Overlay}
   */
  setStyle(style) {
    return this
  }

  /**
   *
   * @param type
   */
  static registerType(type) {
    if (type) {
      OverlayType[type.toLocaleUpperCase()] = type.toLocaleLowerCase()
    }
  }

  /**
   *
   * @param type
   * @returns {*|undefined}
   */
  static getType(type) {
    return OverlayType[type.toLocaleUpperCase()] || undefined
  }
}

export default Overlay
