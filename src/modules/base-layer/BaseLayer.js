import { Event } from '../event'
import { Util } from '../utils'

class BaseLayer extends Event {
  constructor(provider, options = {}) {
    super()
    this._provider = provider
    this._options = options
    this._viewer = undefined
    this._id = Util.uuid()
    this.on('add', this._onAdd.bind(this))
  }

  get id() {
    return this._id
  }

  get provider() {
    return this._provider
  }

  set selected(selected) {
    this._provider.selected = selected
  }

  get selected() {
    return this._provider.selected
  }

  /**
   *
   * @param {*} viewer
   */
  _onAdd(viewer) {
    if (viewer.only3d) {
      throw 'baseLayer can not used for only3d mode'
    }
    this._viewer = viewer
    this._provider.fire('add', viewer)
  }

  onRemove() {
    this._provider.fire('remove')
  }
}

export default BaseLayer
