import BaseLayer from './BaseLayer'
import AMapProvider from './provider/AMapProvider.js'
import StyleProvider from './provider/StyleProvider'
import XYZProvider from './provider/XYZProvider.js'

class BaseLayerFactory {
  /**
   *
   * @param {*} options
   * @returns
   */
  static createStyleBaseLayer(options = {}) {
    return new BaseLayer(new StyleProvider(options), options)
  }

  /**
   *
   * @param {*} options
   * @returns
   */
  static createXYZBaseLayer(options = {}) {
    return new BaseLayer(new XYZProvider(options), options)
  }

  /**
   *
   * @param {*} options
   * @returns
   */
  static createAMapBaseLayer(options = {}) {
    return new BaseLayer(new AMapProvider(options), options)
  }
}

export default BaseLayerFactory
