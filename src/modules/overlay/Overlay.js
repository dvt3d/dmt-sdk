/**
 * @Author: Caven Chen
 */
import { Event } from '../event'
import { Util } from '../utils'
import { LayerType } from '../layer'
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
    this._delegate = undefined
    this._layer = undefined
    this._state = undefined
    this._allowDrillPicking = false
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

  set allowDrillPicking(allowDrillPicking) {
    this._allowDrillPicking = allowDrillPicking
  }

  get allowDrillPicking() {
    return this._allowDrillPicking
  }

  get delegate() {
    return this._delegate
  }

  get state() {
    return this._state
  }

  /**
   * The hook for mount overlay
   * Subclasses need to be overridden
   * @private
   */
  _mountedHook() {}

  /**
   * The hook for added
   * Subclasses need to be overridden
   * @private
   */
  _addedHook() {}

  /**
   * The hook for removed
   * Subclasses need to be overridden
   * @private
   */
  _removedHook() {}

  /**
   *
   * @param layer
   * @private
   */
  _onAdd(layer) {
    this._layer = layer
    this._mountedHook && this._mountedHook()
    if (layer.type === LayerType.VECTOR) {
      this._delegate && this._layer.dataJson.features.push(this._delegate)
    } else {
      this._delegate && this._layer.delegate.add(this._delegate)
    }
    this._addedHook && this._addedHook()
    this._state = State.ADDED
  }

  /**
   *
   * @private
   */
  _onRemove() {
    this._removedHook && this._removedHook()
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
