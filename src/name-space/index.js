import MapLib from 'maplibre-gl'
import * as THREELib from 'three'
import * as THREEAddons from 'three/addons'

const THREE = {
  ...THREELib,
  ...THREEAddons,
}

export { THREE, MapLib }
