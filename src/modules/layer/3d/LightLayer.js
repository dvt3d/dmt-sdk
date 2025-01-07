import Layer from '../Layer'
import { THREE } from '../../../name-space'

class LightLayer extends Layer {
  constructor(id) {
    super(id)
    this._delegate = THREE.Group()
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
    const scene = viewer.scene
    scene.add(this._delegate)
  }

  /**
   *
   */
  _onRemove() {}
}

export default LightLayer
