import MaterialProperty from '../MaterialProperty'

const DEF_MATERIAL = {
  color: '#ffffff',
  blur: 0,
  opacity: 1,
  strokeWidth: 2,
  strokeColor: '#0000ff',
  strokeOpacity: 1,
}

class VectorPointMaterialProperty extends MaterialProperty {
  constructor(options) {
    super('vector-point', true)
    this._material = {
      ...DEF_MATERIAL,
      ...options,
    }
  }
}

export default VectorPointMaterialProperty
