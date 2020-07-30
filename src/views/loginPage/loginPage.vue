<template>
  <div class="login">
    <div class="logo">
      <img class="inner-img" src="./img/logo.png" alt="">
    </div>
    <div class="wechat-login">
      <img src="./img/wechat-icon.png" alt="">
      微信授权登录
    </div>
    <div class="phone-login">
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
import { getUrlParams} from '@/utils/utils'
import _get from 'lodash.get'
export default {
  name: 'loginPage',
  data: () => ({
    showService: false
  }),
  components: {
    Service
  },
  methods: {
    goUserAgreement () {
      window.location.href = 'https://wap.beeplaying.com/xmWap/#/my/userAgreement'
    },
    openService () {
      this.showService = true
    },
    init () {}
  },
  mounted () {

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
          height: .01rem;
          background: #ACACAC;
        }
      }
      img {
        vertical-align: top;
        width: .8rem;
        height: .8rem;
      }
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