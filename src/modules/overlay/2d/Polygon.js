/**
 * @Author: Caven Chen
 */

import Overlay from '../Overlay'
import Parse from '../../parse/Parse'
import State from '../../state/State'

const DEF_STYLE = {
  color: '#ffffff',
  opacity: 1,
}

class Polygon extends Overlay {
  constructor(lngLats) {
    if (!lngLats) {
      throw 'lngLat is required'
    }
    super()
    this._lngLats = Parse.parseLngLatAlts(lngLats)
    this._style = DEF_STYLE
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getType('polygon')
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

  set lngLat(lngLat) {
    this._lngLat = Parse.parseLngLatAlt(lngLat)
    this._layer?.fire('overlayChanged', this)
  }

  get lngLat() {
    return this._lngLat
  }

  /**
   *
   * @param style
   * @returns {Polygon}
   */
  setStyle(style) {
    this._style = {
      ...this._style,
      ...style,
    }
    this._layer?.fire('overlayChanged', this)
    return this
  }

  /**
   *
   * @returns {{}}
   */
  toFeature() {
    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [this._lngLats.map((lngLat) => [lngLat.lng, lngLat.lat])],
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

Overlay.registerType('polygon')

export default Polygon
