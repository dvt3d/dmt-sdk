import BasicMaterialProperty from './property/BasicMaterialProperty'

const BASIC = new BasicMaterialProperty({ color: '#ff0000' })

const cache = {}

class MaterialCache {
  /**
   *
   * @param {*} material
   */
  static addMaterial(material) {
    cache[material.id] = material
  }

  /**
   *
   * @param {*} material
   */
  static removeMaterial(material) {
    delete cache[material.id]
  }

  /**
   *
   */
  static getMaterial() {}

  /**
   *
   * @param {*} frameState
   */
  static update(frameState) {}
}

MaterialCache.BASIC = BASIC

export default MaterialCache
