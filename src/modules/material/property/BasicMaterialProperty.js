import { THREE } from '../../../name-space'
import MaterialProperty from '../MaterialProperty'

class BasicMaterialProperty extends MaterialProperty {
  constructor(options = {}, isConstant = true) {
    super('basic', isConstant)
    this._material = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setStyle(options.color),
    })
  }
}

export default BasicMaterialProperty
