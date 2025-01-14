/**
 * @Author: Caven Chen
 */

import VectorLayer from './VectorLayer'
import { VectorType } from '../../constant'

const DEF_OPTS = {
  dashArray: [1, 1],
}

class DashLineLayer extends VectorLayer {
  constructor(id, options = {}) {
    super(id, VectorType.POLYLINE)
    this._options = {
      ...DEF_OPTS,
      ...options,
    }
  }

  /**
   *
   * @private
   */
  _getLayerPaint() {
    let layerPaint = super._getLayerPaint()
    layerPaint['line-dasharray'] = this._options.dashArray
    return layerPaint
  }
}

export default DashLineLayer
