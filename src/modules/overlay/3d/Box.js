import { THREE } from '../../../name-space'
import { MaterialCache } from '../../material'
import Overlay from '../Overlay'

class Box extends Overlay {
  constructor(position, dimensions) {
    super()
    this._position = position
    this._dimensions = dimensions
    this._delegate = new THREE.Mesh()
    this._geometry = undefined
  }

  /**
   *
   * @private
   */
  _mountedHook() {
    this._geometry = new THREE.BoxGeometry(
      this._dimensions.x,
      this._dimensions.y,
      this._dimensions.z
    )
    this._delegate.position.set(
      this._position.x,
      this._position.y,
      this._position.z
    )
    this._delegate.geometry = this._geometry
    this._delegate.material =
      this._style?.material?.getValue() || MaterialCache.BASIC.getValue()
  }

  _removedHook() {}
}

export default Box
