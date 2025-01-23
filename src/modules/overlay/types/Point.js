/**
 * @Author: Caven Chen
 */

import Overlay from '../Overlay'
import Parse from '../../parse/Parse'
import State from '../../state/State'
import { LayerType } from '../../layer/index.js'

const DEF_STYLE = {
  size: 5,
  color: '#ffffff',
  blur: 0,
  opacity: 1,
  strokeWidth: 2,
  strokeColor: '#0000ff',
  strokeOpacity: 1,
}

class Point extends Overlay {
  constructor(position) {
    if (!position) {
      throw 'position is required'
    }
    super()
    this._position = Parse.parsePosition(position)
    this._style = DEF_STYLE
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getType('point')
  }

  set show(show) {
    if (this._show == show) {
      return
    }
    this._show = show
    this._layer?.fire('overlayChanged', this)
  }

  get show() {
    return this._show
  }

  set position(position) {
    this._position = Parse.parsePosition(position)
    this._layer?.fire('overlayChanged', this)
  }

  get position() {
    return this._position
  }

  /**
   *
   * @private
   */
  _mountedHook() {
    if (this._layer.type === LayerType.VECTOR) {
      const lngLat = this._position.toDegrees()
      this._delegate = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [+lngLat.lng, +lngLat.lat],
        },
        properties: {
          overlayId: this._overlayId,
          id: this._bid,
          show: this._show,
          ...this._style,
        },
      }
    }
  }

  /**
   *
   * @param style
   * @returns {Point}
   */
  setStyle(style) {
    this._style = {
      ...this._style,
      ...style,
    }
    this._layer?.fire('overlayChanged', this)
    return this
  }
}

Overlay.registerType('point')

export default Point
