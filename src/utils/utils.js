import axios from 'axios'
import base64url from 'base64-url'
import _get from 'lodash.get'
import API from '@/services/API/API'
class utils {
  constructor() {
    this.jumpUrl = this.jumpUrl.bind(this)
    this.gameActivityJump = this.gameActivityJump.bind(this)
    this.marchSetsPoint = this.marchSetsPoint.bind(this)
  }
  getPhoneInfo () {
    var _phoneData = {}
    var app = navigator.appVersion
    var left = app.indexOf('(')
    var right = app.indexOf(')')
    var str = app.substring(left + 1, right)
    var Str = str.split(';')
    // 手机型号--苹果 iPhone
    var Mobile_Iphone = Str[0]
    // 手机型号--安卓
    var Mobile_Android = Str[2]
    var res = /Android/
    var reslut = res.test(Mobile_Android)

    // 根据设备型号判断设备系统
    var phoneVersion = Str[0]
    if (phoneVersion == 'iPhone') {
      _phoneData.client = Mobile_Iphone
      _phoneData.os = Str[1].substring(4, 19)
    }
    else if (phoneVersion == 'Linux') {
      if (reslut) {
        _phoneData.client = Str[4].substring(0, 9)
        _phoneData.os = Str[2]
      } else {
        _phoneData.client = Mobile_Android.substring(0, 9)
        _phoneData.os = Str[1]
      }
    }
    else if (phoneVersion == 'iPad') {
      _phoneData.client = Str[0]
      _phoneData.os = Str[1].substring(4, 12)
    }
    return _phoneData
  }
  isIOS () {
    let U = window.navigator.userAgent
    return !(U.indexOf('Android') > -1 || U.indexOf('Adr') > -1)
  }
  isAndroid () {
    let U = window.navigator.userAgent
    return !U.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  }
  isWechat () {
    var U = window.navigator.userAgent.toLowerCase()
    return !!(U.match(/MicroMessenger/i) == 'micromessenger')
  }
  isAlipay () {
    var U = window.navigator.userAgent.toLowerCase()
    return !!(U.match(/Alipay/i) == 'alipay')
  }
  trimStr (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  }
  isEmptyArray (array) {
    if (array instanceof Array) {
      return !array.length
    } else {
      console.error('传入的值非数组')
    }
  }
  isEmptyObject (object) {
    if (object instanceof Object) {
      return !Object.keys(object).length
    } else {
      console.error('传入的值非对象')
    }
  }
  cacheInGlobal (axios, urlFlag) {
    window._global_cache = window._global_cache || {}
    var cache = window._global_cache['cache_' + urlFlag]
    if (cache) {
      return new Promise(function (resolve, reject) {
        resolve(JSON.parse(cache))
      })
    }
    else {
      return axios.post(API[urlFlag]).then(data => {
        if (_get(data, 'data.code', '') == 200) {
          window._global_cache['cache_' + urlFlag] = JSON.stringify(data)
        }
        return data
      })
    }
  }
  cacheRequest (type, axios, urlFlag) {
    var cache = sessionStorage['cache_' + urlFlag]
    if (cache) {
      return new Promise(function (resolve, reject) {
        resolve(JSON.parse(cache))
      })
    }
    else {
      return axios[type](API[urlFlag]).then(data => {
        if (urlFlag == 'getFindEntrance' || _get(data, 'data.code', '') == 200) {
          sessionStorage['cache_' + urlFlag] = JSON.stringify(data)
        }
        return data
      })
    }
  }
  getUrlParams (ename) {
    let url = window.location.href
    let Request = {}
    if (url.indexOf('?') != -1) {
      let str = url.split('?')[1]
      let strs = str.split('&')
      for (let i = 0; i < strs.length; i++) {
        Request[strs[i].split('=')[0]] = strs[i].split('=')[1] && decodeURIComponent(strs[i].split('=')[1])
      }
    }
    return ename
      ? Request[ename]
        ? Request[ename].split('#')[0]
        : ''
      : Request
  }
  openGame (url, SDK, params) {
    let APP_CHANNEL = localStorage.getItem('APP_CHANNEL')
    let baseUrl = `https://wap.beeplaying.com/${url}${url.includes('?') ? '&' : '?'}channel=${APP_CHANNEL}&time=${new Date().getTime()}${params || ''}`
    if (SDK) {
      parent.location.href = baseUrl
    } else {
      window.location.href = baseUrl
    }
  }
  move (e) {
    e.preventDefault()
  }
  ScrollNoMove () {
    document.body.style.overflow = 'hidden'
    document.addEventListener('touchmove', this.move, { passive: false })
  }
  ScrollMove () {
    document.body.style.overflow = null
    document.removeEventListener('touchmove', this.move, { passive: false })
  }
  ScrollToTop () {
    window.scrollTo(0, 0)
  }
  async jumpUrl (item, SDK, params) {
    /** 没有传入任何值 **/
    let URL = _get(item, 'url', false)
    if (!URL || URL == null) {
      return false
    }
    /** 跳转外接游戏 **/
    URL = this.trimStr(URL)
    let APP_CHANNEL = localStorage.getItem('APP_CHANNEL')
    let OPEN_TOKEN = localStorage.getItem('OPEN_ACCESS_TOKEN')
    let WJ_GAMETYPE = item.gameId || ''
    if (URL.indexOf('external=1') != -1 || URL.indexOf('?external=1') != -1) {
      let url = `${URL}&channel=${APP_CHANNEL}&token=${OPEN_TOKEN}&gurl=${base64url.encode(URL.replace('?external=1', '').replace('&external=1', ''))}&pf=xmWap&gameType=${WJ_GAMETYPE}`
      if (WJ_GAMETYPE) {
        localStorage.setItem('wj_gameType', WJ_GAMETYPE)
        axios.post(
          '//platform-api.beeplaying.com/wap/api/game/firstLoad/' + WJ_GAMETYPE
        )
        axios.post(
          '//ops-api.beeplaying.com/ops/api/h5game/saveBehavior'
        )
      }
      if (SDK) {
        parent.location.href = url
      } else {
        window.location.href = url
      }
      return false
    }
    /** 跳转绝对路劲**/
    if (URL.indexOf('//') != -1) {
      if (SDK) {
        parent.location.href = `${URL}`
      } else {
        window.location.href = `${URL}`
      }
      return
    }
    /** 跳转竞猜游戏 **/
    URL = URL.replace('/', '')
    this.openGame(URL, SDK, params)
  }
  async marchSetsPoint (_pointId, _pointObject) {
    try {
      /** 获取用户信息 **/
      let userInfo = JSON.parse(localStorage.getItem('user_info'))
      if (!userInfo) {
        let r = await axios.post(API.getUserCenter)
        userInfo = r.data.data
        localStorage.setItem('user_info', JSON.stringify(userInfo))
      }
      /** 平台数据 **/
      let _beginTime = Date.now()
      let _channel = localStorage.getItem('APP_CHANNEL') || 100051003
      let _plateform = this.isIOS() ? 'ios' : 'android'
      /** 合并参数 **/
      let _eventContent = Object.assign(
        {
          residual_gold: userInfo.amount,
          position_id: null,
          target_project_id: null,
          task_id: null,
          task_name: null,
          marketing_id: null,
          residual_jingdong: null,
          residual_phone: null,
          app_version: window.android && window.android.getVersionName(),
          entrance: localStorage.getItem('platSource') || 'plat',
          from_project_id: this.getUrlParams('gametype')
        },
        _pointObject
      )

      let clientInfo = this.getPhoneInfo()
      /** 要发送的数据 **/
      let sendMessage = {
        plateform: 'h5',
        version: '1.0.0',
        channel: _channel,
        subplateform: _plateform,
        useragent: window.navigator.userAgent,
        os: clientInfo.os,
        client: clientInfo.client,
        logs: [
          {
            uid: userInfo.userId,
            begintime: _beginTime,
            eventid: _pointId,
            eventcontent: _eventContent
          }
        ]
      }
      /** 创建formDate 对象 并把数据插入formDate **/
      let formData = new FormData()
      formData.append('appName', 'wf_jfq')
      formData.append('json', JSON.stringify(sendMessage))
      /** 发送formDate 数据 **/
      axios.post(API.marchBuriedPoint, formData, { timeout: 500 })
      return
    } catch (error) {
      return
    }
  }
  /** 游戏内活动点击跳转 **/
  gameActivityJump (url) {
    if (!url) {
      return false
    }
    if (url.includes('http')) {
      this.jumpUrl({ url }, 'SDK')
    } else {
      let ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN') 
      let APP_CHANNEL = localStorage.getItem('APP_CHANNEL')
      let popupList = {
        /** 一元夺宝 **/
        popup_oneLottery: 'https://wap.beeplaying.com/payment/#/yiyuanchou',
        /** 充值特惠 **/
        popup_getPreference: 'https://wap.beeplaying.com/payment/#/miniFeedBack',
        /** 夺宝礼包 **/
        popup_getCardLottery: 'https://wap.beeplaying.com/payment/#/treasure/gift',
        /** 转盘夺宝 **/
        popup_getTurntable: 'https://wap.beeplaying.com/payment/#/payTurntable',
        /** 底Bar 兼容打开弹框,统一版本后删除 **/
        openOneLottery: 'https://wap.beeplaying.com/payment/#/yiyuanchou',
        /** 充值特惠 **/
        feedback: 'https://wap.beeplaying.com/payment/#/miniFeedBack',
        /** 夺宝礼包 **/
        openGameTreasureGift: 'https://wap.beeplaying.com/payment/#/treasure/gift',
        /** 夺宝礼包1908 **/
        treasureCeremony1908: 'https://wap.beeplaying.com/payment/#/treasure/gift1908',
        /** 转盘夺宝 **/
        open_payTurntable: 'https://wap.beeplaying.com/payment/#/payTurntable'
      }
      if (popupList[url] && parent && parent.GameEval) {
        // 一元夺宝跳落地页
        if (url === 'popup_oneLottery') parent.location.href = `https://wap.beeplaying.com/xmWap/#/mall/onePay?channel=${APP_CHANNEL}&token=${ACCESS_TOKEN}`
        parent.GameEval('openweb', `${popupList[url]}?channel=${APP_CHANNEL}&token=${ACCESS_TOKEN}`)
      }
    }
  }
  loadScripts (urls, callback) {
    callback = callback || function () { }
    // 添加script属性，并添加到head中
    let loader = function (src, handler) {
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = src
      // 重点！！！！script加载成功
      script.onload = function () {
        script.onload = null
        script.onerror = null
        handler()
      }
      script.onerror = function () {
        script.onload = null
        script.onerror = null
        callback({
          message: src + '依赖未加载成功！'
        })
      }
      let head = document.getElementsByTagName('head')[0];
      (head || document.body).appendChild(script)
    };
    // 自执行函数，用于循环loader
    (function run () {
      if (urls.length > 0) {
        loader(urls.shift(), run)
      } else {
        callback()
      }
    })()
  }
  /** 解决键盘唤起不能点击按钮 **/
  clearInput () {
    let keyTimer = null
    document.body.addEventListener('focusin', () => {
      //软键盘弹起事件
      clearTimeout(keyTimer)
    })
    document.body.addEventListener('focusout', () => {
      // 软键盘关闭事件
      window.scrollTo(0, 0)
      keyTimer = setTimeout(() => {
        if (window.pageYOffset > 0) {
          window.scrollTo(0, 0)
        }
      }, 200)
    })
  }
  /** 图片转base64 **/
  imgToBase64 (url, callback) {
			//一定要设置为let，不然图片不显示
			let image = new Image();
			//解决跨域问题
			image.setAttribute('crossOrigin', 'anonymous');
			let imageUrl = url
			image.src = imageUrl
			//image.onload为异步加载
			image.onload = () => {
				var canvas = document.createElement("canvas");
				canvas.width = image.width;
				canvas.height = image.height;
				var context = canvas.getContext('2d');
				context.drawImage(image, 0, 0, image.width, image.height);
				var quality = 0.8;
        //使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，因为压缩成png后base64的字符串可能比不转换前的长！
        var dataURL = canvas.toDataURL("image/jpeg", quality);
        callback && callback.call(this, dataURL)
        return dataURL
			}
  }
}

let newUtils = new utils(),
  getUrlParams = newUtils.getUrlParams,
  marchSetsPoint = newUtils.marchSetsPoint,
  jumpUrl = newUtils.jumpUrl,
  gameActivityJump = newUtils.gameActivityJump,
  loadScripts = newUtils.loadScripts,
  imgToBase64 = newUtils.imgToBase64
export default newUtils
export {newUtils, getUrlParams, marchSetsPoint, jumpUrl, gameActivityJump, loadScripts, imgToBase64 }
