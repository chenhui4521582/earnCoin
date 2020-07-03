import $axios from './http/http'
import Api from './API/API'

/**
 * @description 首页  昨日金币排行
 */
const getYesterdayRank = function () {
  return $axios.post(Api.getYesterdayRank)
}

/**
 * @description 首页  昨日金币排行
 */
const getIconList = function () {
  return $axios.post(Api.getIconList)
}

export { getYesterdayRank, getIconList }

const Services = {
  getYesterdayRank,
  getIconList
}
export default Services