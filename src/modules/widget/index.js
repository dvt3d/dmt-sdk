/**
 * @Author: Caven Chen
 */

import BaseLayerPicker from './types/BaseLayerPicker'
import Compass from './types/Compass'
import DistanceLegend from './types/DistanceLegend'
import HawkEyeMap from './types/HawkEyeMap'
import LoadingMask from './types/LoadingMask'
import Popup from './types/Popup'
import ZoomController from './types/ZoomController'

export function createWidgets() {
  return {
    baseLayerPicker: new BaseLayerPicker(),
    compass: new Compass(),
    distanceLegend: new DistanceLegend(),
    hawkEyeMap: new HawkEyeMap(),
    loadingMask: new LoadingMask(),
    popup: new Popup(),
    zoomController: new ZoomController(),
  }
}
