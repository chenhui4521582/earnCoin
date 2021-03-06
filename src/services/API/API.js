export const HOST = {
  PLATFORM_API: '//platform-api.beeplaying.com',
  OPS_API: '//ops-api.beeplaying.com',
  SHOP_API: '//shop-api.beeplaying.com',
  TRANS_API: '//trans-api.beeplaying.com',
  PETCAT_API: '//petcat-api.beeplaying.com',
  UIC_API: '//uic-api.beeplaying.com',
  QUOITS_API: '//quoits-api.beeplaying.com',
  SMARTEYES_API: '//smarteyes-api.beeplaying.com',
  MARCH_BURIED_POINT: 'https://log-center.beeplaying.com/am/log/v1/json',
  TEST: 'http://rap2api.taobao.org/app/mock/264196/',
  local: 'http://10.33.80.16:7080'
}
const API = {
  marchBuriedPoint: 'https://log-center.beeplaying.com/am/log/v1/json',
  qttReport: `${HOST.PLATFORM_API}/point/user/adLog/report`, // 趣头条用户激活 or 趣头条用户注册
  getUserCenter: `${HOST.PLATFORM_API}/point/api/user/center`, //获取用户信息
  getUserPhone: `${HOST.PLATFORM_API}/point/api/user/getUserPhone`, // 获取用户手机号
  getCoinLog: `${HOST.PLATFORM_API}/point/api/account/point-history`, // 金币明细记录
  getIconList: `${HOST.PLATFORM_API}/point/api/entrance/icon/list`, // 首页Icon列表
  getYesterdayRank: `${HOST.PLATFORM_API}/point/api/account/yesterday-rank`, // 昨日金币排行
  getRankTab: `${HOST.PLATFORM_API}/point/api/task/recommendTab`, // 获取排行Tab
  getRankList: `${HOST.PLATFORM_API}/point/api/task/recommendTaskList`, // 获取排行数据排行
  getSignList : `${HOST.PLATFORM_API}/point/api/signIn/list`, //签到列表
  sign : `${HOST.PLATFORM_API}/point/api/signIn/sign`, //签到
  getTodaySign : `${HOST.PLATFORM_API}/point/api/signIn/todayStatus`, //今天是否签到
  getGreatTaskList : `${HOST.PLATFORM_API}/point/api/task/list`, //获取高额任务列表
  getMyTaskList : `${HOST.PLATFORM_API}/point/api/task/userList`, //获取高额任务列表
  getTaskDetail : `${HOST.PLATFORM_API}/point/api/task/taskSpecific/{taskId}`, //获取任务详情
  startTask : `${HOST.PLATFORM_API}/point/api/task/drawTask/{taskId}`, //开始任务
  getAward : `${HOST.PLATFORM_API}/point/api/task/drawAward/{configId}`, //开始任务
  bindPhone: `${HOST.UIC_API}/uic/api/user/center/bindMobilePhone`, // 绑定手机提交
  getPhoneCode: `${HOST.UIC_API}/uic/api/user/center/sendPhoneBindCode`, // 获取短信验证
  isBindPhone: `${HOST.PLATFORM_API}/point/api/user/userBindStatus`, //获取用户是否绑定手机号
  getWithdrawList: `${HOST.PLATFORM_API}/point/withdraw/config`, // 获取提现列表
  getWithdrawLog: `${HOST.PLATFORM_API}/point/withdraw/user/log`, // 获取提现记录
  userWithDraw: `${HOST.PLATFORM_API}/point/withdraw/cash/{level}`, // 用户提现
  gzhBindPhone: `${HOST.PLATFORM_API}/point/api/wechat/bind`, // 公总号绑定手机号
  isBindGZH: `${HOST.PLATFORM_API}/point/api/user/bindStatus`, // 用户是否绑定公总号
  withdrawSendCode: `${HOST.PLATFORM_API}/point/api/user/sendCode/`, //发送验证码
  getCard: `${HOST.PLATFORM_API}/point/api/cdkey/receive/{batchId}`, //获取礼包码
  wechatLogin: `${HOST.UIC_API}/uic/api/app/wechat/login`, //微信登录
  getRequestToken: `${HOST.UIC_API}/uic/api/user/login/sms/requestToken`, // 获取requestToken
  getAccessToken: `${HOST.UIC_API}/uic/api/user/login/accessToken`, //获取ACCESSTOKEN
  getOpenToken: `${HOST.UIC_API}/uic/api/user/sdk/openToken`, //获取openToken
  sendCode: `${HOST.UIC_API}/uic/api/user/login/sendSmsCode`, // 发送验证码
  visitorLogin: `${HOST.UIC_API}/uic/api/user/login/visitor`, // 游客登录
  userIsReceive: `${HOST.PLATFORM_API}/point/api/new/user/red/pack/popup`, //判断用户是否领取过红包
  getRedPacketAward: `${HOST.PLATFORM_API}/point/api/new/user/red/pack/award`, //领取红包
  sendRedPacketToServer: `${HOST.PLATFORM_API}/point/api/new/user/red/pack/send`, //告知后端领取了多少红包
  sendUpdatePhoneSmsUrl: `${HOST.UIC_API}/uic/api/user/center/sendUpdatePhoneSms`, // 换绑发送验证码
  checkUpdatePhoneSmsUrl: `${HOST.UIC_API}/uic/api/user/center/checkUpdatePhoneSms`, // 验证换绑短信
  checkOriginalPhoneNo: `${HOST.UIC_API}/uic/api/user/center/checkOriginalPhoneNo`,
  getAppVersion: `${HOST.PLATFORM_API}/app/api/version/appVersionUpdate.do`, //获取APP版本
  userIsVisitor: `${HOST.PLATFORM_API}/point/api/user/visitor`, //判断用户是否是游客
  userBindWechat: `${HOST.UIC_API}/uic/api/user/center/bindWechat`,
  firstReport: `${HOST.PLATFORM_API}/point/api/task/report`, //第一次进入游戏上报
  durationReport: `${HOST.PLATFORM_API}/point/api/task/duration`, //游戏时长上报
  tokenVerify: `${HOST.UIC_API}/uic/api/user/login/tokenVerify`, //验证token是否过期
  getNewUserActive: `${HOST.PLATFORM_API}/point/new/user/welfare/popup`, //获取新手1小时活动
  startNewUserActive: `${HOST.PLATFORM_API}/point/new/user/welfare/apply`, //开始新手1小时活动
  getReadAdAward: `${HOST.PLATFORM_API}/point/api/task/drawAward`, //看广告领奖励
  isShowBanner: `${HOST.PLATFORM_API}/point/api/user/banner`, //判断个人中心是否显示banner
  closeServer: `${HOST.PLATFORM_API}/point/api/entrance/close/server` //关服公告
}

const activities = {
  share_getActiveInfo: `${HOST.PLATFORM_API}/point/api/invite/activity-info`, //邀请豪礼活动  获取活动信息 
  share_getFriends: `${HOST.PLATFORM_API}/point/api/invite/awards`, //邀请豪礼活动  好友信息 
  share_getNotice: `${HOST.PLATFORM_API}/point/api/invite/notice-list`, //邀请豪礼活动  跑马灯 
  share_bindUser: `${HOST.PLATFORM_API}/point/api/invite/record/{code}`, //邀请豪礼活动  被邀请人下载注册后调用 
  share_download: `${HOST.PLATFORM_API}/point/api/entrance/app/download/url` //邀请豪礼活动  被邀请人下载注册后调用 
}


export default {...API, ...activities}
