import Layer from '../Layer'
import { Util } from '../../utils'
import { VectorType } from '../../constant'

class VectorLayer extends Layer {
  constructor(id, vectorType) {
    super(id)
    this._sourceId = Util.uuid()
    this._source = null
    this._delegate = null
    this._cache = {}
    this._vectorType = vectorType
    this._dataJson = {
      type: 'FeatureCollection',
      features: [],
    }

    this.on('overlayChanged', this._onOverlayChanged.bind(this))
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

  /**
   *
   * @private
   */
  _onOverlayChanged() {
    if (this._viewer) {
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
      case VectorType.SYMBOL:
      case VectorType.LABEL:
        return 'symbol'
      case VectorType.EXTRUSION:
        return 'fill-extrusion'
    }
    return ''
  }

  /**
   *
   * @returns {string}
   * @private
   */
  _getLayerPaint() {
    switch (this._vectorType) {
      case VectorType.POINT:
        return {
          'circle-radius': ['get', 'size'],
          'circle-color': ['get', 'color'],
          'circle-blur': ['get', 'blur'],
          'circle-opacity': ['get', 'opacity'],
          'circle-stroke-width': ['get', 'strokeWidth'],
          'circle-stroke-color': ['get', 'strokeColor'],
          'circle-stroke-opacity': ['get', 'strokeOpacity'],
        }
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
    this._viewer.map.addSource(this._sourceId, {
      type: 'geojson',
      data: this._dataJson,
      filter: ['==', ['get', 'show'], true],
    })
    this._viewer.map.addLayer({
      id: this._id,
      type: this._getLayerType(),
      source: this._sourceId,
      paint: this._getLayerPaint(),
    })
    this._source = this._viewer.map.getSource(this._sourceId)
    this._delegate = this._viewer.map.getLayer(this._id)
  }

  /**
   *
   * @private
   */
  _onRemove() {
    if (this._viewer) {
      if (this._viewer.map.getLayer(this._id)) {
        this._viewer.map.removeLayer(this._id)
        this._delegate = null
      }
      if (this._viewer.map.getSource(this._sourceId)) {
        this._viewer.map.removeSource(this._sourceId)
        this._source = null
      }
    }
  }

  /**
   *
   * @param overlay
   * @returns {VectorLayer}
   */
  addOverlay(overlay) {
    if (this._cache[overlay.overlayId]) {
      throw `overlay ${overlay.overlayId} already exists`
    }
    this._dataJson.features.push(overlay.toFeature())
    this._cache[overlay.overlayId] = overlay
    overlay.fire('add', this)
    if (this._source) {
      this._source.setData(this._dataJson)
    }
    return this
  }

  /**
   *
   * @param overlays
   * @returns {VectorLayer}
   */
  addOverlays(overlays) {
    for (let overlay of overlays) {
      try {
        if (this._cache[overlay.overlayId]) {
          throw `overlay ${overlay.overlayId} already exists`
        }
        this._dataJson.features.push(overlay.toFeature())
        this._cache[overlay.overlayId] = overlay
        overlay.fire('add', this)
      } catch (e) {
        console.error(e)
      }
    }
    if (this._source) {
      this._source.setData(this._dataJson)
    }
    return this
  }

  /**
   *
   * @returns {VectorLayer}
   */
  clear() {
    this._dataJson.features = []
    if (this._source) {
      this._source.setData(this._dataJson)
    }
    this._cache = {}
    return this
  }
}

Layer.registerType('vector')

export default VectorLayer
