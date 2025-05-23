/**
 * @Author: Caven Chen
 */

import { Event } from '../../event'
import { Util } from '../../utils'
import { getParam, setParam } from '../../../global-api'
import BaseLayerType from '../BaseLayerType'

class XYZProvider extends Event {
  constructor(options = {}) {
    super()
    this._id = Util.uuid()
    this._options = options
    if (options.urlTransform) {
      const requestMap = getParam('request-map') || {}
      requestMap[this._id] = options.urlTransform.bind(this)
      setParam('request-map', requestMap)
    }
  }

  get type() {
    return BaseLayerType.XYZ
  }

  set selected(selected) {
    this._selected = selected
    if (!this._map) {
      return
    }
    if (this._selected) {
      const tiles = new Set()
      const subdomains = this._options.subdomains || []
      subdomains.forEach((subdomain) => {
        tiles.add(this._options.url.replace('{s}', subdomain))
      })
      this._map.addSource(this._id, {
        type: 'raster',
        tiles: [...tiles],
        minzoom: this._options.minZoom || 0,
        maxzoom: this._options.maxZoom || 22,
        tileSize: this._options.tileSize || 256,
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
   * @param map
   * @private
   */
  _onAdd(map) {
    this._map = map
  }
}

BaseLayerType.XYZ = 'xyz'

export default XYZProvider
