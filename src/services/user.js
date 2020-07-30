import $axios from './http/http'
import Api from './API/API'
/**
 * @description 用户  获取用户金币信息
 */
const getAccountInfo = function () {
  return $axios.post(Api.getAccountInfo)
}

/**
 * @description 用户  获取用户信息
 */
const getUserInfo = function () {
  return $axios.post(Api.getUserInfo)
}

/**
 * @description 用户  用户任务信息
 */

const getTaskInfo = function () {
  return $axios.post(Api.getTaskInfo)
}

/**
 * @description 获取短信验证吗
 */
const getPhoneCode = function (phone) {
  return $axios.post(Api.getPhoneCode, { phone })
}

/**
 * @description 绑定手机提交
 */
const bindMobilePhone = function (phone, smsCode) {
  return $axios.post(Api.bindPhone, { phone, smsCode })
}

/**
 * @description 绑定手机提交
 */
const isBindGZH = function () {
  return $axios.post(Api.isBindGZH)
}

/**
 * @description 绑定手机提交
 */
const getUserPhone = function () {
  return $axios.post(Api.getUserPhone)
}

/**
 * @description 微信登录
 */
const wechatLogin = function (params) {
  return $axios.post(Api.wechatLogin, params)
}

/**
 * @description 发送验证码
 */
const sendCode = function (params) {
  return $axios.post(Api.sendCode, params)
}

/**
 * @description 获取requestToken
 */
const getRequestToken = function (params) {
  return $axios.post(Api.getRequestToken, params)
}


/**
 * @description 获取ACCESSToken
 */
const getAccessToken = function (params) {
  return $axios.post(Api.getAccessToken, params)
}

export { 
  getAccountInfo,
  getUserInfo,
  getTaskInfo,
  getPhoneCode,
  bindMobilePhone,
  isBindGZH,
  getUserPhone,
  wechatLogin,
  sendCode,
  getRequestToken,
  getAccessToken
}

const Services = {
  getAccountInfo,
  getUserInfo,
  getTaskInfo,
  getPhoneCode,
  bindMobilePhone,
  isBindGZH,
  getUserPhone,
  wechatLogin,
  sendCode,
  getRequestToken,
  getAccessToken
}
export default Services