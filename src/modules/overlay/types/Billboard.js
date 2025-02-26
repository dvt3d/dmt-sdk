/**
 * @Author: Caven Chen
 */

import Overlay from '../Overlay'
import State from '../../state/State'
import Parse from '../../parse/Parse'
import { LayerType } from '../../layer'
import { GeoJSonUtil } from '../../utils'

const DEF_STYLE = {
  size: 1,
  offset: [0, 0],
  anchor: 'center',
  opacity: 1,
}

class Billboard extends Overlay {
  constructor(position, icon) {
    if (!position) {
      throw 'position is required'
    }
    if (!icon) {
      throw 'icon is required'
    }
    super()
    this._position = Parse.parsePosition(position)
    this._icon = icon
    this._style = DEF_STYLE
    this._state = State.INITIALIZED
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

  set position(position) {
    this._position = Parse.parsePosition(position)
    this._layer?.fire('overlayChanged', this)
  }

  get position() {
    return this._position
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
   * @private
   */
  _mountedHook() {
    if (this._layer.type === LayerType.VECTOR) {
      const lngLat = this._position.toDegrees()
      this._delegate = GeoJSonUtil.createPointFeature(
        [lngLat.lng, lngLat.lat],
        {
          overlayId: this._overlayId,
          id: this._bid,
          show: this._show,
          icon: this._icon,
          ...this._style,
        }
      )
    } else {
    }
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
}

Overlay.registerType('billboard')

export default Billboard
