import Compass from './types/Compass'

export function createWidgets() {
  return {
    compass: new Compass(),
  }
}
