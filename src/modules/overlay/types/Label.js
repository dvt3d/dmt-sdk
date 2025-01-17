/**
 * @Author: Caven Chen
 */

import Overlay from '../Overlay.js'
import Parse from '../../parse/Parse.js'
import State from '../../state/State.js'
import { LayerType } from '../../layer/index.js'

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
  constructor(position, text) {
    if (!position) {
      throw 'position is required'
    }

    if (!text) {
      throw 'text is required'
    }
    super()
    this._position = Parse.parsePosition(position)
    this._text = text
    this._style = DEF_STYLE
    this._state = State.INITIALIZED
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

  set position(position) {
    this._position = Parse.parsePosition(position)
    this._layer?.fire('overlayChanged', this)
  }

  get position() {
    return this._position
  }

  set text(text) {
    this._text = text
    this._layer?.fire('overlayChanged', this)
  }

  get text() {
    return this._text
  }

  _mountedHook() {
    if (this._layer.type === LayerType.VECTOR) {
      const lngLat = this._position.toDegrees()
      this._delegate = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lngLat.lng, lngLat.lat],
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
}

Overlay.registerType('label')

export default Label
