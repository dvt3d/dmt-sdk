/**
 * @Author: Caven Chen
 */
import Position from '../position/Position'

class Parse {
  /**
   *
   * @param lngLat
   * @returns {Position}
   */
  static parsePosition(position) {
    if (typeof position === 'string') {
      return Position.fromString(position)
    } else if (Array.isArray(position)) {
      return Position.fromArray(position)
    } else if (Object(position) instanceof Position) {
      return position
    } else {
      return new Position(position.x, position.y, position.z)
    }
  }

  /**
   *
   * @param positions
   * @returns {Position[]}
   */
  static parsePositions(positions) {
    if (typeof positions === 'string') {
      if (positions.indexOf('#') >= 0) {
        throw new Error('the positions invalid')
      }
      positions = positions.split(';').filter((item) => !!item)
    }
    return positions.map((item) => {
      return this.parsePosition(item)
    })
  }
}

export default Parse
