/**
 * @Author: Caven Chen
 */

class LngLatAlt {
  constructor(lng, lat, alt = 0) {
    this._lng = +lng
    this._lat = +lat
    this._alt = +alt
    if (this._lat > 90 || this._lat < -90) {
      throw new Error(
        'Invalid LngLat latitude value: must be between -90 and 90'
      )
    }
  }

  set lng(lng) {
    this._lng = +lng
  }

  get lng() {
    return this._lng
  }

  set lat(lat) {
    this._lat = +lat
  }

  get lat() {
    return this._lat
  }

  set alt(alt) {
    this._alt = alt
  }

  get alt() {
    return this._alt
  }

  /**
   *
   * @returns {string}
   */
  toString() {
    return `${this._lng},${this._lat},${this._alt}`
  }

  /**
   *
   * @returns {*[]}
   */
  toArray() {
    return [this._lng, this._lat, this._alt]
  }

  /**
   *
   * @param str
   * @returns {LngLatAlt}
   */
  static fromString(str) {
    let arr = str.split(',')
    return new LngLatAlt(arr[0], arr[1], arr[2] || 0)
  }

  /**
   *
   * @param arr
   * @returns {LngLatAlt}
   */
  static fromArray(arr) {
    return new LngLatAlt(arr[0], arr[1], arr[2] || 0)
  }
}

export default LngLatAlt
