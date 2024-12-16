import { Event } from '../event'
import LayerType from './LayerType'

class Layer extends Event {
  constructor(id) {
    super()
    this._id = id
    this._show = true
    this._attr = {}
    this._cache = {}
    this._delegate = undefined
    this.on('add', this._onAdd.bind(this))
    this.on('remove', this._onRemove.bind(this))
  }

  get id() {
    return this._id
  }

  get attr() {
    return this._attr
  }

  get show() {
    return this._show
  }

  get delegate() {
    return this._delegate
  }

  _onAdd(viewer) {}

  _onRemove() {}

  /**
   *
   * @param {*} overlay
   * @returns
   */
  addOverlay(overlay) {
    if (overlay) {
      overlay.fire('add', this)
      this._cache[overlay.id] = overlay
    }
    return this
  }

  removeOverlay(overlay) {
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
