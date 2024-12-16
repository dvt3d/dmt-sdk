import { SceneTransform } from '@dvgis/maplibre-three-plugin'

class Position {
  constructor(x, y, z, heading = 0, pitch = 0, roll = 0) {
    this._x = x
    this._y = y
    this._z = z
    this._heading = heading
    this._pitch = pitch
    this._roll = roll
  }

  set x(x) {
    this._x = x
  }

  get x() {
    return this._x
  }

  set y(y) {
    this._y = y
  }

  get y() {
    return this._y
  }

  set z(z) {
    this._z = z
  }

  get z() {
    return this._z
  }

  set heading(heading) {
    this._heading = heading
  }

  get heading() {
    return this._heading
  }

  set pitch(pitch) {
    this._pitch = pitch
  }

  get pitch() {
    return this._pitch
  }

  set roll(roll) {
    this._roll = roll
  }

  get roll() {
    return this._roll
  }

  toLngLat() {}

  /**
   *
   * @param {*} lng
   * @param {*} lat
   * @param {*} alt
   * @returns
   */
  static fromLngLat(lng, lat, alt) {
    let v3 = SceneTransform.lngLatToVector3(lng, lat, alt)
    return new Position(v3.x, v3.y, v3.z)
  }

  /**
   *
   * @param {*} array
   * @returns
   */
  static fromLngLatArray(array) {
    let v3 = SceneTransform.lngLatToVector3(array[0], array[1], array[2] || 0)
    return new Position(v3.x, v3.y, v3.z)
  }
}

export default Position
