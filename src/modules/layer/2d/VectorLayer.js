import Layer from '../Layer'
import GeoJsonParser from '../../parser/GeoJsonParser'
import { Util } from '../../utils'
import { VectorType } from '../../constant'

class VectorLayer extends Layer {
  constructor(id, vectorType) {
    super(id)
    this._sourceId = Util.uuid()
    this._source = undefined
    this._cache = {}
    this._vectorType = vectorType
    this._delegate = undefined
    this._dataJson = {
      type: 'FeatureCollection',
      features: [],
    }
    this._paint = {}
  }

  set show(show) {
    if (this._viewer) {
      this._viewer.map.setLayoutProperty(this._id, 'visibility', show)
    }
  }

  get show() {
    return this._show
  }

  get type() {
    return Layer.getType('vector')
  }

  _onOverlayUpdate() {}

  /**
   *
   * @returns {string}
   * @private
   */
  _getGeoJsonType() {
    switch (this._vectorType) {
      case VectorType.POINT:
      case VectorType.SYMBOL:
        return 'Point'
      case VectorType.POLYLINE:
        return 'LineString'
      case VectorType.POLYGON:
      case VectorType.EXTRUSION:
        return 'Polygon'
    }
  }

  /**
   *
   * @returns {string}
   * @private
   */
  _getLayerType() {
    switch (this._vectorType) {
      case VectorType.POINT:
        return 'circle'
      case VectorType.POLYLINE:
        return 'line'
      case VectorType.POLYGON:
        return 'fill'
    }
  }

  /**
   *
   * @param viewer
   * @private
   */
  _onAdd(viewer) {
    this._viewer = viewer
    viewer.map.addSource(this._sourceId, {
      type: 'geojson',
      data: this._dataJson,
    })
    viewer.map.addLayer({
      id: this._id,
      type: this._getGeoJsonType(),
      source: this._sourceId,
      paint: this._paint,
    })
    this._delegate = viewer.map.getLayer(this._id)
  }

  _onRemove() {}

  /**
   *
   * @param overlay
   * @returns {VectorLayer}
   */
  addOverlay(overlay) {
    if (this._cache[overlay.overlayId]) {
      throw 'overlay already exists'
    }
    this._cache[overlay.overlayId] = overlay

    let data = []
    // for ()
    this._dataJson = GeoJsonParser.parseOverlaysToGeoJson(
      [overlay],
      this._getGeoJsonType()
    )
    if (this._viewer) {
      let source = this._viewer.map.getSource(this._sourceId)
      source.updateData(this._dataJson)
    }
    return this
  }

  /**
   *
   * @param overlays
   * @returns {VectorLayer}
   */
  addOverlays(overlays) {
    let data = []
    for (let i = 0; i < overlays.length; i++) {
      try {
        let overlay = overlays[i]
        if (this._cache[overlay.overlayId]) {
          throw 'overlay already exists'
        }
        this._cache[overlay.overlayId] = overlay
        data.push({
          id: overlay.id,
          coords: [overlay.position.x, overlay.position.y],
        })
      } catch (e) {
        console.error(e)
      }
    }
    this._dataJson = GeoJsonParser.parseOverlaysToGeoJson(
      data,
      this._getGeoJsonType()
    )
    if (this._viewer) {
      let source = this._viewer.map.getSource(this._sourceId)
      source.updateData(this._dataJson)
    }
    return this
  }

  /**
   *
   * @param overlay
   * @returns {VectorLayer}
   */
  removeOverlay(overlay) {
    return this
  }

  /**
   *
   * @param overlays
   * @returns {VectorLayer}
   */
  removeOverlays(overlays) {
    return this
  }
}

Layer.registerType('vector')

export default VectorLayer
