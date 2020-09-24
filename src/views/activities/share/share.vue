<template>
  <div class="share-friends">
    <!-- 返回按钮 -->
    <div class="back-home">
      <img class="inner-img" src="./img/back-home.png" alt="">
    </div>
    <!-- 邀请好友列表 -->
    <div class="friends-list">
      <img class="inner-img" src="./img/friends-icon.png" alt="">
    </div>
    <!-- 跑马灯 -->
    <Slider />
    <!-- 邀请奖励 -->
    <div class="award">
      <div class="title">
        <img class="inner-img" src="./img/title1-icon.png" alt="">
      </div>
      <div class="awrd-list">
        <div class="item">
          <div class="icon">
            <img class="inner-img" src="./img/money1-icon.png" alt="">
          </div>
          <div class="text">
            <div class="name">基础奖励1元</div>
            <div class="desc">好友首次提现成功，奖励1元</div>
          </div>
        </div>
        <div class="item">
          <div class="icon">
             <img class="inner-img" src="./img/money1-icon.png" alt="">
          </div>
          <div class="text">
            <div class="name">分成奖励9元</div>
            <div class="desc">好友在平台内赚取金币，额外奖励 您好友金币得30%，最高分成9元</div>
          </div>
        </div>
      </div>
      <div class="share-btn">立即邀请好友</div>
    </div>
    <!-- 分享数据 -->
    <div class="share-content">
      <div class="item">
        <div class="key">累计邀请</div>
        <div class="value">20<span class="unit">人</span></div>
      </div>
      <div class="line"></div>
      <div class="item">
        <div class="key">累计收入</div>
        <div class="value">20<span class="unit">个</span></div>
        <div class="money">≈23.3元</div>
      </div>
    </div>
    <!-- 规则 -->
    <div class="rule"></div>
    <!-- 分享方式 -->
    <Share-type v-model="showShareType"/>
  </div>
</template>
<script>
import Slider from './components/slider'
import ShareType from './components/shareType'
export default {
  name: 'shareFriends',
  data: () => ({
    showShareType: true
  }),
  components: {
    Slider,
    ShareType
  },
  methods: {
    comeGame () {
      let url = '//file.beeplaying.com/group1/M00/42/89/CmcEHF8X38aAA18mAAJM8qWU0iA294.png'
      imgToBase64(url, (dataUrl) => {
        console.log(dataUrl)
        AppCall.shareContent(JSON.stringify({
          url: '',
          title:'',
          content: '',
          imgUrl: dataUrl,
          type: 0
        }))
      })
    }
  }
}
</script>
<style lang="less" scoped>
.share-friends {
  padding: 4.4rem 0 1.4rem;
  min-height: 100vh;
  background: url('./img/bg.png') no-repeat center top;
  background-size: 100% auto;
  .back-home {
    position: fixed;
    left: .2rem;
    top: .17rem;
    z-index: 10;
    width: 1.28rem;
    height: .62rem;
  }
  .friends-list {
    position: fixed;
    right: .2rem;
    top: .17rem;
    z-index: 10;
    width: 1.28rem;
    height: .4rem;
  }
  .award {
    margin-bottom: .5rem;
    .title {
      margin: 0 auto .06rem;
      width: 3.66rem;
      height: .52rem;
    }
    .awrd-list {
      margin: 0 auto;
      padding: 0 .3rem;
      width: 6.4rem;
      .item {
        padding: .2rem;
        display: flex;
        justify-content: flex-start;
        
        .icon {
          margin-right: .35rem;
          flex-shrink: 0;
          width: 1.22rem;
          height: 1.1rem;
        }
        &:first-child {
          border-bottom: 1px solid  rgba(0,0,0,.15);
        }
      }
    }
    .share-btn {
      margin: 0 auto;
      width: 5.7rem;
      height: .9rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: .3rem;
      font-weight: 800;
      color: #fff;
      background: url(./img/btn.png) no-repeat center center;
      background-size: 100% 100%;
    }
  }
  .share-content {
    margin: 0 auto;
    padding-top: .4rem;
    width: 6.58rem;
    height: 1.86rem;
    background: url(./img/share-center.png) no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-items: center;
    }
    .line {
      width: 1px;
      height: .96rem;
      background: #CBCBCB;

    }
  }
}
</style>