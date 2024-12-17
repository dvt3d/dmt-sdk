import { Event } from '../event'
import { Util } from '../utils'
import OverlayType from './OverlayType'

class Overlay extends Event {
  constructor() {
    super()
    this._overlayId = Util.uuid()
    this._bid = undefined
    this._attr = {}
    this._show = true
    this._style = {}
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

  /**
   *
   * @param layer
   * @private
   */
  _onAdd(layer) {}

  /**
   *
   * @private
   */
  _onRemove() {}

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
