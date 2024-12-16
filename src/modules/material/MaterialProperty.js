import { Util } from '../utils'
import MaterialCache from './MaterialCache'

class MaterialProperty {
  constructor(type, isConstant) {
    this._id = Util.uuid()
    this._type = type
    this._isConstant = isConstant
    this._material = undefined
    !isConstant && MaterialCache.addMaterial(this)
  }

  get id() {
    return this._id
  }

  getValue() {
    return this._material
  }
}

export default MaterialProperty
