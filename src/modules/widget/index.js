/**
 * @Author: Caven Chen
 */
import Compass from './types/Compass'
import ZoomController from './types/ZoomController'
import DistanceLegend from './types/DistanceLegend'
import HawkEyeMap from './types/HawkEyeMap.js'

export function createWidgets() {
  return {
    compass: new Compass(),
    zoomController: new ZoomController(),
    distanceLegend: new DistanceLegend(),
    hawkEyeMap: new HawkEyeMap(),
  }
}
