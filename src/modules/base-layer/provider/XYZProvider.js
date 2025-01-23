/**
 * @Author: Caven Chen
 */

import { Event } from '../../event'
import BaseLayerType from '../BaseLayerType'

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

BaseLayerType.XYZ = 'xyz'
export default XYZProvider
