import Overlay from '../Overlay.js'

const DEF_STYLE = {
  size: 5,
  color: '#ffffff',
  blur: '0',
  opacity: 1,
  strokeWidth: 2,
  strokeColor: '#0000ff',
  strokeOpacity: 1,
}

class Point extends Overlay {
  constructor(position) {
    super()
    this._position = position
    this._style = DEF_STYLE
  }

  get type() {
    return Overlay.getType('point')
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

  /**
   *
   * @returns {{}}
   */
  toFeature() {
    return {
      type: 'Point',
      properties: {
        overlayId: this._overlayId,
        id: this._bid,
        show: this._show,
      },
    }
  }
}

Overlay.registerType('point')

export default Point
