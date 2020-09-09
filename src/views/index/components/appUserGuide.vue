<template>
  <div class="new-guide2" v-if="showAppNewUserGuide">
    <div class="mask" @click.stop="hideUserGuide"></div>
    <div class="step1" v-if="step ==1" @click.stop="hideUserGuide">
      <div class="arrows"><img class="inner-img" src="../img/user-guide/arrows1.png" alt=""></div>
      <div class="tips">
        <div class="icon"><img class="inner-img" src="../img/user-guide/icon.png" alt=""></div>
        <div class="title"><img class="inner-img" src="../img/user-guide/title3.png" alt=""><img
            src="../img/user-guide/first-step.png" class="stepDisplay"></div>
        <div class="text">这边显示您获得金币数量<br>再赚1000金币就可以提现了</div>
        <div class="btn" @click.stop="hideUserGuide">知道了</div>
      </div>
    </div>
    <div class="step2" v-if="step==2" @click.stop="hideUserGuide">
      <div class="arrows"><img class="inner-img" src="../img/user-guide/arrows3.png" alt=""></div>
      <div class="tips">
        <div class="icon"><img class="inner-img" src="../img/user-guide/icon.png" alt=""></div>
        <div class="title"><img class="inner-img" src="../img/user-guide/title3.png" alt=""><img
            src="../img/user-guide/second-step.png" class="stepDisplay"></div>
        <div class="text">点击"去看看"查看如何赚钱吧</div>
        <div class="btn" @click.stop="hideUserGuide">好的</div>
      </div>
    </div>
  </div>
</template>
<script>
import { newUtils } from '@/utils/utils'
export default {
  name: 'AppUserGuide',
  data: () => ({
    step: 1,
    showAppNewUserGuide: false
  }),
  methods: {
    hideUserGuide () {
      if (this.step == 1) {
        this.step = 2
        this.$marchSetsPoint('A_H5PT0303000019')
        return 
      }
      if (this.step == 2) {
        this.showAppNewUserGuide = false
        this.$emit('popupSortHide')
        this.$marchSetsPoint('A_H5PT0303000020')
      }
    },
    init (callback) {
      let cacheNewUser = localStorage.getItem('cacheAppNewUser')
      if (!cacheNewUser) {
        this.step = 1
        this.showAppNewUserGuide = true
        newUtils.ScrollNoMove()
        localStorage.setItem('cacheAppNewUser', Date.now())
      }
      callback && callback(this.showAppNewUserGuide)
    }
  }
}
</script>
<style lang="less" scoped>
.new-guide2 {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
  }
}
.step1 {
  position: absolute;
  z-index: 2;
  box-shadow: 0 0 0 9990px rgba(0, 0, 0, 0.6);
}

.tips {
  position: fixed;
  top: 5.06rem;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 12;
  padding: 0.3rem 0.2rem;
  width: 6.6rem;
  height: 1.4rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 0.3rem;
  .icon {
    position: absolute;
    top: -0.47rem;
    left: 0.17;
    width: 1.65rem;
    height: 0.62rem;
  }
  .title {
    margin-bottom: 0.1rem;
    width: 1.8rem;
    height: 0.38rem;
  }
  .text {
    color: #fff;
    font-size: 0.24rem;
  }
  .btn {
    position: absolute;
    right: 0.22rem;
    top: 50%;
    transform: translate(0, -50%);
    width: 1.7rem;
    height: 0.5rem;
    border: 1px solid #fff;
    border-radius: 0.25rem;
    text-align: center;
    color: #fff;
    line-height: 0.5rem;
  }
}

.step1 {
  top: 0.3rem;
  left: 0.3rem;
  width: 3.3rem;
  height: 2rem;
  border-radius: 0.3rem 0 0 0.3rem;
  .arrows {
    position: absolute;
    right: 0.6rem;
    top: 2.1rem;
    width: 0.4rem;
    height: 0.8rem;
  }
  .tips {
    top: 3.52rem;
    height: 1.8rem;
    .title {
      margin-bottom: 0.14rem;
      vertical-align: bottom;
    }
    .text {
      line-height: 0.36rem;
    }
    .btn {
      background: #666;
      color: #d6dadb;
      border: none;
    }
    .stepDisplay {
      width: 0.3rem;
      height: 0.3rem;
      margin-left: 0.1rem;
      // border: 1px solid red;
      position: absolute;
      margin-top: 0.1rem;
    }
  }
}
.step2 {
  position: fixed;
  z-index: 11;
  box-shadow: 0 0 0 9990px rgba(0, 0, 0, 0.6);
}
.step2 {
  top: 6.2rem;
  left: 0.3rem;
  width: 6.6rem;
  height: 2.6rem;
  .arrows {
    position: absolute;
    right: 0.8rem;
    top: -0.9rem;
    width: 0.3rem;
    height: 0.8rem;
  }
  .tips {
    top: 3.52rem;
    height: 1.8rem;
    .title {
      margin-bottom: 0.14rem;
      vertical-align: bottom;
    }
    .text {
      line-height: 0.36rem;
    }
    .btn {
      background: #666;
      color: #d6dadb;
      border: none;
    }
    .stepDisplay {
      width: 0.3rem;
      height: 0.3rem;
      margin-left: 0.1rem;
      // border: 1px solid red;
      position: absolute;
      margin-top: 0.1rem;
    }
  }
}
a {
  color: #d6dadb;
}
</style>
