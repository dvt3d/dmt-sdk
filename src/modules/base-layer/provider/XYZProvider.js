import { Event } from '../../event'

class XYZProvider extends Event {
  constructor(options = {}) {
    super()
    this._url = options.url
  }

  get type() {
    return 'XYZ'
  }

  set selected(selected) {
    this._selected = selected
  }

  get selected() {
    return this._selected
  }
}

export default XYZProvider
