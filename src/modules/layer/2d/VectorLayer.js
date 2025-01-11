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
    this._ready = new Promise((resolve) => {
      this.once('added', () => {
        resolve()
      })
    })
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

  _onOverlayChanged({ overlay, property }) {
    // if (this._viewer) {
    //   let index = this._dataJson.features.findIndex(
    //     (item) => item.properties.overlayId === overlay.overlayId
    //   )
    // }
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
      case VectorType.BILLBOARD:
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
      case VectorType.BILLBOARD: {
        return {
          'icon-opacity': ['get', 'opacity'],
        }
      }
      case VectorType.POLYLINE:
        return {}
      case VectorType.POLYGON:
        return {}
      default:
        return {}
    }
  }

  /**
   *
   * @returns {string}
   * @private
   */
  _getLayerLayout() {
    switch (this._vectorType) {
      case VectorType.BILLBOARD:
        return {
          'icon-image': ['get', 'icon'],
          'icon-size': ['get', 'size'],
          'icon-offset': ['get', 'offset'],
          'icon-anchor': ['get', 'anchor'],
        }
      case VectorType.LABEL:
        return {
          'text-field': [
            'format',
            ['get', 'text'],
            {
              'text-font': ['get', 'font'],
              'text-color': ['get', 'color'],
              'text-opacity': ['get', 'opacity'],
              'text-allow-overlap': ['get', 'allowOverlap'],
            },
          ],
          'text-size': ['get', 'size'],
          'text-justify': ['get', 'justify'],
          'text-anchor': ['get', 'anchor'],
          'text-offset': ['get', 'offset'],
        }
      default:
        return {}
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
      layout: this._getLayerLayout(),
    })
    this._source = this._viewer.map.getSource(this._sourceId)
    this._delegate = this._viewer.map.getLayer(this._id)
    this.fire('added')
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
   * @private
   */
  _addOverlay(overlay) {
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

  /**
   *
   * @param overlay
   * @returns {VectorLayer}
   */
  addOverlay(overlay) {
    if (!overlay) {
      return this
    }

    if (overlay.type.toLocaleLowerCase() !== this._vectorType) {
      throw 'the overlay type must be match the layer vector type'
    }
    this._addOverlay(overlay)
    this._ready.then(() => {
      if (this._vectorType === VectorType.BILLBOARD) {
        if (!this._viewer.map.hasImage(overlay.icon)) {
          this._viewer.map.loadImage(overlay.icon).then((image) => {
            this._viewer.map.addImage(overlay.icon, image.data)
            this._source && this._source.setData(this._dataJson)
          })
        } else {
          this._source && this._source.setData(this._dataJson)
        }
      } else {
        this._source && this._source.setData(this._dataJson)
      }
    })

    return this
  }

  /**
   *
   * @param overlays
   * @returns {VectorLayer}
   */
  addOverlays(overlays) {
    if (!Array.isArray(overlays)) {
      return this
    }

    const filters = overlays.filter(
      (overlay) => overlay.type.toLocaleLowerCase() !== this._vectorType
    )
    if (filters && filters.length > 0) {
      throw 'the overlays type must be match the layer vector type'
    }

    const iconSet = new Set()
    overlays.forEach((overlay) => {
      this._addOverlay(overlay)
      if (this._vectorType === VectorType.BILLBOARD) {
        iconSet.add(overlay.icon)
      }
    })
    const icons = [...iconSet]
    this._ready.then(() => {
      if (this._vectorType === VectorType.BILLBOARD) {
        const promises = icons.map((icon) => {
          if (!this._viewer.map.hasImage(icon)) {
            return this._viewer.map.loadImage(icon)
          }
          return null
        })
        Promise.allSettled(promises).then((results) => {
          results.forEach((result, index) => {
            if (result.value) {
              this._viewer.map.addImage(icons[index], result.value.data)
            }
          })
          this._source && this._source.setData(this._dataJson)
        })
      } else {
        this._source && this._source.setData(this._dataJson)
      }
    })

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
