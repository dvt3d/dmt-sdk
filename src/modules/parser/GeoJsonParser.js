import GeoJSON from 'geojson'

const Empty_GeoJSON = {
  type: 'FeatureCollection',
  features: [],
}

class GeoJsonParser {
  static parseOverlaysToGeoJson(overlays, type) {
    if (!overlays || !overlays.length) {
      return Empty_GeoJSON
    }
    let data = overlays.map((item) => {
      return {
        id: item.id,
        coords: item.position,
      }
    })
    return GeoJSON.parse(data, { id: 'id', [type]: 'coords' })
  }
}

export default GeoJsonParser
