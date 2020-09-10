<template>
  <div class="user-guide" v-if="show" @click="handClick()">>
    <!-- step1 -->
    <template v-if="step == 1" >
      <div class="step"></div>
      <div class="step-arrow">
        <img class="inner-img" src="../../img/user-guide/guide-arrow1.png" alt="">
      </div>
      <div class="step-center">
        <div class="tips">
          <img class="inner-img" src="../../img/user-guide/guide-tips.png" alt="">
        </div>
        <div class="title">
          <img class="title-img1" src="../../img/user-guide/guide-title.png" alt="">
          <img class="title-img2" src="../../img/user-guide/guide-step1.png" alt="">
          <div class="btn">知道了</div>
        </div>
        <div class="text">
          <p>点击“开始任务”或“下载赚钱”下载应用，</p>
          <p>注册账号回到页面确定账号信息，如未显示，请点击“刷新”</p>
        </div>
      </div>
    </template>
    <!-- step2 -->
    <template v-if="step == 2" >
      <div class="step1"></div>
      <div class="step1-arrow">
        <img class="inner-img" src="../../img/user-guide/guide-arrow2.png" alt="">
      </div>
      <div class="step1-center">
        <div class="tips">
          <img class="inner-img" src="../../img/user-guide/guide-tips.png" alt="">
        </div>
        <div class="title">
          <img class="title-img1" src="../../img/user-guide/guide-title.png" alt="">
          <img class="title-img2" src="../../img/user-guide/guide-step2.png" alt="">
          <div class="btn">好的</div>
        </div>
        <div class="text">
          <p>按要求完成任务后，返回任务页面，</p>
          <p>查看奖励是否发放，如未发放，点击“刷新”</p>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'userGuide',
  data: () => ({
    step: 1,
    show: false
  }),
  methods: {
    handClick () {
      if(this.step == 1) {
        this.step = 2
      }else {
        this.show = false
      }
    },
    hide () {
      this.show = false
    },
    init () {
      let cacheTime = localStorage.getItem('userGuide')
      if (!cacheTime) {
        this.show = true;
        localStorage.setItem('userGuide', Date.now())
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
.user-guide {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 11;
  .step {
    position: absolute;
    bottom: 0;
    left: 1.3rem;
    z-index: 1;
    width: 5.6rem;
    height: 1.09rem;
    box-shadow: 0 0 0 999999px rgba(0,0,0,.6);
  }
  .step1 {
    position: absolute;
    top: 2.85rem;
    left: 1.91rem;
    z-index: 1;
    width: .64rem;
    height: .64rem;
    box-shadow: 0 0 0 999999px rgba(0,0,0,.6);
  }
  .step-arrow {
    position: absolute;
    left: 3.6rem;
    bottom: 1.2rem;
    width: .48rem;
    height: .78rem;
    z-index: 1;
  }
  .step1-arrow {
    position: absolute;
    left: 2.7rem;
    top: 3.15rem;
    width: .48rem;
    height: .78rem;
    z-index: 1;
  }
  .step-center,.step1-center {
    position: absolute;
    left: .3rem;
    bottom: 2.14rem;
    z-index: 1;
    width: 6.6rem;
    height: 1.7rem;
    background: rgba(0,0,0,.37);
    border-radius: .3rem;
    .tips {
      position: absolute;
      left: .17rem;
      top: -.47rem;
      width: 1.65rem;
      height: .62rem;
    }
    .title {
      padding: .23rem .22rem 0;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      .title-img1 {
        width: 1.42rem;
        height: .38rem;
      }
      .title-img2 {
        width: .29rem;
        height: .22rem;
      }
      .btn {
        margin-left: auto;
        width: 1.7rem;
        height: .5rem;
        text-align: center;
        line-height: .5rem;
        color: #FFFFFF;
        border-radius: .25rem;
        border: 1px solid #fff;
      }
    }
    .text {
      padding: .05rem .2rem 0 .17rem;
      color: #fff;
      line-height: .4rem;
      p {
        white-space: nowrap;
      }
    }
  }
  .step1-center {
    bottom: auto;
    top: 4rem;
  }
}
</style>