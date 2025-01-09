/**
 * @Author: Caven Chen
 */

import { DomUtil } from '../../utils'
import Widget from '../Widget'

class LoadingMask extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'widget loading-mask')
  }

  _mountContent() {
    let el = DomUtil.parseDom(
      `
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    `,
      true,
      'loading'
    )
    this._wrapper.appendChild(el)
    this._ready = true
  }

  _installHook() {
    const self = this
    Object.defineProperty(this._viewer, 'loadingMask', {
      get() {
        return self
      },
    })
  }
}

export default LoadingMask
