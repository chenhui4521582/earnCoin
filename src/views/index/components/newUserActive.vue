<template>
  <div class="new-user-active" >
    <div class="mask" v-if="showPopup"></div>
    <transition name="scale">
      <div class="body" v-if="showPopup">
        <img class="inner-img" src="../img/new-user-active/popup-bg.png" alt="" @click="_startNewUserActive">
        <div class="close" @click="hide"></div>
      </div>
    </transition>
  </div>
</template>
<script>
import { getNewUserActive, startNewUserActive } from '@/services/index'
import { newUtils } from '@/utils/utils'
import _get from 'lodash.get'
export default {
  name: 'newUserActive',
  data: () => ({
    showPopup: false
  }),
  methods: {
    init(callback) {
      getNewUserActive().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.showPopup = data
          if(this.showPopup) {
            this.$marchSetsPoint('A_H5PT0303000025')
          }
        }
        callback && callback(this.showPopup)
      })
    },
    _startNewUserActive () {
      startNewUserActive().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.$marchSetsPoint('A_H5PT0303000027')
          location.href = '//wap.beeplaying.com/activities/earnCoinNewUser.html'
        }
      })
    },
    hide () {
      this.$emit('popupSortHide')
      this.showPopup = false
      this._startNewUserActive()
      this.$marchSetsPoint('A_H5PT0303000026')
    }
  },
  watch: {
    showPopup (value) {
      if(value) {
        newUtils.ScrollNoMove()
      }else {
        newUtils.ScrollMove()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.new-user-active {
  position: fixed;
  z-index: 10;
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(0,0,0,.6);
  }
  .body {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 2;
    width: 6.5rem;
    height: 8.1rem;
    transform: translate(-50%, -50%);
    .close {
      position: absolute;
      right: .27rem;
      top: 0;
      z-index: 1;
      width: 0.7rem;
      height: 0.7rem;
    }
  }
}
.scale-enter-active {
  animation: showAnimation .5s ease-in-out;
}
.scale-leave-active {
  animation: hideAnimation 1s ease-in-out;
}
@keyframes showAnimation {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
@keyframes hideAnimation {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  40% {
    transform: translate(-50%, -50%) scale(.2);
  }
  100% {
    transform: translate(-50%, -50%) scale(0);
    transform-origin:  3.5rem 1.3rem;
  }
}
</style>