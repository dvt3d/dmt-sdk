import { Event } from '../../event'
import BaseLayerType from '../BaseLayerType'

class StyleProvider extends Event {
  constructor(options = {}) {
    super()
    this._url = options.url
    this._data = options.data
    this._selected = false
    this.on('add', this._onAdd.bind(this))
  }

  get type() {
    return BaseLayerType.STYLE
  }

  set selected(selected) {
    this._selected = selected
    if (this._viewer && selected) {
      this._viewer.map.once('style.load', this._onStyleLoad.bind(this))
      this._viewer.map.setStyle(this._url || this._data, { diff: false })
    }
  }

  get selected() {
    return this._selected
  }

  /**
   *
   * @param viewer
   * @private
   */
  _onAdd(viewer) {
    this._viewer = viewer
  }

  /**
   *
   * @private
   */
  _onStyleLoad() {
    let layers = this._viewer.getLayers()
    for (let i = 0; i < layers.length; i++) {
      let layer = layers[i]
      delete this._viewer._layerCache[layer.id]
      this._viewer.addLayer(layer)
    }
  }

  /**
   *
   * @param ids
   * @param visible
   */
  setVisibilityFilter(ids, visible) {
    return this
  }
}

BaseLayerType.STYLE = 'style'

export default StyleProvider
