/**
 * @Author: Caven Chen
 */

class BaseLayer {
  constructor(provider, options = {}) {
    this._provider = provider
    this._options = options
  }

  get provider() {
    return this._provider
  }

  get id() {
    return this._provider.id
  }

  get type() {
    return this._provider.type
  }

  set selected(selected) {
    this._provider.selected = selected
  }

  get selected() {
    return this._provider.selected
  }
}

export default BaseLayer
