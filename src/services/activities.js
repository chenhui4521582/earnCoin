import $axios from './http/http'
import Api from './API/API'

/**
 * @description   邀请豪礼活动  获取活动信息 
 */
const share_getActiveInfo = function () {
  return $axios.post(Api.share_getActiveInfo)
}

/**
 * @description   邀请豪礼活动  好友信息
 */
const share_getFriends = function (params) {
  return $axios.post(Api.share_getFriends, params)
}

/**
 * @description   //邀请豪礼活动  跑马灯
 */
const share_getNotice = function () {
  return $axios.post(Api.share_getNotice)
}

/**
 * @description   //邀请豪礼活动  被邀请人下载注册后调用 
 */
const share_bindUser = function () {
  return $axios.post(Api.share_bindUser)
}

/**
 * @description   //邀请豪礼活动  被邀请人下载注册后调用 
 */
const share_download = function () {
  return $axios.post(Api.share_download)
}



export {
  share_getActiveInfo,
  share_getFriends,
  share_getNotice,
  share_bindUser,
  share_download
}

const Services = {
  share_getActiveInfo,
  share_getFriends,
  share_getNotice,
  share_bindUser,
  share_download
}

export default Services