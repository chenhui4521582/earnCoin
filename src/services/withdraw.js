import $axios from './http/http'
import Api from './API/API'


/**
 * @description 提现  获取用户是否绑定手机号
 */
const isBindPhone = function (openId) {
  return $axios.post(`${Api.isBindPhone}/${openId}`)
}

/**
 * @description 提现  绑定手机号
 */
const gzhBindPhone = function (openId, phone, code) {
  return $axios.post(`${Api.gzhBindPhone}/${openId}/${phone}/${code}`)
}

/**
 * @description 提现  提现列表
 */
const getWithdrawList = function () {
  return $axios.post(Api.getWithdrawList)
}

/**
 * @description 提现  提现记录
 */
const getWithdrawLog = function () {
  return $axios.post(Api.getWithdrawLog)
}

/**
 * @description 提现  用户提现
 */
const userWithDraw = function (level) {
  return $axios.post(Api.userWithDraw.replace('{level}', level))
}

/**
 * @description 首页  金币明细记录
 */
const getCoinLog = function (params) {
  return $axios.post(Api.getCoinLog, params)
}

/**
 * @description 首页  发送验证码
 */
const sendCode = function (phone) {
  return $axios.post(`${Api.withdrawSendCode}/${phone}`)
}




export { isBindPhone, gzhBindPhone, getWithdrawList, getWithdrawLog, userWithDraw, getCoinLog, sendCode }

const Services = {
  isBindPhone,
  gzhBindPhone,
  getWithdrawList,
  getWithdrawLog,
  userWithDraw,
  getCoinLog,
  sendCode
}
export default Services