<template>
  <div class="user-guide">
    <div class="step1" v-if="step == 1">
      <div class="arrows"><img class="inner-img" src="../img/user-guide/arrows1.png" alt=""></div>
      <div class="tips">
        <div class="icon"><img class="inner-img" src="../img/user-guide/icon.png" alt=""></div>
        <div class="title"><img class="inner-img" src="../img/user-guide/title1.png" alt=""></div>
        <div class="text">新增“高额赚金”任务</div>
        <div class="btn" @click="handeClick(2)">知道了</div>
      </div>
    </div>
    <div class="step2" v-if="step == 2">
      <div class="arrows"><img class="inner-img" src="../img/user-guide/arrows2.png" alt=""></div>
      <div class="tips">
        <div class="icon"><img class="inner-img" src="../img/user-guide/icon.png" alt=""></div>
        <div class="title"><img class="inner-img" src="../img/user-guide/title2.png" alt=""></div>
        <div class="text">原“游戏大厅”入口迁移到这里啦</div>
        <div class="btn" @click="handeClick(3)">知道了</div>
      </div>
    </div>
    <div class="step3" v-if="step == 3">
      <div class="arrows"><img class="inner-img" src="../img/user-guide/arrows1.png" alt=""></div>
      <div class="tips">
        <div class="icon"><img class="inner-img" src="../img/user-guide/icon.png" alt=""></div>
        <div class="title"><img class="inner-img" src="../img/user-guide/title2.png" alt=""></div>
        <div class="text">新增提现模块<br> 收益 >3000 就可以提现了</div>
        <div class="btn" @click="hideUserGuide">马上赚钱</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'userGuide',
  data: () => ({
    step: 1
  }),
  methods: {
    handeClick (index) {
      this.step = index
    },
    hideUserGuide () {
      this.$emit('hideUserGuide')
      this.step = 1
    }
  }  
}
</script>
<style lang="less" scoped>
.step1,.step2,.step3 {
  position: fixed;
  z-index: 11;
  box-shadow: 0 0 0 9990px rgba(0,0,0,.6);
}
.arrows {
  position: absolute;
  right: -0.4rem;
  top: 1.4rem;
  width: .52rem;
  height: .8rem;
}
.tips {
  position: fixed;
  top: 6.06rem;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 12;
  padding: .3rem .2rem;
  width: 6.6rem;
  height: 1.4rem;
  background: rgba(0,0,0,.4);
  border-radius: .3rem;
  .icon {
    position: absolute;
    top: -.47rem;
    left: .17;
    width: 1.65rem;
    height: .62rem;
  }
  .title {
    margin-bottom: .1rem;
    width: 1.8rem;
    height: .38rem;
  }
  .text {
    color: #fff;
    font-size: .24rem;
  }
  .btn {
    position: absolute;
    right: .22rem;
    top: 50%;
    transform:  translate(0, -50%);
    width: 1.7rem;
    height: .5rem;
    border:1px solid #fff;
    border-radius: .25rem;
    text-align: center;
    color: #fff;
    line-height: .5rem;
  }
}
.step1 {
  top: 3.7rem;
  left: .3rem;
  width: 2.6rem;
  height: 1.4rem;
  .arrows {
    position: absolute;
    right: -0.4rem;
    top: 1.4rem;
    width: .52rem;
    height: .8rem;
  }
}
.step2 {
  top: 3.7rem;
  right: .3rem;
  width: 1.8rem;
  height: 1.4rem;
  .arrows {
    right: 0.58rem;
    top: 1.5rem;
    width: .8rem;
    height: .79rem;
  }
}
.step3 {
  top: 1.5rem;
  left: .3rem;
  width: 3.3rem;
  height: 2rem;
  border-radius: .3rem 0 0 .3rem;
  .arrows {
    right: 0.58rem;
    top: 2.1rem;
    width: .52rem;
    height: .8rem;
  }
  .tips {
    top: 4.56rem;
    height: 1.8rem;
    .title {
      margin-bottom: .14rem;
    }
    .text {
      line-height: .36rem;
    }
    .btn {
      background: #FFCA00;
      color: #000000;
      border: none;
    }
  }
}
</style>