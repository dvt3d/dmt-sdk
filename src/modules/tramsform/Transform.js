import { toRadian } from '../math'
import { EARTH_CIRCUMFERENCE } from '../constants'

class Transform {
  /**
   *
   * @param {*} map
   * @param {*} position
   * @returns
   */
  getMapZoomByPosition(map, position) {
    const transform = map.transform
    const pixelAltitude = Math.abs(
      Math.cos(toRadian(position.pitch)) * transform.cameraToCenterDistance
    )
    const metersInWorldAtLat =
      EARTH_CIRCUMFERENCE * Math.abs(Math.cos(toRadian(position.y)))
    const worldSize = (pixelAltitude / position.z) * metersInWorldAtLat
    return Math.round(Math.log(worldSize / transform.tileSize) / Math.LN2)
  }
}

export default Transform
