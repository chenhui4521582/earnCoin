import $axios from './http/http'
import Api from './API/API'
/**
 * @description 趣头条  激活 注册
 * 0:激活，1：注册（绑定手机或者微信）
 */
const qttReport = function (params) {
  return $axios.post(Api.qttReport, params)
}

export {
  qttReport
} 