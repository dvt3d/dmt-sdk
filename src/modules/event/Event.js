import EventDispatcher from './EventDispatcher'

class Event {
  constructor() {
    this._dispatcher = new EventDispatcher()
  }
  /**
   * @param type
   * @param callback
   * @returns {any}
   * @private
   */
  _on(type, callback) {
    this._dispatcher.addEventListener(type, callback)
  }

  /**
   * @param type
   * @param callback
   * @returns {boolean}
   * @private
   */
  _off(type, callback) {
    this._dispatcher.removeEventListener(type, callback)
  }

  /**
   * @param type
   * @param callback
   * @returns {boolean}
   * @private
   */
  _once(type, callback) {
    //  this._delegate.once(type, callback)
  }

  /**
   * @param type
   * @param params
   * @private
   */
  _fire(type, params) {
    this._dispatcher.dispatchEvent(type, params)
  }

  /**
   * Subscribe event
   * @param type
   * @param callback
   * @returns remove callback function
   */
  on(type, callback) {
    this._on(type, callback)
    return this
  }

  /**
   * Subscribe once event
   * @param type
   * @param callback
   * @param context
   */
  once(type, callback) {
    this._once(type, callback)
    return this
  }

  /**
   * Unsubscribe event
   * @param type
   * @param callback
   * @param context
   * @returns Boolean
   */
  off(type, callback) {
    this._off(type, callback)
    return this
  }

  /**
   * Trigger subscription event
   * @param type
   * @param params
   */
  fire(type, params) {
    this._fire(type, params)
    return this
  }
}

export default Event
