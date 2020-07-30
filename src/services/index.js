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

export { getYesterdayRank, getRankList, getRankTab, getIconList }

const Services = {
  getYesterdayRank,
  getRankList,
  getRankTab,
  getIconList
}
export default Services