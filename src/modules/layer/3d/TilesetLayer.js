import Layer from '../Layer'
import { THREE } from '../../../name-space'

class MeshLayer extends Layer {
  constructor(id) {
    super(id)
    this._delegate = THREE.Group()
    this._delegate.name = id
  }

  _onAdd(viewer) {
    this._viewer = viewer
    const world = viewer.scene.world
    world.add(this._delegate)
  }

  _onRemove() {}
}

export default MeshLayer
