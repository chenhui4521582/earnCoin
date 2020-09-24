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
    <div class="share-content"></div>
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
  padding-top: 4.17rem;
  min-height: 100vh;
  background: url('./img/bg.png') no-repeat center top;
  background-size: 100% 100%;
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
    .title {
      margin: 0 auto;
      width: 3.66rem;
      height: .52rem;
    }
    .awrd-list {
      margin: 0 auto;
      width: 6.4rem;
      .item {
        display: flex;
        justify-content: center;
        
      }
    }
  }
}
</style>