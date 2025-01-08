/**
 * @Author: Caven Chen
 */
import { DomUtil } from '../../utils'
import Widget from '../Widget'
import { SceneMode } from '../../constant'

class DistanceLegend extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'widget distance-legend')
  }

  _mountContent() {
    this._onZoom()
    this._ready = true
  }

  _installHook() {
    if (this._viewer.sceneMode === SceneMode.MAP_SCENE) {
      const self = this
      Object.defineProperty(this._viewer, 'distanceLegend', {
        get() {
          return self
        },
      })
    }
  }

  _getDecimalRoundNum(d) {
    const multiplier = Math.pow(10, Math.ceil(-Math.log(d) / Math.LN10))
    return Math.round(d * multiplier) / multiplier
  }

  _getRoundNum(num) {
    const pow10 = Math.pow(10, `${Math.floor(num)}`.length - 1)
    let d = num / pow10

    d =
      d >= 10
        ? 10
        : d >= 5
        ? 5
        : d >= 3
        ? 3
        : d >= 2
        ? 2
        : d >= 1
        ? 1
        : this._getDecimalRoundNum(d)
    return pow10 * d
  }

  _onZoom() {
    const map = this._viewer.map
    const optWidth = 100
    const y = map._container.clientHeight / 2
    const x = map._container.clientWidth / 2
    const left = map.unproject([x - optWidth / 2, y])
    const right = map.unproject([x + optWidth / 2, y])
    const globeWidth = Math.round(map.project(right).x - map.project(left).x)
    const maxWidth = Math.min(optWidth, globeWidth, map._container.clientWidth)
    const maxMeters = left.distanceTo(right)
    const maxDistance = maxMeters > 1000 ? maxMeters / 1000 : maxMeters
    const distance = this._getRoundNum(maxDistance)
    const ratio = distance / maxDistance
    this._wrapper.style.width = `${maxWidth * ratio}px`
    this._wrapper.innerHTML = `${distance}&nbsp;${
      maxMeters > 1000 ? 'km' : 'm'
    }`
  }

  _bindEvent() {
    this._viewer.map.on('zoom', this._onZoom.bind(this))
  }

  _unbindEvent() {
    this._viewer.map.off('zoom', this._onZoom.bind(this))
  }
}

export default DistanceLegend
