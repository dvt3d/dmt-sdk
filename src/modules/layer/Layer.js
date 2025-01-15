/**
 * @Author: Caven Chen
 */
import { Event } from '../event'
import LayerType from './LayerType'
import { Util } from '../utils'
import State from '../state/State.js'

class Layer extends Event {
  constructor(id) {
    super()
    this._id = Util.uuid()
    this._bid = id || Util.uuid()
    this._show = true
    this._attr = {}
    this._cache = {}
    this._delegate = undefined
    this._viewer = undefined
    this._state = undefined
    this.on('add', this._onAdd.bind(this))
    this.on('remove', this._onRemove.bind(this))
  }

  get layerId() {
    return this._id
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

  get delegate() {
    return this._delegate
  }

  get state() {
    return this._state
  }

  /**
   * The hook for mount layer
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
   * @param viewer
   * @private
   */
  _onAdd(viewer) {
    this._viewer = viewer
    this._mountedHook && this._mountedHook()
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
   * @param {*} overlay
   * @returns
   */
  addOverlay(overlay) {
    return this
  }

  /**
   *
   * @param overlay
   * @returns {Layer}
   */
  removeOverlay(overlay) {
    return this
  }

  /**
   *
   * @param Overlays
   * @returns {Layer}
   */
  addOverlays(Overlays) {
    return this
  }

  /**
   *
   * @param Overlays
   * @returns {Layer}
   */
  removeOverlays(Overlays) {
    return this
  }

  /**
   *
   * @returns
   */
  getOverlays() {
    let result = []
    for (let key in this._cache) {
      result.push(this._cache[key])
    }
    return result
  }

  /**
   *
   * @param viewer
   * @returns {Layer}
   */
  addTo(viewer) {
    viewer.addLayer(this)
    return this
  }

  /**
   * Registers Type
   * @param type
   */
  static registerType(type) {
    if (type) {
      LayerType[type.toLocaleUpperCase()] = type.toLocaleLowerCase()
    }
  }

  /**
   * Returns type
   * @param type
   * @returns {*|undefined}
   */
  static getType(type) {
    return LayerType[type.toLocaleUpperCase()] || undefined
  }
}

export default Layer
