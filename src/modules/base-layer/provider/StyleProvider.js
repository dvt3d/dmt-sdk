/**
 * @Author: Caven Chen
 */

import { Event } from '../../event'
import BaseLayerType from '../BaseLayerType'
import { Util } from '../../utils'

class StyleProvider extends Event {
  constructor(options = {}) {
    super()
    this._id = Util.uuid()
    this._url = options.url
    this._data = options.data
    this._selected = false
    this._map = undefined
    this.on('add', this._onAdd.bind(this))
  }

  get id() {
    return this._id
  }

  get type() {
    return BaseLayerType.STYLE
  }

  set selected(selected) {
    this._selected = selected
    if (this._map && selected) {
      this._map.setStyle(this._url || this._data, { diff: false })
    }
  }

  get selected() {
    return this._selected
  }

  /**
   *
   * @param map
   * @private
   */
  _onAdd(map) {
    this._map = map
  }

  /**
   *
   * @param ids
   * @param visible
   */
  setVisibilityFilter(ids, visible) {
    return this
  }
}

BaseLayerType.STYLE = 'style'

export default StyleProvider
