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

/**
 * @description   //邀请豪礼活动  用户关联 
 */
const share_userRelevance = async function (currentUserID) {
  /** 获取粘贴板数据 **/
  let copy = await AppCall.getClipboardContent()
  let from = copy && copy.split('&')[0].replace('from=', '')
  let userId = copy.split('&')[1].replace('userId=', '')
  if (from == 'earnShareNewUser' && userId && currentUserID) {
    try {
      let url = `//platform-api.beeplaying.com/point/api/invite/record/${userId}_${currentUserID}`
      $axios.post(url)
      AppCall.clearClipboardContent()
    } catch (e) { }
  }
}

export {
  share_getActiveInfo,
  share_getFriends,
  share_getNotice,
  share_bindUser,
  share_download,
  share_userRelevance
}

const Services = {
  share_getActiveInfo,
  share_getFriends,
  share_getNotice,
  share_bindUser,
  share_download,
  share_userRelevance
}

export default Services