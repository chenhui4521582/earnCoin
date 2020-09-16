<template>
  <div class="new-user-active" v-if="showPopup">
    <div class="mask"></div>
    <div class="body">
      <img class="inner-img" src="../img/new-user-active/popup-bg.png" alt="" @click="_startNewUserActive">
      <div class="close" @click="hide"></div>
    </div>
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
        }
        callback && callback(this.showPopup)
      })
    },
    _startNewUserActive () {
      startNewUserActive().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          location.href = '//wap.beeplaying.com/activities/earnCoinNewUser.html'
        } else {
          this.$Toast( message )
        }
      })
    },
    hide () {
      this.$emit('popupSortHide')
      this.showPopup = false
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
  .body {
    position: absolute;
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
</style>