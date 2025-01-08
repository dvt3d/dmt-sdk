import { Event } from '../event'

class BaseLayerCollection extends Event {
  constructor() {
    super()
    this._baseLayers = []
    this._selected = false
    this._map = undefined
    this.on('add', this._onAdd.bind(this))
  }

  set selected(selected) {
    this._selected = selected
    this._baseLayers.forEach((item) => {
      item.selected = selected
    })
  }

  get selected() {
    return this._selected
  }

  _onAdd(map) {
    this._map = map
    this._baseLayers.forEach((item) => {
      item.provider.fire('add', this._map)
    })
  }

  /**
   *
   * @param {*} baseLayer
   * @returns
   */
  add(baseLayer) {
    let element = this._baseLayers.find((item) => item.id === baseLayer.id)
    if (element) {
      return this
    }
    let type = this._baseLayers[0]?.type
    if (type && type !== baseLayer.type) {
      console.warn('not supported the different base layer type ')
      return this
    }
    this._baseLayers.push(baseLayer)
    return this
  }

  /**
   *
   * @param {*} baseLayer
   * @returns
   */
  remove(baseLayer) {
    baseLayer.selected = false
    let index = this._baseLayers.findIndex((item) => item.id === baseLayer.id)
    this._baseLayers.splice(index, 1)
    return this
  }

  /**
   *
   */

  removeAll() {
    this._baseLayers.forEach((item) => {
      item.selected = false
    })
    this._baseLayers = []
    return this
  }

  /**
   *
   * @returns
   */
  getId() {
    return this._baseLayers.map((item) => item.id).join('-')
  }

  /**
   *
   * @returns
   */
  getType() {
    return this._baseLayers[0]?.type
  }
}

export default BaseLayerCollection
