import MaterialProperty from '../MaterialProperty'

class ColorMaterialProperty extends MaterialProperty {
  constructor(options = {}, isConstant = true) {
    super('color', isConstant)
  }
}

export default ColorMaterialProperty
