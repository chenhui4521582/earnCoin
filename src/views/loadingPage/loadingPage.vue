<template>
  <div class="loading">
    <red-packet 
      v-model="showRedPacket" 
      :redPacketData="redPacketData" 
      @redPacketFinish="redPacketFinish"
      @hidePopup="hidePopup"
    />
  </div>
</template>
<script>
import { getUrlParams } from '@/utils/utils'
import RedPacket from './components/redPacket'
import { visitorLogin, userIsReceive, getRedPacketAward, sendRedPacketToServer} from '@/services/user'
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
    /** 游客登录 **/
    _visitorLogin () {
      visitorLogin({
        source: 1,
        visitorToken: this.DEVICE_TOKEN
      }).then(res => {
        
      })
    },
    /** 红包领取完毕回调方法 **/
    redPacketFinish () {
      /** 有token 直接进首页， 没token 直接注册游客 **/
      if(this.ACCESS_TOKEN) {
        this.$router.push({
          name: 'index'
        })
      }else {
        this._visitorLogin()
      }
    },
    /** 红宝弹框关闭 **/
    hidePopup () {
      /** 有token 直接进首页， 没token 直接注册游客 **/
      if(this.ACCESS_TOKEN) {
        this.$router.push({
          name: 'index'
        })
      }else {
        this._visitorLogin()
      }
    },
    /** 判断用户是否领取过红包 **/
    _userIsReceive () { 
      userIsReceive().then(res => {
        res = {
          data: {"code":200,"data":{"popup":true,"min":"0.1元","max":"1元","award":null,"balance":null,"num":null},"message":null}
        }
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          const showRedPacket = _get(data, 'popup', false)
          this.redPacketData = data
          /** 领取过奖励的直接跳转首页，没领取的打开红包 **/
          if(showRedPacket) {
            this.showRedPacket = true
          } else {
            this.$router.push({
              name: 'index'
            })
          }
        }
        /** 用户token过期,跳转到登录页 **/
        if(code == 102) {
          this.$router.push({
            name: 'loadingPage'
          })
        }
      })
    },
    init () {
      this.DEVICE_TOKEN = getUrlParams('divice')
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