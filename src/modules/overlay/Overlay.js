import { Event } from '../event'

import { Util } from '../utils'

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

  _onAdd(Layer) {}

  _onRemove() {}

  setStyle() {}
}

export default Overlay
