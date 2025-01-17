import { SceneTransform } from '@dvgis/maplibre-three-plugin'

class Position {
  constructor(x, y, z, heading = 0, pitch = 0, roll = 0) {
    this._x = +x
    this._y = +y
    this._z = +z
    this._heading = +heading
    this._pitch = +pitch
    this._roll = +roll
  }

  set x(x) {
    this._x = +x
  }

  get x() {
    return this._x
  }

  set y(y) {
    this._y = +y
  }

  get y() {
    return this._y
  }

  set z(z) {
    this._z = +z
  }

  get z() {
    return this._z
  }

  set heading(heading) {
    this._heading = +heading
  }

  get heading() {
    return this._heading
  }

  set pitch(pitch) {
    this._pitch = +pitch
  }

  get pitch() {
    return this._pitch
  }

  set roll(roll) {
    this._roll = +roll
  }

  get roll() {
    return this._roll
  }

  /**
   *
   * @returns {*[]}
   */
  toArray() {
    return [this.x, this.y, this.z, this.heading, this.pitch, this.roll]
  }

  /**
   *
   * @returns {string}
   */
  toString() {
    return `${this.x},${this.y},${this.z},${this.heading},${this.pitch},${this.roll}`
  }

  /**
   *
   * @returns {{lng, heading, alt, roll, pitch, lat}}
   */
  toObject() {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
      heading: this.heading,
      pitch: this.pitch,
      roll: this.roll,
    }
  }

  /**
   *
   * @returns {*}
   */
  toDegrees() {
    return SceneTransform.vector3ToLngLat(this)
  }

  /**
   *
   * @param lng
   * @param lat
   * @param alt
   * @returns {Position}
   */
  static fromDegrees(lng, lat, alt = 0) {
    let v3 = SceneTransform.lngLatToVector3(lng, lat, alt)
    return new Position(v3.x, v3.y, v3.z)
  }

  /**
   *
   * @param coords
   */
  static fromDegreesArray(coords) {
    if (coords.length < 2 || coords.length % 2 !== 0) {
      throw 'the number of coords must be a multiple of 2 and at least 2'
    }
    const length = coords.length
    const result = new Array(length / 2)
    for (let i = 0; i < length; i += 2) {
      const lng = coords[i]
      const lat = coords[i + 1]
      result[i / 2] = this.fromDegrees(lng, lat, 0)
    }
    return result
  }

  /**
   *
   * @param coords
   * @returns {any[]}
   */
  static fromDegreesArrayHeights(coords) {
    if (coords.length < 3 || coords.length % 3 !== 0) {
      throw 'the number of coords must be a multiple of 3 and at least 3'
    }
    const length = coords.length
    const result = new Array(length / 3)
    for (let i = 0; i < length; i += 3) {
      const lng = coords[i]
      const lat = coords[i + 1]
      const alt = coords[i + 2]
      result[i / 3] = this.fromDegrees(lng, lat, alt)
    }
    return result
  }

  /**
   *
   * @param arr
   * @returns {Position}
   */
  static fromArray(arr) {
    let position = new Position()
    if (Array.isArray(arr)) {
      position.x = +arr[0]
      position.y = +arr[1]
      position.z = +arr[2]
      position.heading = +arr[3]
      position.pitch = +arr[4]
      position.roll = +arr[5]
    }
    return position
  }

  /**
   *
   * @param str
   * @returns {Position}
   */
  static fromString(str) {
    let position = new Position()
    if (str && typeof str === 'string') {
      let arr = str.split(',')
      position = this.fromArray(arr)
    }
    return position
  }

  /**
   *
   * @param obj
   * @returns {Position}
   */
  static fromObject(obj) {
    return new Position(obj.x, obj.y, obj.z, obj.heading, obj.pitch, obj.roll)
  }
}

export default Position
