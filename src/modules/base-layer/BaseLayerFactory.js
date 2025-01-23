import BaseLayerType from './BaseLayerType'
import BaseLayer from './BaseLayer'
import AMapProvider from './provider/AMapProvider'
import StyleProvider from './provider/StyleProvider'
import XYZProvider from './provider/XYZProvider'
import TDTProvider from './provider/TDTProvider'

class BaseLayerFactory {
  /**
   *
   * @param {*} options
   * @returns {BaseLayer}
   */
  static createStyleBaseLayer(options = {}) {
    return new BaseLayer(new StyleProvider(options), options)
  }

  /**
   *
   * @param {*} options
   * @returns {BaseLayer}
   */
  static createXYZBaseLayer(options = {}) {
    return new BaseLayer(new XYZProvider(options), options)
  }

  /**
   *
   * @param {*} options
   * @returns {BaseLayer}
   */
  static createAMapBaseLayer(options = {}) {
    return new BaseLayer(new AMapProvider(options), options)
  }

  /**
   *
   * @param {*} options
   * @returns {BaseLayer}
   */
  static createTDTBaseLayer(options = {}) {
    return new BaseLayer(new TDTProvider(options), options)
  }

  /**
   *
   * @param type
   * @param options
   * @returns {BaseLayer|null}
   */
  static createBaseLayer(type, options = {}) {
    switch (type) {
      case BaseLayerType.STYLE:
        return this.createStyleBaseLayer(options)
      case BaseLayerType.AMAP:
        return this.createAMapBaseLayer(options)
      case BaseLayerType.XYZ:
        return this.createXYZBaseLayer(options)
      case BaseLayerType.TDT:
        return this.createTDTBaseLayer(options)
      default:
        return null
    }
  }
}

export default BaseLayerFactory
