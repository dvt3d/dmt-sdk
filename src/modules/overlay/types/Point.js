/**
 * @Author: Caven Chen
 */

import Overlay from '../Overlay'
import Parse from '../../parse/Parse'
import State from '../../state/State'
import { LayerType } from '../../layer'
import { VectorPointMaterialProperty } from '../../material'
import { GeoJSonUtil } from '../../utils'

class Point extends Overlay {
  constructor(position) {
    if (!position) {
      throw 'position is required'
    }
    super()
    this._position = Parse.parsePosition(position)
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
      const material = this._style.material || new VectorPointMaterialProperty()
      this._delegate = GeoJSonUtil.createPointFeature(
        [+lngLat.lng, +lngLat.lat],
        {
          overlayId: this._overlayId,
          id: this._bid,
          show: this._show,
          size: this._style.size || 5,
          ...material.getValue(),
        }
      )
    }

    if (this._layer.type === LayerType.MESH) {
      const pointCollection = this._layer.pointCollection
      const geometry = this._layer.pointCollection.geometry
      // const positionAttr = geometry.get
      // const pointCollection = this._t
      // const positionAttr = this._layer.bi
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
