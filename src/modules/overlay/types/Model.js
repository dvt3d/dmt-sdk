/**
 * @Author: Caven Chen
 */

import Overlay from '../Overlay'
import Parse from '../../parse/Parse'
import State from '../../state/State'

class Model extends Overlay {
  constructor(position, url) {
    super()
    this._position = Parse.parsePosition(position)
    this._url = url
    this._state = State.INITIALIZED
  }
}

export default Model
