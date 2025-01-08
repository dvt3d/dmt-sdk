import { Event } from '../event'
class Widget extends Event {
  constructor() {
    super()
    this._enabled = false
    this._viewer = undefined
    this._ready = false
    this._wrapper = undefined
    this.on('install', this._onInstall.bind(this))
  }

  set enabled(enabled) {
    if (this._enabled === enabled) {
      return
    }
    this._enabled = enabled
    this._enabledHook()
  }

  get enabled() {
    return this._enabled
  }

  _bindEvent() {}

  _unbindEvent() {}

  /**
   *
   */
  _enabledHook() {
    !this._ready && this._mountContent()
    if (this._enabled) {
      !this._wrapper.parentNode &&
        this._viewer.widgetContainer.appendChild(this._wrapper)
      this._bindEvent()
    } else {
      this._unbindEvent()
      this._wrapper.parentNode &&
        this._viewer.widgetContainer.removeChild(this._wrapper)
    }
  }

  _installHook() {}

  _onInstall(viewer) {
    this._viewer = viewer
    this._installHook()
  }
}

export default Widget
