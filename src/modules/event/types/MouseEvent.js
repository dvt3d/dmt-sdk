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

  _raycast() {}

  /**
   *
   */
  _getMouseInfo(posInfo) {
    let info = {
      layers: [],
      overlays: [],
    }
    if (this._viewer.sceneMode === SceneMode.MAP_SCENE) {
      let features = this._viewer.map.queryRenderedFeatures(posInfo.mouse)
      for (let i = 0; i < features.length; i++) {
        let feature = features[i]
        let layerId = feature.layer.id
        let layer = this._viewer.getLayer(layerId)
        if (layer) {
          info.layers.push(this._viewer.getLayer(layerId))
          let overlay = layer.getOverlay(feature.properties.overlayId)
          if (overlay) {
            info.overlays.push(overlay)
          }
        }
      }
    }
    return info
  }

  _raiseEvent(type, info) {
    let overlays = info.overlays
    let layers = info.layers
    if (overlays.length) {
      for (let i = 0; i < overlays.length; i++) {
        let overlay = overlays[i]
        overlay.fire(type, {
          overlay,
        })
        if (!overlay.allowDrillPicking) {
          break
        }
      }
    } else if (!overlays.length && layers.length) {
      layers.forEach((layer) => {
        layer.fire(type, {})
      })
    } else {
      //this._viewer.fire(type, {})
    }
  }

  /**
   *
   * @param {*} e
   */
  _onClick(e) {
    let posInfo = {
      lngLat: [],
      vec: [],
      mouse: {},
    }
    if (this._viewer.sceneMode === SceneMode.MAP_SCENE) {
      posInfo.mouse = e.point
    }
    let info = this._getMouseInfo(posInfo)
    this._raiseEvent('click', info)
  }

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
