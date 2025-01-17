/**
 * @Author: Caven Chen
 */

import Layer from '../Layer'

class ClusterLayer extends Layer {
  constructor(id, options = {}) {
    super()
    this._dataJson = {
      type: 'FeatureCollection',
      features: [],
    }
  }

  /**
   *
   * @private
   */
  _mountedHook() {}

  /**
   *
   * @param points
   * @returns {ClusterLayer}
   */
  addPoints(points) {
    return this
  }

  /**
   *
   * @returns {ClusterLayer}
   */
  clear() {
    return this
  }
}

export default ClusterLayer
