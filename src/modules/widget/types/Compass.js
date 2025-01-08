/**
 * @Author: Caven Chen
 */
import {
  compass_inner,
  compass_pitch_down,
  compass_pitch_up,
  compass_rotate_left,
  compass_rotate_right,
} from '../../icons'
import { DomUtil } from '../../utils'
import Widget from '../Widget'
import { SceneMode } from '../../constant'

class Compass extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'widget compass')
    this._inner = undefined
  }

  _mountContent() {
    const bg = DomUtil.create('div', 'bg')

    this._inner = DomUtil.parseDom(compass_inner, true, 'inner')
    this._inner.dataset.type = 'inner'
    this._inner.addEventListener('dblclick', this._reset.bind(this))

    const rotateLeft = DomUtil.parseDom(
      compass_rotate_left,
      true,
      'rotate-left'
    )
    rotateLeft.dataset.type = 'rotateLeft'
    rotateLeft.addEventListener('click', this._onClick.bind(this))

    const rotateRight = DomUtil.parseDom(
      compass_rotate_right,
      true,
      'rotate-right'
    )
    rotateRight.dataset.type = 'rotateRight'
    rotateRight.addEventListener('click', this._onClick.bind(this))

    const pitchUp = DomUtil.parseDom(compass_pitch_up, true, 'pitch-up')
    pitchUp.dataset.type = 'pitchUp'
    pitchUp.addEventListener('click', this._onClick.bind(this))

    const pitchDown = DomUtil.parseDom(compass_pitch_down, true, 'pitch-down')
    pitchDown.dataset.type = 'pitchDown'
    pitchDown.addEventListener('click', this._onClick.bind(this))

    this._wrapper.appendChild(bg)
    this._wrapper.appendChild(this._inner)
    this._wrapper.appendChild(rotateLeft)
    this._wrapper.appendChild(rotateRight)
    this._wrapper.appendChild(pitchUp)
    this._wrapper.appendChild(pitchDown)

    this._ready = true
  }

  _onClick(e) {
    e.preventDefault()
    let pitch = this._viewer.map.getPitch()
    let bearing = this._viewer.map.getBearing()

    if (Math.abs(pitch) > 85) {
      return
    }

    let deltaPitch = 0
    let deltaBearing = 0

    switch (e.target.dataset.type) {
      case 'rotateLeft': {
        deltaBearing = 10
        break
      }
      case 'rotateRight': {
        deltaBearing = -10
        break
      }
      case 'pitchUp': {
        deltaPitch = 10
        break
      }
      case 'pitchDown': {
        deltaPitch = -10
        break
      }

      default: {
        break
      }
    }

    this._viewer.map.easeTo({
      pitch: pitch + deltaPitch,
      bearing: bearing + deltaBearing,
      easing: (t) => {
        return t * (2 - t)
      },
    })
  }

  _reset(e) {
    e.preventDefault()
    this._viewer.map.easeTo({
      bearing: 0,
      pitch: 0,
      easing: (t) => {
        return t * (2 - t)
      },
    })
  }

  _installHook() {
    if (this._viewer.sceneMode === SceneMode.MAP_SCENE) {
      const self = this
      Object.defineProperty(this._viewer, 'compass', {
        get() {
          return self
        },
      })
    }
  }

  _onRotate() {
    let pitch = this._viewer.map.getPitch()
    let bearing = this._viewer.map.getBearing()
    this._inner.style.cssText = `transform: rotateX(${-pitch}deg) rotateZ(${-bearing}deg);`
  }

  _onPitch() {
    let pitch = this._viewer.map.getPitch()
    let bearing = this._viewer.map.getBearing()
    this._inner.style.cssText = `transform: rotateX(${-pitch}deg) rotateZ(${-bearing}deg);`
  }

  _bindEvent() {
    this._viewer.map.on('rotate', this._onRotate.bind(this))
    this._viewer.map.on('pitch', this._onPitch.bind(this))
  }

  _unbindEvent() {
    this._viewer.map.off('rotate', this._onRotate.bind(this))
    this._viewer.map.off('pitch', this._onPitch.bind(this))
  }
}

export default Compass
