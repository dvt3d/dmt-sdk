import Layer from '../Layer'
import GeoJsonParser from '../../parser/GeoJsonParser'
import { Util } from '../../utils'

class VectorLayer extends Layer {
  constructor(id, vectorType) {
    super(id)
    this._sourceId = Util.uuid()
    this._source = undefined
    this._catch = {}
    this._vectorType = vectorType
    this._delegate = undefined
  }

  set show(show) {}

  get show() {
    return this._show
  }

  _getGeoJsonType() {
    switch (this._vectorType) {
      case 'point':
        return 'Point'
      case 'polyline':
        return 'LineString'
      case 'polygon':
        return 'Polygon'
    }
  }

  _getLayerType() {
    switch (this._vectorType) {
      case 'point':
        return 'circle'
      case 'polyline':
        return 'line'
      case 'polygon':
        return 'fill'
    }
  }

  _onAdd(viewer) {
    this._viewer = viewer
    let data = GeoJsonParser.parseOverlayToGeoJson(
      this.getOverlays(),
      this._getGeoJsonType()
    )

    viewer.map.addSource(this._sourceId, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [100.4933, 13.7551],
            },
            properties: { year: '2004' },
          },
        ],
      },
    })

    viewer.map.addLayer({
      id: this._id,
      type: 'circle',
      source: this._sourceId,
      paint: {
        'circle-radius': 10,
        'circle-color': '#007cbf',
      },
    })

    this._delegate = viewer.map.getLayer(this._id)
  }

  _onRemove() {}

  addOverlay(overlay) {}

  removeOverlay(overlay) {}
}

export default VectorLayer
