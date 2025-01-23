/**
 * @Author: Caven Chen
 */

import { Event } from '../../event'
import { Util } from '../../utils'
import BaseLayerType from '../BaseLayerType'

const MAP_URL =
  '//t{s}.tianditu.gov.cn/DataServer?T={style}_w&x={x}&y={y}&l={z}&tk={key}'

class TDTProvider extends Event {
  constructor(options) {
    super()
    this._id = Util.uuid()
    this._options = options
    this._map = undefined
    this.on('add', this._onAdd.bind(this))
  }

  get id() {
    return this._id
  }

  get type() {
    return BaseLayerType.TDT
  }

  set selected(selected) {
    this._selected = selected
    if (!this._map) {
      return
    }
    if (this._selected) {
      let url = MAP_URL.replace(
        /\{style\}/g,
        this._options.style || 'vec'
      ).replace(/\{key\}/g, this._options.key || '')
      let subdomains = ['0', '1', '2', '3', '4', '5', '6', '7']
      this._map.addSource(this._id, {
        type: 'raster',
        tiles: subdomains.map((subdomain) => url.replace('{s}', subdomain)),
        minzoom: this._options.minZoom || 0,
        maxzoom: this._options.maxZoom || 18,
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

BaseLayerType.TDT = 'tdt'

export default TDTProvider
