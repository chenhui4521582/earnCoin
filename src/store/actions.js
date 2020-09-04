import AppCall from '@/utils/native/index'
import { userIsVisitor } from '@/services/user'
import _get from 'lodash.get'
export default {
  /** 获取用户是否是游客 **/
  USER_IS_VISITOR ({ commit }, params) {
    return userIsVisitor(params).then(res => {
      const {code, data, message} = _get(res, 'data')
      if(code == 200) {
        commit('SET_VISITORY', data)
      }
      return res
    })
  },
  /** 获取用户设备id **/
  async GET_DEVICEID ({ commit }) {
    try {
      let deviceID = await AppCall.getDeviceID()
      commit('SET_DEVICEID', deviceID)
    } catch {}
  },
  /** 获取设备版本 **/
  async GET_APP_VERSION ({ commit }) {
    try {
      let product = await AppCall.getProductData()
      product && ( product = JSON.parse(product) )
      if(product.appVersion) {
        localStorage.setItem('APP_VERSION', product.appVersion)
        commit('SET_APP_VERSION', product.appVersion)
      }
    } catch {}
  }
}
