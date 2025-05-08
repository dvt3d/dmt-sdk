/**
 * @Author: Caven Chen
 */

import { setParam } from './global-api'

export * from './modules'

const DEF_BASE_URL = './libs/dmt-sdk/resources/'

let _baseUrl = DEF_BASE_URL

setParam('baseUrl', _baseUrl)

export const config = {
  set baseUrl(baseUrl) {
    _baseUrl = baseUrl
    setParam('baseUrl', _baseUrl)
  },

  get baseUrl() {
    return _baseUrl
  },
}
