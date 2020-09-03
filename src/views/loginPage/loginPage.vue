<template>
  <div class="login">
    <div class="logo">
      <img class="inner-img" src="./img/logo.png" alt="">
    </div>
    <div class="wechat-login" @click="_wechatLogin">
      <img src="./img/wechat-icon.png" alt="">
      微信授权登录
    </div>
    <div class="tips" v-if="showTips">
      <p>登录失效</p>
      <p>该账号已在其他设备登录</p>
    </div>
    <div class="phone-login" @click="goFastLogin">
      <div class="title">
        <div class="text">手机号登录</div>
      </div>
      <img src="./img/phone-icon2.png" alt="">
    </div>
    <div class="user-agreement">登录就代表同意快乐赚的 <span @click="goUserAgreement">用户协议</span></div>
    <div class="service">登录遇到问题，<span @click="openService">联系客服</span></div>
    <!-- 客服弹框 -->
    <Service v-model="showService" />
  </div>
</template>
<script>
import Service from '@/components/servicePop/service'
import AppCall from '@/utils/native/index'
import { getUrlParams} from '@/utils/utils'
import { getAccessToken, wechatLogin, getOpenToken } from '@/services/user'
import { mapState } from 'vuex'
import _get from 'lodash.get'
export default {
  name: 'loginPage',
  data: () => ({
    showService: false,
    showTips: false
  }),
  components: {
    Service
  },
  computed: {
    ...mapState(['deviceId'])
  },
  methods: {
    goUserAgreement () {
      window.location.href = 'https://wap.beeplaying.com/xmWap/#/my/userAgreement'
    },
    openService () {
      this.showService = true
    },
    goFastLogin () {
      AppCall.switchAccount()
    },
    /** 获取ACCESS_TOKEN **/
    async _getAccessToken (requestToken) {
      let accessRes = await getAccessToken({ token: requestToken, type: 1 })
      let accessCode = _get(accessRes, 'data.code')
      let accessData = _get(accessRes, 'data.data')
      if(accessCode == 200) {
        localStorage.setItem('ACCESS_TOKEN', accessData.accessToken)
        /** 获取OPEN_TOKEN **/
        let openRes = await getOpenToken()
        let openCode = _get(openRes, 'data.code')
        let openToken = _get(openRes, 'data.data.token')
        localStorage.setItem('OPEN_ACCESS_TOKEN', openToken)
        this.$Toast('登录成功！', () => {
          this.$router.push({
            name: 'index'
          })
        })
      }
    },
    /** 微信登录 **/
    _wechatLogin () {
      /** window层创建微信登录回调方法 **/
      this.wechatCallback()
      /** 调用APP方法微信登录 **/
      AppCall.WXLogin()
    },
    /** 微信登录回调 **/
    wechatCallback () {
      window.WXMessage = (callback) => {
        wechatLogin({
          code: callback.Code,
          appId: callback.AppId,
          deviceNum: this.deviceId
        }).then (res => {
          const {code, data, message} = _get(res, 'data')
          if (code == 200) {
            this._getAccessToken(data) 
          } else {
            this.$Toast( message )
          }
        })
      }
    },
    init () {
      const { logout } = this.$route.query
      if(logout) {
        this.showTips = true
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped lang="less">
  .login {
    overflow: hidden;
    height: 100vh;
    background: #F2F2F2;
    .logo {
      margin: 2.62rem auto .6rem;
      width: 1.5rem;
      height: 1.5rem;
    }
    .wechat-login {
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 4rem;
      height: .8rem;
      background:linear-gradient(219deg,rgba(0,202,108,1) 0%,rgba(107,231,92,1) 100%);
      border-radius: .4rem;
      font-size: .26rem;
      font-weight: bold;
      color: #fff;
      img {
        margin-right: .11rem;
        width: .56rem;
        height: .44rem;
      }
    }
    .phone-login {
      position: absolute;
      left: 50%;
      bottom: 1.9rem;
      width: 4.33rem;
      transform: translate(-50%,0);
      text-align: center;
      .title {
        position: relative;
        margin-bottom: .3rem;
        .text {
          position: relative;
          z-index: 2;
          margin: 0 auto;
          width: 1.53rem;
          font-size: .2rem;
          color: #ACACAC;
          background: #F2F2F2;
        }
        &::after {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(0, -50%);
          width: 100%;
          height: .02rem;
          background: #ACACAC;
        }
      }
      img {
        vertical-align: top;
        width: .8rem;
        height: .8rem;
      }
    }
    .tips {
      position: absolute;
      bottom: 3.6rem;
      text-align: center;
      width: 100%;
      font-size: .2rem;
      color: #E8382B;
    }
    .user-agreement {
      position: absolute;
      bottom: 1.17rem;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: .2rem;
      color: #ACACAC;
      span {
        color: #5186CA;
      }
    }
    .service {
      position: absolute;
      bottom: .82rem;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: .2rem;
      color: #ACACAC;
      span {
        color: #5186CA;
      }
    }
  }
</style>>