<template>
  <transition name="pullup">
    <div class="share-type" v-if="value">
      <div class="item" @click="share(0)">
        <img class="inner-img" src="../img/wechat-icon.png" alt="">
        <p>微信</p>
      </div>
      <div class="item" @click="share(1)"> 
        <img class="inner-img" src="../img/wechat1-icon.png" alt="">
        <p>朋友圈</p>
      </div>
      <div class="item"
        v-clipboard:copy="qrCodeUrl"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >
        <img class="inner-img" src="../img/copy-icon.png" alt="">
        <p>复制链接</p>
      </div>
    </div>
  </transition>
</template>
<script>
import AppCall from '@/utils/native'
export default {
  name: 'shareType',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    qrCodeUrl () {
      let userInfo = localStorage.getItem('user_info')
      userInfo && (userInfo = JSON.parse(userInfo))
      let {userId} = userInfo
      return `https://wap.beeplaying.com/earnCoin/?from=earnShareNewUser&userId=${userId}&token=${localStorage.getItem('ACCESS_TOKEN')}&channel=${localStorage.getItem('APP_CHANNEL')}&time=${Date.now()}#/activities/downloadPage/`
    }
  },
  methods: {
    share (type) {
      let userInfo = localStorage.getItem('user_info')
      userInfo && (userInfo = JSON.parse(userInfo))
      let {userId} = userInfo
      const url = this.qrCodeUrl
      const title = `我在这个APP里赚了30元，好东西也要分享给你`
      const content = '边玩游戏边赚钱，提现无门槛!'
      AppCall.shareContent(JSON.stringify({ url, title, content, type }))
      switch (type) {
        case 0 :
          this.$marchSetsPoint('A_H5PT0001000039')
          break;
        case 1 :
          this.$marchSetsPoint('A_H5PT0001000040')
          break;
      }
    },
    onCopy () {
      this.$Toast('复制成功')
      this.$marchSetsPoint('A_H5PT0001000041')
    },
    onError () {
      this.$Toast('复制失败')
    }
  }
}
</script>
<style lang="less" scoped>
.share-type {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  height: 1.3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transform: translate(0, 1.3rem);
  transform: translate(0, 0);
  border-radius: .3rem .3rem 0 0;
  background: #fff;
  .item {
    width: .8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  p {
    font-size: .2rem;
    color: #353535;
    text-align: center;
    white-space: nowrap;
  }
}
.pullup-enter {
  transform: translate(0, 1.3rem);
}
.pullup-enter-to {
  transform: translate(0, 0);
}
.pullup-enter-active {
  transition: all .5s;
}
</style>