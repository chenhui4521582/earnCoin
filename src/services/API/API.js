export const HOST = {
  POINT_API: '//platform-point-api.beeplaying.com',
  PLATFORM_API: '//platform-api.beeplaying.com',
  OPS_API: '//ops-api.beeplaying.com',
  SHOP_API: '//shop-api.beeplaying.com',
  TRANS_API: '//trans-api.beeplaying.com',
  PETCAT_API: '//petcat-api.beeplaying.com',
  UIC_API: '//uic-api.beeplaying.com',
  QUOITS_API: '//quoits-api.beeplaying.com',
  SMARTEYES_API: '//smarteyes-api.beeplaying.com',
  MARCH_BURIED_POINT: 'https://log-center.beeplaying.com/am/log/v1/json',
  TEST: 'http://rap2.taobao.org:38080/app/mock/250821',
  local: 'http://10.33.80.16:7080'
}
const API = {
  marchBuriedPoint: 'https://log-center.beeplaying.com/am/log/v1/json',
  getUserInfo: `${HOST.UIC_API}/uic/api/user/center/getPersonalInfo`, //获取用户信息
  getAccountInfo: `${HOST.PLATFORM_API}/point/api/account/info`, // 用户账户信息
  getUserPhone: `${HOST.PLATFORM_API}/point/api/user/getUserPhone`, // 获取用户手机号
  getCoinLog: `${HOST.PLATFORM_API}/point/api/account/point-history`, // 金币明细记录
  getIconList: `${HOST.PLATFORM_API}/point/api/entrance/icon/list`, // 首页Icon列表
  getYesterdayRank: `${HOST.PLATFORM_API}/point/api/account/yesterday-rank`, // 昨日金币排行
  getRankTab: `${HOST.PLATFORM_API}/point/api/task/recommendTab`, // 获取排行Tab
  getRankList: `${HOST.PLATFORM_API}/point/api/task/recommendTaskList`, // 获取排行数据排行
  getSignList : `${HOST.PLATFORM_API}/point/api/signIn/list`, //签到列表
  sign : `${HOST.PLATFORM_API}/point/api/signIn/sign`, //签到
  getTodaySign : `${HOST.PLATFORM_API}/point/api/signIn/todayStatus`, //今天是否签到
  getTaskInfo : `${HOST.PLATFORM_API}/point/api/task/info`, //获取用户任务信息
  getGreatTaskList : `${HOST.PLATFORM_API}/point/api/task/list`, //获取高额任务列表
  getMyTaskList : `${HOST.PLATFORM_API}/point/api/task/userList`, //获取高额任务列表
  getTaskDetail : `${HOST.PLATFORM_API}/point/api/task/taskSpecific/{taskId}`, //获取任务详情
  startTask : `${HOST.PLATFORM_API}/point/api/task/drawTask/{taskId}`, //开始任务
  getAward : `${HOST.PLATFORM_API}/point/api/task/drawAward/{configId}`, //开始任务
  bindPhone: `${HOST.UIC_API}/uic/api/user/center/bindMobilePhone`, // 绑定手机提交
  getPhoneCode: `${HOST.UIC_API}/uic/api/user/center/sendPhoneBindCode`, // 获取短信验证
  getWithdrawList: `${HOST.PLATFORM_API}/point/withdraw/config`, // 获取提现列表
  getWithdrawLog: `${HOST.PLATFORM_API}/point/withdraw/user/log`, // 获取提现记录
  userWithDraw: `${HOST.PLATFORM_API}/point/withdraw/cash/{level}`, // 用户提现
  gzhBindPhone: `${HOST.PLATFORM_API}/point/api/wechat/bind`, // 公总号绑定手机号
  isBindGZH: `${HOST.PLATFORM_API}/point/api/user/bindStatus`, // 用户是否绑定公总号
  sendCode: `${HOST.PLATFORM_API}/point/api/user/sendCode/`, //发送验证码
  getCard: `${HOST.PLATFORM_API}/point/api/cdkey/receive/{batchId}`, //获取礼包码
  wechatLogin: `${HOST.UIC_API}/uic/api/app/wechat/login`, //微信登录
  getRequestToken: `//uic-api.beeplaying.com/uic/api/user/login/sms/requestToken`, // 获取requestToken
  getAccessToken: `${HOST.UIC_API}/uic/api/user/login/accessToken`, //获取ACCESSTOKEN
  sendCode: `${HOST.UIC_API}/uic/api/user/login/sendSmsCode`, // 发送验证码
  
}

export default API
