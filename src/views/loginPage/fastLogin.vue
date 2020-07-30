<template>
  <div class="fast-login">
    <div class="logo">
      <img class="inner-img" src="./img/phone-icon2.png" alt="">
    </div>
    <div class="fast-text">本机号码登录</div>
    <div class="fast-phone">153****8896</div>
    <div class="fast-btn">本机号码一键登录</div>
    <div class="other-login" @click="goOtherPhone">其他手机号登录</div>
    <div class="user-agreement">登录就代表同意快乐赚的 <span @click="goUserAgreement">用户协议</span></div>
    <div class="service">登录遇到问题，<span @click="openService">联系客服</span></div>
    <!-- 客服弹框 -->
    <Service v-model="showService" />
  </div>
</template>
<script>
import Service from '@/components/servicePop/service'
export default {
  name: 'fastLogin',
  data: () => ({
    showService: false
  }),
  components: {
    Service
  },
  methods: {
    goOtherPhone () {
      this.$router.push({
        name: 'otherPhone'
      })
    },
    goUserAgreement () {
      window.location.href = 'https://wap.beeplaying.com/xmWap/#/my/userAgreement'
    },
    openService () {
      this.showService = true
    },
  }
}
</script>
<style scoped lang="less">
  .fast-login {
    overflow: hidden;
    height: 100vh;
    background: #F2F2F2;
    .logo {
      margin: 2.45rem auto .33rem;
      width: 1.5rem;
      height: 1.5rem;
    }
    .fast-text {
      margin-bottom: .1rem;
      text-align: center;
      font-size: .28rem;
      color: #333333;
      font-weight: bold;
    }
    .fast-phone {
      margin-bottom: .33rem;
      text-align: center;
      font-size: .24rem;
      color: #333333;
    }
    .fast-btn {
      margin: 0 auto .26rem;
      width: 4rem;
      height: .8rem;
      line-height: .8rem;
      text-align: center;
      font-size: .26rem;
      color: #333333;
      font-weight: bold;
      background: #FFCA00;
      border-radius: .4rem;
    }
    .other-login {
      text-align: center;
      font-size: .2rem;
      color: #5186CA;
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
</style>