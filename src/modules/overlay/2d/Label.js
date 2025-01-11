/**
 * @Author: Caven Chen
 */

import Overlay from '../Overlay'
import Parse from '../../parse/Parse'

const DEF_STYLE = {
  font: ['Open Sans Regular', 'Arial Unicode MS Regular'],
  size: 16,
  anchor: 'center',
  justify: 'center',
  opacity: 1,
  offset: [0, 0],
  color: '#000000',
  allowOverlap: false,
}

class Label extends Overlay {
  constructor(lngLat, text) {
    if (!lngLat) {
      throw 'lngLat is required'
    }

    if (!text) {
      throw 'text is required'
    }
    super()
    this._lngLat = Parse.parseLngLatAlt(lngLat)
    this._text = text
    this._style = DEF_STYLE
  }

  get type() {
    return Overlay.getType('label')
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

  set text(text) {
    this._text = text
    this._layer?.fire('overlayChanged', this)
  }

  get text() {
    return this._text
  }

  /**
   *
   * @param style
   * @returns {Label}
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
        text: this._text,
        ...this._style,
      },
    }
  }
}

Overlay.registerType('label')

export default Label
