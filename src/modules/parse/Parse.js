/**
 * @Author: Caven Chen
 */
import LngLatAlt from '../lng-lat-alt/LngLatAlt'

class Parse {
  /**
   *
   * @param lngLat
   * @returns {LngLatAlt}
   */
  static parseLngLatAlt(lngLatAlt) {
    if (typeof lngLatAlt === 'string') {
      return LngLatAlt.fromString(lngLatAlt)
    } else if (Array.isArray(lngLatAlt)) {
      return LngLatAlt.fromArray(lngLatAlt)
    } else if (Object(lngLatAlt) instanceof LngLatAlt) {
      return lngLatAlt
    } else {
      return new LngLatAlt(lngLatAlt.lng, lngLatAlt.lat, lngLatAlt.alt)
    }
  }

  /**
   *
   * @param lngLatAlts
   * @returns {LngLatAlt[]}
   */
  static parseLngLatAlts(lngLatAlts) {
    if (typeof lngLatAlts === 'string') {
      if (lngLatAlts.indexOf('#') >= 0) {
        throw new Error('the positions invalid')
      }
      lngLatAlts = lngLatAlts.split(';').filter((item) => !!item)
    }
    return lngLatAlts.map((item) => {
      return this.parseLngLatAlt(item)
    })
  }
}

export default Parse
