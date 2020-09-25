<template>
  <div class="share-friends">
    <!-- 返回按钮 -->
    <div class="back-home" @click="backHome">
      <img class="inner-img" src="./img/back-home.png" alt="">
    </div>
    <!-- 邀请好友列表 -->
    <div class="friends-list" @click="goFriendsList">
      <img class="inner-img" src="./img/friends-icon.png" alt="">
    </div>
    <!-- 跑马灯 -->
    <Slider :list="noticeList"/>
    <!-- 活动时间 -->
    <div class="active-time">
      活动时间：{{activeInfo.beginDate | formatTime('m|d')}}～{{activeInfo.endShowDate | formatTime('m|d')}}
    </div>
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
      <div class="share-btn" @click="shareClick">立即邀请好友</div>
    </div>
    <!-- 分享数据 -->
    <div class="share-content">
      <div class="item">
        <div class="key">累计邀请</div>
        <div class="value">
          <span class="num">{{ activeInfo.inviteNum }}</span>
          <span class="unit">人</span></div>
      </div>
      <div class="line"></div>
      <div class="item">
        <div class="key">累计收入</div>
        <div class="value">
          <span class="num">{{ activeInfo.totalIncome }}</span>
          <span class="unit">个</span>
        </div>
        <div class="money">≈{{ activeInfo.totalMoney }}元</div>
      </div>
    </div>
    <!-- 规则 -->
    <div class="rule">
      <div class="title">
        <img class="inner-img" src="./img/title2-icon.png" alt="">
      </div>
      <div class="rule-center">
        <p><span class="dot"></span>活动日期为{{activeInfo.beginDate}}～{{activeInfo.endShowDate}}</p>
        <p><span class="dot"></span>基础奖励好友成功提现后直接发放，分成奖励第二日 12:00:00统一发放，可以在“我的-提现-金币记录”查看金 币记录。</p>
        <p><span class="dot"></span>邀请好友分成奖励必须是在活动期间获得的金币，活动时 间之后好友获得的金币不算做分成奖励。</p>
        <p><span class="dot"></span>被邀请的好友设备以及手机号微信号必须是之前从未下载 过且从未登陆过，本app才会记录有效，手机号必须为中 国大陆地区归属。</p>
        <p><span class="dot"></span>邀请好友数量无上限，邀请越多奖励越多。</p>
        <p><span class="dot"></span>若您有以下任何一种情况，游戏赚有权取消您的参与资格 以及金币收获：<br> a. 不符合参与资格<br> b. 提供虚假信息<br> c. 以任何第三</p>
      </div>
    </div>
    <!-- 分享方式 -->
    <Share-type v-model="showShareType"/>
  </div>
</template>
<script>
import Slider from './components/slider'
import ShareType from './components/shareType'
import { share_getActiveInfo, share_getNotice } from '@/services/activities'
import _get from 'lodash.get'
export default {
  name: 'shareFriends',
  data: () => ({
    showShareType: false,
    noticeList: [],
    activeInfo: {}
  }),
  components: {
    Slider,
    ShareType
  },
  methods: {
    shareClick () {
      this.showShareType = true
    },
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
    },
    _getNoticeList () {
      share_getNotice().then(res => {
        const { code, data, message } = _get(res, 'data') 
        if(code == 200) {
          this.noticeList = _get(res, 'data.data')
        }
      })
    },
    _getActiveInfo () {
      share_getActiveInfo().then(res => {
        const { code, data, message } = _get(res, 'data') 
        if(code == 200) {
          this.activeInfo = _get(res, 'data.data')
        }
      })
    },
    /** 后退 **/
    backHome () {
      this.$router.go(-1);
    },
    /** 好友列表也 **/
    goFriendsList () {
      this.$router.push({
        name: 'friendsList'
      })
    }
  },
  mounted () {
    this._getNoticeList()
    this._getActiveInfo()
  }
}
</script>
<style lang="less" scoped>
.share-friends {
  padding: 2.17rem 0 1.4rem;
  min-height: 100vh;
  background: url('./img/bg.png') no-repeat center top #a12ffa;
  background-size: 100% auto;
  .back-home {
    position: absolute;
    left: .2rem;
    top: .17rem;
    z-index: 10;
    width: 1.28rem;
    height: .62rem;
  }
  .friends-list {
    position: absolute;
    right: .2rem;
    top: .27rem;
    z-index: 10;
    width: 1.28rem;
    height: .4rem;
  }
  .active-time {
    margin-bottom: 1.88rem;
    height: .38rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .24rem;
    color: #FF8A8A;
    font-weight: 800;
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
        .text {
          .name {
            font-size: .28rem;
            color: #D43C00;
            font-weight: 800;
          }
          .desc {
            font-size: .24rem;
            color: #767676;
            font-weight: 800;
          }
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
    margin: 0 auto .52rem;
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
      align-items: center;
      .key {
        margin-bottom: .05rem;
        font-size: .24rem;
        color: #767676;
        font-weight: 500;
      }
      .value {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        .num {
          line-height: 1;
          font-size: .42rem;
          font-weight: 800;
        }
        .unit {
          font-weight: normal;
          font-size: .2rem;
        }
      }
      .money {
        font-size: .2rem;
        color: #FF5A00;
        text-align: center;
      }
    }
    .line {
      width: 1px;
      height: .96rem;
      background: #CBCBCB;

    }
  }
  .rule {
    .title {
      margin: 0 auto .27rem;
      width: 3.66rem;
      height: .42rem;
    }
    .rule-center {
      padding: 0 .4rem;
      p {
        padding-left: .3rem;
        position: relative;
        margin-bottom: .2rem;
        font-size: .24rem;
        color: #fff;
        font-weight: 500;
        .dot {
          position: absolute;
          display: block;
          left: 0;
          top: .1rem;
          width: .12rem;
          height: .12rem;
          border-radius: 50%;
          overflow: hidden;
          background: #FFEDDC;
        }
      }
    }
  }
}
</style>