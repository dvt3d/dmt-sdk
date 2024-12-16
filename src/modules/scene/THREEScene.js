import { THREE } from '../../name-space'
class THREEScene {
  constructor(viewer, options = {}) {
    this._viewer = viewer
    this._scene = new THREE.Scene()
    this._camera = new THREE.PerspectiveCamera(
      options.fov || 60,
      this._viewer.canvas.clientWidth / this._viewer.canvas.clientHeight,
      options.near || 0.01,
      options.far || 1e21
    )
    this._camera.position.set(0, 0, 1)
    this._renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: this._viewer.canvas,
      preserveDrawingBuffer: options.preserveDrawingBuffer,
    })
    this._renderer.setPixelRatio(window.devicePixelRatio)
    this._renderer.setSize(
      this._viewer.canvas.clientWidth,
      this._viewer.canvas.clientHeight
    )
    this._controls = new THREE.OrbitControls(this._camera, this._viewer.canvas)
    this._world = new THREE.Group()
    this._world.name = 'world'
    this._scene.add(this._world)
    requestAnimationFrame(this.render.bind(this))
  }

  get scene() {
    return this._scene
  }

  get renderer() {
    return this._camera
  }

  get camera() {
    return this._camera
  }

  get world() {
    return this._world
  }

  /**
   *
   */
  render() {
    requestAnimationFrame(this.render.bind(this))
    this._controls.update()
    if (this._camera && this._renderer) {
      this._renderer.render(this._scene, this._camera)
    }
  }
}

export default THREEScene
