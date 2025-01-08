/**
 * @Author: Caven Chen
 */
import Compass from './types/Compass'
import ZoomController from './types/ZoomController.js'
import DistanceLegend from './types/DistanceLegend.js'

export function createWidgets() {
  return {
    compass: new Compass(),
    zoomController: new ZoomController(),
    distanceLegend: new DistanceLegend(),
  }
}
