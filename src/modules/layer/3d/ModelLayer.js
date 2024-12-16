import Layer from '../Layer'
import { THREE } from '../../../name-space'

class ModelLayer extends Layer {
  constructor(id) {
    super(id)
    this._delegate = THREE.Group()
    this._delegate.name = id
  }

  set show(show) {
    this._delegate.visible = show
  }

  _onAdd(viewer) {
    this._viewer = viewer
    const world = viewer.scene.world
    world.add(this._delegate)
  }

  _onRemove() {}
}

export default ModelLayer
