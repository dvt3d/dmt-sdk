/**
 * @Author: Caven Chen
 */

import Overlay from '../Overlay'
import Parse from '../../parse/Parse'

const DEF_STYLE = {
  size: 1,
  offset: [0, 0],
  anchor: 'center',
  opacity: 1,
}

class Billboard extends Overlay {
  constructor(lngLat, icon) {
    if (!lngLat) {
      throw 'lngLat is required'
    }
    if (!icon) {
      throw 'icon is required'
    }
    super()
    this._lngLat = Parse.parseLngLatAlt(lngLat)
    this._icon = icon
    this._style = DEF_STYLE
  }

  get type() {
    return Overlay.getType('billboard')
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

  set icon(icon) {
    if (this._icon == icon) {
      return
    }
    this._icon = icon
    this._layer?.fire('overlayChanged', this)
  }

  get icon() {
    return this._icon
  }

  /**
   *
   * @param style
   * @returns {Billboard}
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
        type: 'Point',
        coordinates: [this._lngLat.lng, this._lngLat.lat],
      },
      properties: {
        overlayId: this._overlayId,
        id: this._bid,
        show: this._show,
        icon: this._icon,
        ...this._style,
      },
    }
  }
}

Overlay.registerType('billboard')

export default Billboard
