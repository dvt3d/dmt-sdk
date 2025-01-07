class EventDispatcher {
  constructor() {
    this._listeners = {}
  }

  /**
   *
   * @param {*} type
   * @param {*} listener
   */
  addEventListener(type, listener) {
    if (this._listeners === undefined) this._listeners = {}

    const listeners = this._listeners

    if (listeners[type] === undefined) {
      listeners[type] = []
    }

    if (listeners[type].indexOf(listener) === -1) {
      listeners[type].push(listener)
    }
  }

  /**
   *
   * @param {*} type
   * @param {*} listener
   * @returns
   */
  hasEventListener(type, listener) {
    if (this._listeners === undefined) return false

    const listeners = this._listeners

    return (
      listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1
    )
  }

  /**
   *
   * @param {*} type
   * @param {*} listener
   * @returns
   */
  removeEventListener(type, listener) {
    if (this._listeners === undefined) return

    const listeners = this._listeners
    const listenerArray = listeners[type]

    if (listenerArray !== undefined) {
      const index = listenerArray.indexOf(listener)

      if (index !== -1) {
        listenerArray.splice(index, 1)
      }
    }
  }

  /**
   *
   * @param {*} type
   * @param {*} params
   * @returns
   */
  dispatchEvent(type, params) {
    if (this._listeners === undefined) return

    const listeners = this._listeners
    const listenerArray = listeners[type]

    if (listenerArray !== undefined) {
      const array = listenerArray.slice(0)

      for (let i = 0, l = array.length; i < l; i++) {
        array[i].call(this, params)
      }
    }
  }
}
export default EventDispatcher
