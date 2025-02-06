/**
 * @Author: Caven Chen
 */
/**
 * @Author: Caven Chen
 */

import { Event } from '../../event'
import { Util } from '../../utils'
import BaseLayerType from '../BaseLayerType'

const MAX_VALID_LATITUDE = 85.051129

const MAX_BOUNDS = [-180, -MAX_VALID_LATITUDE, 180, MAX_VALID_LATITUDE]

class ImageProvider extends Event {
  constructor(options) {
    super()
    this._id = Util.uuid()
    this._url = options.url
    this._map = undefined

    this._bounds = options.bounds || MAX_BOUNDS
    this.on('add', this._onAdd.bind(this))
  }

  get id() {
    return this._id
  }

  get type() {
    return BaseLayerType.IMAGE
  }

  set selected(selected) {
    this._selected = selected
    if (!this._map) {
      return
    }

    console.log(this._calcCoordsFromBounds())
    if (this._selected) {
      this._map.addSource(this._id, {
        type: 'image',
        url: this._url,
        coordinates: this._calcCoordsFromBounds(),
      })

      this._map.addLayer(
        {
          id: this._id,
          type: 'raster',
          source: this._id,
        },
        this._map.getLayer('map_scene_layer') ? 'map_scene_layer' : null
      )
    } else {
      if (this._map.getLayer(this._id)) {
        this._map.removeLayer(this._id)
      }
      if (this._map.getSource(this._id)) {
        this._map.removeSource(this._id)
      }
    }
  }

  get selected() {
    return this._selected
  }

  /**
   *
   * @returns
   */
  _calcCoordsFromBounds() {
    const bounds = this._bounds
    if (!Array.isArray(bounds) || bounds.length < 4) {
      throw 'the bounds must be an array and at least 4'
    }
    return [
      [Math.min(bounds[0], bounds[2]), Math.max(bounds[1], bounds[3])],
      [Math.max(bounds[0], bounds[2]), Math.max(bounds[1], bounds[3])],
      [Math.max(bounds[0], bounds[2]), Math.min(bounds[1], bounds[3])],
      [Math.min(bounds[0], bounds[2]), Math.min(bounds[1], bounds[3])],
    ]
  }

  /**
   *
   * @param map
   * @private
   */
  _onAdd(map) {
    this._map = map
  }
}

BaseLayerType.IMAGE = 'image'

export default ImageProvider
