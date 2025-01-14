/**
 * @Author: Caven Chen
 */

import { THREE } from '../../name-space'
import { getParam } from '../../global-api'

const gltfLoader = new THREE.GLTFLoader()
const fbxLoader = new THREE.FBXLoader()
const objLoader = new THREE.OBJLoader()

class ModelLoader {
  constructor(scene) {
    this._scene = scene
  }

  /**
   *
   * @param url
   * @param options
   * @returns {Promise<unknown>}
   */
  loadGLTF(url, options) {
    const baseUrl = getParam('baseUrl')
    return gltfLoader.loadAsync(url)
  }

  /**
   *
   * @param data
   * @param options
   * @returns {Promise | Promise<unknown>}
   */
  loadGLB(data, options) {
    const baseUrl = getParam('baseUrl')
    return gltfLoader.parseAsync(data)
  }

  /**
   *
   * @param url
   * @returns {Promise | Promise<unknown>}
   */
  loadFBX(url) {
    return fbxLoader.loadAsync(url)
  }

  loadOBJ(url, options) {}

  loadModelByType(type, url, options) {}
}

export default ModelLoader
