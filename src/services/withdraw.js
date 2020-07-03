import $axios from './http/http'
import Api from './API/API'
/**
 * @description 提现  获取用户金币信息
 */
const gzhBindPhone = function (openId, phone) {
  return $axios.post(`${Api.gzhBindPhone}/${openId}/${phone}`)
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


export { gzhBindPhone, getWithdrawList, getWithdrawLog, userWithDraw, getCoinLog }

const Services = {
  gzhBindPhone,
  getWithdrawList,
  getWithdrawLog,
  userWithDraw,
  getCoinLog
}
export default Services