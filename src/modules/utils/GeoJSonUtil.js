class GeoJSonUtil {
  /**
   *
   * @param coordinates
   * @param properties
   * @returns {{type: string, geometry: {type: string, coordinates}, properties}}
   */
  static createPointFeature(coordinates, properties) {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: coordinates,
      },
      properties: properties,
    }
  }
}

export default GeoJSonUtil
