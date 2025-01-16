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

  /**
   *
   * @param overlay
   * @returns {MeshLayer}
   */
  addOverlay(overlay) {
    if (!overlay) {
      throw 'overlay is required'
    }
    if (this._cache[overlay.overlayId]) {
      throw `overlay ${overlay.overlayId} already exists`
    }
    overlay.fire('add', this)
    this._cache[overlay.overlayId] = overlay
    return this
  }

  /**
   *
   * @param overlays
   * @returns {MeshLayer}
   */
  addOverlays(overlays) {
    if (!overlays) {
      throw 'overlays is required'
    }
    if (!Array.isArray(overlays)) {
      throw 'overlays must be an array'
    }
    overlays.forEach((overlay) => {
      this.addOverlay(overlay)
    })
    return this
  }

  /**
   *
   * @param overlay
   */
  removeOverlay(overlay) {}
}

export default MeshLayer
