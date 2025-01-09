import Event from '../Event'
import { SceneMode } from '../../constant'

class MouseEvent {
  constructor(viewer, options) {
    this._viewer = viewer
    this._options = options
    this._clickListener = this._onClick.bind(this)
    this._dblClickListener = this._onDblClick.bind(this)
    this._wheelListener = this._onWheel.bind(this)
    if (this._viewer.sceneMode === SceneMode.MAP_SCENE) {
      this._viewer.map.on('click', this._clickListener)
      this._viewer.map.on('dblClick', this._dblClickListener)
      this._viewer.map.on('wheel', this._wheelListener)
    } else {
      this._viewer.canvas.addEventListener('click', this._clickListener)
      this._viewer.canvas.addEventListener('dblClick', this._dblClickListener)
    }
  }

  /**
   *
   */
  _getMouseInfo(mousePosition) {}

  /**
   *
   * @param {*} e
   */
  _onClick(e) {}

  /**
   *
   * @param {*} e
   */
  _onDblClick(e) {}

  /**
   *
   * @param {*} e
   */
  _onWheel(e) {}
}

export default MouseEvent
