<template>
  <div class="modal-warp" v-show="show">
    <transition name="mask">
      <div class="modal-mask" v-show="show"></div>
    </transition>
    <div class="wrap">
      <div class="light" v-if="type==2">
      <img class="inner-img" src="./assets/hight-title.png" alt="">
      </div>
      <div class="light1" v-if="type==3">
        <img class="inner-img" src="./assets/hight-title1.png" alt="">
      </div>
      <div class="modal-content">
        <div class="header">
          <span>{{title}}</span>
          <div class="close-icon"  v-if="closeIconShow" @click="closeModal"></div>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        <div class="footer-warp" v-if="buttonShow">
          <slot name="footer">
            <div class="btn" v-if="saveButtonShow" @click="save">{{saveText}}</div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from '@/utils/utils'
export default {
  name: 'Modal',
  data () {
    return {
      show: this.value
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      default: 1
    },
    title: {
      type: String,
      default: '我是标题'
    },
    closeIconShow: {
      type: Boolean,
      default: true
    },
    saveText: {
      type: String,
      default: '确认'
    },
    saveButtonShow: {
      type: Boolean,
      default: true
    },
    buttonShow: {
      type: Boolean,
      default: true
    },
    centerScroll: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      this.$emit('input', val)
      if (val && !this.centerScroll) {
        utils.ScrollNoMove()
      }
      else {
        utils.ScrollMove()
      }
    }
  },
  methods: {
    closeModal () {
      this.show = false
      this.$emit('on-close', 0)
    },
    // 关闭弹框
    close () {
      this.show = false
      this.$emit('on-close', 1)
    },
    // 确认按钮
    save () {
      this.$emit('on-save')
    }
  }
}
</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.modal-warp {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 99;
}
.modal-mask {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
}
.wrap {
  position: absolute;
  width: 5rem;
  z-index: 2;
  border-radius: 0 0 .5rem .5rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .light {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -2.1rem);
    width: 5rem;
    height: 3.12rem;
    z-index: 1;
  }
  .light1 {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -2.2rem);
    width: 5rem;
    height: 3.12rem;
    z-index: 1;
  }
  .modal-content {
    position: relative;
    z-index: 2;
    .header {
      position: relative;
      width: 100%;
      height: .9rem;
      line-height: .9rem;
      text-align: center;
      font-size: .32rem;
      font-weight: bold;
      color: #252525;
      background: url(./assets/title.png) no-repeat center top;
      background-size: 100% 100%;
    }
    .content {
      min-height: 2rem;
      padding: .2rem;
      background: #fff;
    }
    .footer-warp {
      padding-bottom: .3rem;
      margin-top: -1px;
      width: 100%;
      background: #fff;
      border-radius:0 0 .5rem .5rem;
    }
    .btn {
      margin:0 auto .16rem;
      width: 2.4rem;
      height: .7rem;
      line-height: .7rem;
      text-align: center;
      font-size: .26rem;
      font-weight: bold;
      text-align: center;
      background: #FFCA00;
      border-radius: .35rem;
    }
    .close-icon {
      position: absolute;
      height: .2rem;
      width: .2rem;
      top: .37rem;
      right: .31rem;
      background: url('./assets/close.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
// 动画
.mask-enter {
  opacity: 0;
}
.mask-enter-active {
  transition: opacity 0.3s;
}
.mask-leave-to {
  opacity: 0;
}
.mask-leave-active {
  transition: opacity 0.3s;
}
</style>


