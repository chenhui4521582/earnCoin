import $axios from './http/http'
import Api from './API/API'

/**
 * @description   邀请豪礼活动  获取活动信息 
 */
const share_getActiveInfo = function () {
  return $axios.post(Api.share_getActiveInfo)
}

export {
  share_getActiveInfo
}

const Services = {
  share_getActiveInfo
}

export default Services