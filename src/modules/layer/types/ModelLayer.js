/**
 * @Author: Caven Chen
 */

import { THREE } from '../../../name-space'
import Layer from '../Layer'

class ModelLayer extends Layer {
  constructor(id) {
    super(id)
    this._delegate = THREE.Group()
    this._delegate.name = id
  }

  set show(show) {
    this._delegate.visible = show
  }

  _(viewer) {}
}

export default ModelLayer
