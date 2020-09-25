<template>
  <div class="friends-list">
    <div class="title">
      <img class="inner-img" src="./img/title3-icon.png" alt="">
    </div>
    <!-- 返回按钮 -->
    <div class="back-home" @click="backHome">
      <img class="inner-img" src="./img/back-home.png" alt="">
    </div>
    <div class="list">
      <div class="nav">
        <div class="rank item">排名</div>
        <div class="nick-name item">好友名称</div>
        <div class="earn item">当前已赚</div>
        <div class="my-earn item">我的收入</div>
      </div>
      <div class="list-wrap">
        <Better-scroll ref="scroll" :data="scrollData" :listenScroll="true" :probeType="3" @scroll="scroll">
          <ul>
            <li class="items" v-for="(item, index) in scrollData" :key="index">
              <div class="rank item">{{item.rank}}</div>
              <div class="nick-name item">{{item.nickname }}</div>
              <div class="earn item">{{item.curCoin}}</div>
              <div class="my-earn item">{{item.myIncome}}</div>
            </li>
          </ul>
        </Better-scroll>
        <div class="bottom"></div>
      </div>
    </div>
    <Loading v-if="showLoading" />
  </div>
</template>
<script>
import BetterScroll from '@/components/betterScroll/betterScroll'
import Loading from '@/components/loading/loading'
import { share_getFriends } from '@/services/activities'
import _get from 'lodash.get'
export default {
  name: 'friendsList',
  data: () => ({
    scrollData: [],
    showLoading: false,
    currentPageSize: 1
  }),
  components: {
    BetterScroll,
    Loading
  },
  methods: {
    /** 获取好友列表 **/
    _getFriendsList () {
      this.showLoading = true
      share_getFriends({
        pageNum: this.currentPageSize,
        pageSize: 20
      }).then(res => {
        const { code, data, message } = _get(res, 'data') 
        if(code == 200) {
          this.scrollData = this.scrollData.concat(data)
          /** 解除滚动限制 **/
          if (data.length === 20) {
            this.scrollLock = false
          }
          this.showLoading = false
        }
      }).catch(error => {
        /** 解除滚动限制 **/
        this.scrollLock = false
        this.showLoading = false
      })
    },
    scroll (pos) {
      /** 未展示状态禁止 滚动到底部拉取数据**/
      let height = document.querySelector('.list-wrap ul').clientHeight
      let boxHeight = document.querySelector('.list-wrap').clientHeight
      let endPosition = height - boxHeight
      if (Math.abs(Math.round(pos.y)) > endPosition) {
        /** 添加滚动锁数据没有回来不允许加载数据**/
        if (this.scrollLock) {
          return false
        }
        this.scrollLock = true
        setTimeout(() => {
          // 向列表添加数据
          this.currentPageSize++
          this._getFriendsList()
        }, 100)
      }
    },
    /** 后退 **/
    backHome () {
      this.$router.go(-1);
    },
  },
  mounted () {
    this._getFriendsList()
  }
}
</script>
<style lang="less" scoped>
.friends-list {
  overflow: hidden;
  min-height: 100vh;
  background: #611CFE;
  .back-home {
    position: absolute;
    left: .24rem;
    top: .39rem;
    z-index: 10;
    width: 1.28rem;
    height: .62rem;
  }
  .title {
    margin: .53rem auto .23rem;
    width: 3.65rem;
    height: .41rem;
  }
  .list {
    position: fixed;
    top: 1.17rem;
    bottom: .67rem;
    left: .4rem;
    right: .4rem;
    border-radius: .3rem .3rem 0 0;
    background: #9363FF;
    .nav {
      overflow: hidden;
      height: .7rem;
      border-radius: .3rem .3rem 0 0;
      background: #9363FF;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .item {
        text-align: center;
        white-space: nowrap;
        color: #BFA2FF;
        font-size: .26rem;
        font-weight: bold;
      }
      .rank {
        width: 16%;
      }
      .nick-name {
        width: 28%;
      }
      .earn {
        width: 28%;
      }
      .my-earn {
        width: 28%;
      }
    }
    .list-wrap {
      position: absolute;
      top: .7rem;
      bottom: 0;
      left: 0;
      right: 0;
      .items {
        height: .9rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &:nth-child(even) {
          background: #7B41FF;
        }
        &:nth-child(odd) {
          background: #8957FB;
        }
        .item {
          text-align: center;
          white-space: nowrap;
          color: #FFFFFF;
          font-size: .24rem;
          font-weight: bold;
        }
        .rank {
          width: 16%;
        }
        .nick-name {
          width: 28%;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .earn {
          width: 28%;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .my-earn {
          width: 28%;
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: -.3rem;
      width: 100%;
      height: .3rem;
      border-radius: 0 0 .3rem .3rem ;
      background: #9363FF;
    }
  }
}
</style>