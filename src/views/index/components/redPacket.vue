<template>
  <div class="red-packet" v-if="showRedPacket">
    <div class="mask"></div>
    <!-- 红包弹框 -->
    <div class="open-red-packet" v-if="step == 1">
      <div class="award">{{redPacketData.min }}~{{redPacketData.max}}</div>
      <div class="open-btn" @click="_getRedPacketAward">
        <img class="inner-img" src="../img/red-packet/open-btn.png" alt="">
      </div>
      <div class="explain">
        已有账号，<a @click="login">直接登录</a> 
      </div>
      <div class="close" @click="hidePopup">
        <img class="inner-img" src="../img/red-packet/close.png" alt="">
      </div>
    </div>
    <!-- 红包奖品 -->
    <div class="red-packet-award" v-if="step == 2">
      <div class="award">
        <span class="award-num">{{awardData.award}}</span><span class="award-unit">元</span>
      </div>
      <div class="explain">还差{{awardData.balance}}元即可提现</div>
      <div class="receive-btn" @click="hidePopup">
        <img class="inner-img" src="../img/red-packet/get-btn.png" alt="">
      </div>
      <div class="close" @click="hidePopup">
        <img class="inner-img" src="../img/red-packet/close.png" alt="">
      </div>
    </div>  
  </div>
</template>
<script>
import { userIsReceive, getRedPacketAward, sendRedPacketToServer } from '@/services/index'
import _get from 'lodash.get'
export default {
  name: 'redPacket',
  data: () => ({
    showRedPacket: false,
    redPacketData: {},
    step: 1,
    awardData: {}
  }),
  methods: {
    /** 判断用户是否领取过红包 **/
    init (callback) {    
      userIsReceive().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.showRedPacket = _get(data, 'popup', false)
          this.redPacketData = data
        }
        callback && callback(this.showRedPacket)
      })
    },
    /** 打开红包 **/
    _getRedPacketAward () {
      sendRedPacketToServer().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.step = 2
          this.awardData = data
          this.$emit('refresh')
        }else {
          this.$Toast(message, () => {
            this.hidePopup()
          })
        }
      })
    },
    /** 领取红包 = **/
    redPacketFinish () {
      this.$emit('input', false)
      this.$emit('popupSortHide')
    },
    /** 关闭弹框 **/
    hidePopup() {
      this.$emit('popupSortHide')
      this.showRedPacket = false
    },
    /** 调用 **/
    login () {
      this.$router.push({
        name: 'loginPage'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.red-packet {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(0,0,0,.6);
  }
  .open-red-packet {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    width: 5.2rem;
    height: 5.72rem;
    background: url(../img/red-packet/red-packet-bg.png) no-repeat center top;
    background-size: 100% 100%;
    .award {
      margin: 2.3rem auto 0;
      height: .4rem;
      line-height: .4rem;
      text-align: center;
      font-size: .24rem;
      color: #FFF776;
      font-weight: bold;
    }
    .open-btn {
      margin: .42rem auto 0;
      width: 1.76rem;
      height: 1.8rem;
      animation: scale infinite 1.5s;
    }
    .explain {
      text-align: center;
      font-size: .22rem;
      font-weight: bold;
      color: #7A200E;
      a {
        text-decoration: underline;
      }
    }
    .close {
      position: absolute;
      right: .1rem;
      top: -.1rem;
      width: .48rem;
      height: .48rem;
    }
  }
  .red-packet-award {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    width: 5.88rem;
    height: 6.64rem;
    background: url(../img/red-packet/red-packet-open.png) no-repeat center top;
    background-size: 100% 100%;
    .award {
      margin: 3rem 0 .24rem;
      height: .6rem;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      .award-num {
        font-size: .72rem;
        color: #E8310D;
        font-weight:bold;
        line-height: 1;
      }
      .award-unit {
        font-size: .36rem;
        color: #E8310D;
        font-weight:bold;
        line-height: 1.45;
      }
    }
    .explain {
      margin-bottom: .8rem;
      text-align: center;
      font-size: .24rem;
      color: #707070;
    }
    .receive-btn {
      margin: 0 auto;
      width: 2.7rem;
      height: 1.12rem;
    }
    .close {
      position: absolute;
      right: .1rem;
      top: -.1rem;
      width: .48rem;
      height: .48rem;
    }
  }
}
  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>