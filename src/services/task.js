import $axios from './http/http'
import Api from './API/API'
/**
 * @description 签到  获取签到数据
 */
const getSignList = function () {
  return $axios.post(Api.getSignList)
}

/**
 * @description 签到  签到点击
 */
const sign = function () {
  return $axios.post(Api.sign)
}

/**
 * @description 签到  签到状态
 */
const getTodaySign = function () {
  return $axios.post(Api.getTodaySign)
}

/**
 * @description 任务详情  获取高额任务列表
 */
const getGreatTaskList = function () {
  return $axios.post(Api.getGreatTaskList)
}

/**
 * @description 任务详情  获取我的任务列表
 */
const getMyTaskList = function () {
  return $axios.post(Api.getMyTaskList)
}

/**
 * @description 任务详情  获取任务详情
 */
const getTaskDetail = function (id) {
  return $axios.post(Api.getTaskDetail.replace('{taskId}', id))
}

/**
 * @description 任务详情  开始任务
 */
const startTask = function (id) {
  return $axios.post(Api.startTask.replace('{taskId}', id))
}

/**
 * @description 任务详情  领取奖励
 */
const getAward = function (id) {
  return $axios.post(Api.getAward.replace('{configId}', id))
}

/**
 * @description 任务详情  领取礼包
 */
const getCard = function (id) {
  return $axios.post(Api.getCard.replace('{batchId}', id))
}

export { getSignList, sign, getTodaySign, getGreatTaskList, getTaskDetail, getMyTaskList, startTask, getAward, getCard }

const Services = {
  getSignList,
  sign,
  getTodaySign,
  getGreatTaskList,
  getTaskDetail,
  getMyTaskList,
  startTask,
  getAward,
  getCard
}
export default Services