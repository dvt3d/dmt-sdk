/**
 * @Author: Caven Chen
 */

import { setParam } from './global-api'

export * from './modules'

const DEF_BASE_URL = './libs/dm-sdk/resources/'

let _baseUrl = DEF_BASE_URL

let __isInitialized = false

export const config = {
  set baseUrl(baseUrl) {
    _baseUrl = baseUrl
  },

  get baseUrl() {
    return _baseUrl
  },
}

export function ready(options = {}) {
  if (__isInitialized) {
    return Promise.resolve()
  }
  // __cmdOut && __cmdOut()

  return new Promise((resolve) => {
    if (options['baseUrl']) {
      config.baseUrl = options['baseUrl']
    }
    __isInitialized = true
    setParam('baseUrl', options.baseUrl)
    setParam('isInitialized', __isInitialized)
    resolve()
  }).catch((e) => {
    throw new Error(e.message)
  })
}
