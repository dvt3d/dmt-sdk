import Layer from '../Layer'
import { THREE } from '../../../name-space'

class MeshLayer extends Layer {
  constructor(id) {
    super(id)
    this._delegate = new THREE.Group()
    this._delegate.name = id
  }

  set show(show) {
    this._delegate.visible = show
  }

  /**
   *
   * @param {*} viewer
   */
  _onAdd(viewer) {
    this._viewer = viewer
    const world = viewer.scene.world
    world.add(this._delegate)
  }

  /**
   *
   */
  _onRemove() {}
}

export default MeshLayer
