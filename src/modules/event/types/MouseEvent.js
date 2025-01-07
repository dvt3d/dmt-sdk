import Event from '../Event'
import { SceneMode } from '../../constant'

class MouseEvent {
  constructor(viewer, options) {
    this._viewer = viewer
    this._options = options
    if (this._viewer.sceneMode === SceneMode.MAP_SCENE) {
      this._viewer.map.on('click', this._onClick.bind(this))
      this._viewer.map.on('dblClick', this._onDblClick.bind(this))
      this._viewer.map.on('wheel', this._onWheel.bind(this))
    } else {
      this._viewer.canvas.addEventListener('click', this._onClick.bind(this))
      this._viewer.canvas.addEventListener(
        'dblClick',
        this._onDblClick.bind(this)
      )
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
