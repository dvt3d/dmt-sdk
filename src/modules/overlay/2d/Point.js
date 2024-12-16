import Overlay from '../Overlay.js'

const DEF_STYLE = {}

class Point extends Overlay {
  constructor(position) {
    super()
    this._position = position
    this._style = DEF_STYLE
  }

  /**
   *
   * @param style
   * @returns {Point}
   */
  setStyle(style) {
    this._style = {
      ...this._style,
      ...style,
    }
    return this
  }
}

export default Point
