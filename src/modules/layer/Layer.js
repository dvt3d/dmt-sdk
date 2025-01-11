/**
 * @Author: Caven Chen
 */
import { Event } from '../event'
import LayerType from './LayerType'
import { Util } from '../utils'

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
   *
   * @param viewer
   * @private
   */
  _onAdd(viewer) {}

  /**
   *
   * @private
   */
  _onRemove() {}

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
