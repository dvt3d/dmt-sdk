import { Event } from '../../event'
import { Util } from '../../utils'
import BaseLayerType from '../BaseLayerType'

const TILE_URL = {
  img: '//webst{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
  elec: '//webrd{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
  cva: '//webst{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
}

class AMapProvider extends Event {
  constructor(options) {
    super()
    this._id = Util.uuid()
    this._options = options
    this.on('add', this._onAdd.bind(this))
  }

  get id() {
    return this._id
  }

  get type() {
    return BaseLayerType.AMAP
  }

  set selected(selected) {
    this._selected = selected
    if (!this._viewer) {
      return
    }
    if (this._selected) {
      const url =
        this._options.url ||
        [
          this._options.protocol || '',
          TILE_URL[this._options.style] || TILE_URL['elec'],
        ].join('')
      const subdomains = this._options.subdomains || ['01', '02', '03', '04']
      const tiles = new Set()
      subdomains.forEach((subdomain) => {
        tiles.add(url.replace('{s}', subdomain))
      })
      this._viewer.map.addSource(this._id, {
        type: 'raster',
        tiles: [...tiles],
        minzoom: this._options.minZoom || 0,
        maxzoom: this._options.maxZoom || 22,
        tileSize: this._options.tileSize || 256,
      })
      this._viewer.map.addLayer(
        {
          id: this._id,
          type: 'raster',
          source: this._id,
        },
        'map_scene_layer'
      )
    } else {
      if (this._viewer.getLayer(this._id)) {
        this._viewer.removeLayer(this._id)
      }
      if (this._viewer.map.getSource(this._id)) {
        this._viewer.removeSource(this._id)
      }
    }
  }

  get selected() {
    return this._selected
  }

  /**
   *
   * @param viewer
   * @private
   */
  _onAdd(viewer) {
    this._viewer = viewer
  }
}

BaseLayerType.AMAP = 'amap'

export default AMapProvider
