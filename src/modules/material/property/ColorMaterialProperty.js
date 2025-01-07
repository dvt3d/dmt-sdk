import MaterialProperty from '../MaterialProperty'

class ColorMaterialProperty extends MaterialProperty {
  constructor(options = {}, isConstant = true) {
    super(isConstant)
  }
}

export default ColorMaterialProperty
