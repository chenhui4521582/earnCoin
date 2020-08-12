<template>
  <div class="loading">
    <red-packet 
      v-model="showRedPacket" 
      :redPacketData="redPacketData" 
      @redPacketFinish="redPacketFinish"
      @hideRedPacket="hideRedPacket"
    />
  </div>
</template>
<script>
import { getUrlParams } from '@/utils/utils'
import RedPacket from './components/redPacket'
import { visitorLogin, userIsReceive, getRedPacketAward, sendRedPacketToServer, getAccessToken, getOpenToken} from '@/services/user'
import AppCall from '@/utils/native/index'
import _get from 'lodash.get'
export default {
  name: 'loadingPage',
  data: () => ({
    DEVICE_TOKEN: '',
    showRedPacket: false,
    redPacketData: {}
  }),
  components: {
    RedPacket
  },
  methods: {
    async _visitorLogin (callback) {
      /** 游客登录 **/
      const vRes = await visitorLogin({ source: 1,visitorToken: this.DEVICE_TOKEN })
      let vCode = _get(vRes, 'data.code')
      let vData = _get(vRes, 'data.data')
      let vMessage = _get(vRes, 'data.message')
      if(vCode == 200) {
        /** 获取ACCESS_TOKEN **/
        const ARes = await getAccessToken({ token: vData, type: 1 })
        let aCode = _get(ARes, 'data.code')
        let aData = _get(ARes, 'data.data')
        if(aCode == 200) {
          localStorage.setItem('ACCESS_TOKEN', aData.accessToken)
          /** 获取OPEN_TOKEN **/
          let openRes = await getOpenToken()
          let openCode = _get(openRes, 'data.code')
          let openToken = _get(openRes, 'data.data.token')
          localStorage.setItem('OPEN_ACCESS_TOKEN', openToken)
          if (openCode == 200) {
            callback && callback ()
          }
        }else {
          this.$Toast(message)
        }
      }else if(vCode == 104) {
        this.$Toast(vMessage, () => {
          this.$router.replace({
            name: 'loginPage'
          })
        })
      }else {
        this.$Toast(vMessage)
      }
    },
    /** 红包弹框关闭回调方法 **/
    hideRedPacket () {
      /** 有token 直接进首页 **/
      if(this.ACCESS_TOKEN) {
        this.$router.replace({
          name: 'index'
        })
      }else {
        /** 关闭红包弹框注册游客用户 **/
        this._visitorLogin(() => {
          this.$router.replace({
            name: 'index'
          })
        })
      }
    },
    /** 红包弹框领取完毕回调方法 **/
    redPacketFinish () {
      /** 有token发送奖品数据到后端并且进入首页 **/
      if(this.ACCESS_TOKEN) {
        sendRedPacketToServer()
        this.$router.replace({
          name: 'index'
        })
      }else {
        /** 领取红包完毕注册游客用户并且发送奖品数据到后端 **/
        this._visitorLogin(()=> {
          sendRedPacketToServer()
          this.$router.replace({
            name: 'index'
          })
        })
      }
    },
    /** 判断用户是否领取过红包 **/
    _userIsReceive () { 
      userIsReceive().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          const showRedPacket = _get(data, 'popup', false)
          this.redPacketData = data
          /** 领取过奖励的直接跳转首页，没领取的打开红包 **/
          if(showRedPacket) {
            this.showRedPacket = true
          } else {
            this.$router.replace({
              name: 'index'
            })
          }
        }
        /** 用户token过期,跳转到登录页 **/
        if(code == 102) {
          this.$router.replace({
            name: 'loginPage'
          })
        }
      })
    },
    async init () {
      this.DEVICE_TOKEN = getUrlParams('divice') || await AppCall.getDeviceID()
      this.ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN')
      this._userIsReceive()
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
  .loading {
    height: 100vh;
    background: url(./img/bg.png) no-repeat center top;
    background-size: 100% auto;
  }
</style>>