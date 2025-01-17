/**
 * @Author: Caven Chen
 */

import Overlay from '../Overlay'
import Parse from '../../parse/Parse'
import State from '../../state/State'
import { LayerType } from '../../layer/index.js'

const DEF_STYLE = {
  width: 5,
  color: '#ffffff',
  gapWidth: 0,
  opacity: 1,
  blur: 0,
}

class Polyline extends Overlay {
  constructor(positions) {
    if (!positions) {
      throw 'lngLat is required'
    }
    super()
    this._positions = Parse.parsePositions(positions)
    this._style = DEF_STYLE
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getType('polyline')
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

  set positions(positions) {
    this._positions = Parse.parsePositions(positions)
    this._layer?.fire('overlayChanged', this)
  }

  get positions() {
    return this._positions
  }

  /**
   *
   * @private
   */
  _mountedHook() {
    if (this._layer.type === LayerType.VECTOR) {
      const lngLats = this._positions.map((item) => {
        const lngLat = item.toDegrees()
        return [lngLat.lng, lngLat.lat]
      })
      this._delegate = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: lngLats,
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

  /**
   *
   * @param style
   * @returns {Polyline}
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

Overlay.registerType('polyline')

export default Polyline
