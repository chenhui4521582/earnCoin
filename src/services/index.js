import $axios from './http/http'
import Api from './API/API'

/**
 * @description 首页  获取排行数据排行
 */
const getRankList = function (type) {
  return $axios.post(`${Api.getRankList}/${type}`)
}

/**
 * @description 首页  获取排行Tab
 */
const getRankTab = function () {
  return $axios.post(`${Api.getRankTab}`)
}

/**
 * @description 首页  昨日金币排行
 */
const getYesterdayRank = function () {
  return $axios.post(Api.getYesterdayRank)
}

/**
 * @description 首页  获取金刚位
 */
const getIconList = function () {
  return $axios.post(Api.getIconList)
}

/**
 * @description 判断用户是否领取过红包
 */
const userIsReceive = function (params) {
  return $axios.post(Api.userIsReceive, params)
}

/**
 * @description 领取红包
 */
const getRedPacketAward = function (params) {
  return $axios.post(Api.getRedPacketAward, params)
}

/**
 * @description 告知后端领取了多少红包
 */
const sendRedPacketToServer = function () {
  return $axios.post(Api.sendRedPacketToServer)
}

/**
 * @description 获取新手1小时活动
 */
const getNewUserActive = function () {
  return $axios.post(Api.getNewUserActive)
}

/**
 * @description 开始新手1小时活动
 */
const startNewUserActive = function () {
  return $axios.post(Api.startNewUserActive)
}

/**
 * @description 关服公告
 */
const closeServer = function () {
  return $axios.post(Api.closeServer)
}

export { 
  getYesterdayRank, 
  getRankList, 
  getRankTab, 
  getIconList, 
  userIsReceive, 
  getRedPacketAward, 
  sendRedPacketToServer, 
  getNewUserActive, 
  startNewUserActive,
  closeServer
}

const Services = {
  getYesterdayRank,
  getRankList,
  getRankTab,
  getIconList,
  userIsReceive,
  getRedPacketAward,
  sendRedPacketToServer,
  getNewUserActive,
  startNewUserActive,
  closeServer
}
export default Services