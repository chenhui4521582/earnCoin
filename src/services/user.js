import $axios from './http/http'
import Api from './API/API'

/**
 * @description 用户  获取用户信息
 */
const getUserCenter = function () {
  return $axios.post(Api.getUserCenter)
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

/**
 * @description 获取OpenToken
 */
const getOpenToken = function () {
  return $axios.post(Api.getOpenToken)
}

/**
 * @description 游客登录
 */
const visitorLogin = function (params) {
  return $axios.post(Api.visitorLogin, params)
}

/**
 * @description 换绑发送验证码校验
 */
const changeUpdatePhoneCode = async (smsCode) => {
  const { data } = await $axios.post(Api.checkUpdatePhoneSmsUrl, { smsCode })
  return data
}

/**
 * @description 用户原手机号校验
 */
const checkOriginalPhoneNo = async phoneNo => {
  const { data } = await $axios.post(Api.checkOriginalPhoneNo, { phoneNo })
  return data
}

/**
 * @description 换绑发送验证码
 */
const updatePhoneCode = async () => {
  const { data } = await $axios.post(Api.sendUpdatePhoneSmsUrl)
  return data
}

/**
 * @description 用户原手机号校验
 */
const getAppVersion = function () {
  return $axios.post(Api.getAppVersion)
}

/**
 * @description 用户  判断用户是否是游客
 */
const userIsVisitor = function (params) {
  return $axios.post(Api.userIsVisitor, params)
}

/**
 * @description 用户  正式用户绑定微信
 */
const userBindWechat = function (params) {
  return $axios.post(Api.userBindWechat, params)
}

/**
 * @description 用户  判断用户是否过期
 */
const tokenVerify = function (params) {
  return $axios.post(Api.tokenVerify, params)
}

/**
 * @description 用户  判断个人中心是否显示banner
 */
const isShowBanner = function (params) {
  return $axios.post(Api.isShowBanner, params)
}

export { 
  getUserCenter,
  getPhoneCode,
  bindMobilePhone,
  isBindGZH,
  getUserPhone,
  wechatLogin,
  sendCode,
  getRequestToken,
  getAccessToken,
  getOpenToken,
  visitorLogin,
  updatePhoneCode,
  changeUpdatePhoneCode,
  checkOriginalPhoneNo,
  getAppVersion,
  userIsVisitor,
  userBindWechat,
  tokenVerify,
  isShowBanner
}

const Services = {
  getUserCenter,
  getPhoneCode,
  bindMobilePhone,
  isBindGZH,
  getUserPhone,
  wechatLogin,
  sendCode,
  getRequestToken,
  getAccessToken,
  getOpenToken,
  visitorLogin,
  updatePhoneCode,
  changeUpdatePhoneCode,
  checkOriginalPhoneNo,
  getAppVersion,
  userIsVisitor,
  userBindWechat,
  isShowBanner
}
export default Services