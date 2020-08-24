<template>
  <div class="index">
    <!-- coin-info -->
    <div class="coin-info">
      <div class="coin item" @click="goWithdraw">
        <div class="name">
          <img src="./img/coin-icon.png" alt="">
          金币收益
        </div>
        <div class="number">
          <em>{{ accountInfo.currPoint }}</em><span>个</span>
          <div class="check">
            <img class="inner-img" src="./img/check-now.png" alt="">
          </div>
        </div>
        <div class="add">
          今日+{{ accountInfo.todayPoint }}
        </div>
      </div>
      <div class="task item" @click="goTask">
        <div class="name">
          <img src="./img/task-icon.png" alt="">
          我的任务
        </div>
        <div class="number">
          <em>{{taskInfo.num}}</em><span>个</span>
        </div>
        <div class="add">
          已完成+{{taskInfo.finishNum}}
        </div>
      </div>
      <div class="line"></div>
    </div>
    <!-- task-nav -->
    <div class="task-nav">
      <div class="item" 
        v-for="(item, index) in iconList" 
        :key="index" 
        @click="jump(item.link, index)"
      >
        <img :src="item.img | filter" class="inner-img" :class="{'animation': !showUserGuide}" alt="">
        <p>{{item.name}}</p>
      </div>
    </div>
    <!-- ranking -->
    <rank-info 
      v-for="(item, index) in list"
      :info="item"
      :key="index"
    />
    <!-- agreement -->
    <div class="agreement">
      高额赚 <span @click="goUserAgreement">用户协议</span>
    </div>
    <!-- footer -->
    <base-footer></base-footer>
    <!-- 新手引导 -->
    <user-guide v-if="showUserGuide" @hideUserGuide="hideUserGuide"/>
    <!-- APP强更新弹框 -->
    <app-update />
  </div>
</template>
<script>
import Services from '@/services/index'
import AppCall from '@/utils/native'
import BaseFooter from '@/components/baseFooter/baseFooter'
import UserGuide from './components/userGuide'
import RankInfo from './components/rankInfo'
import AppUpdate from './components/AppUpdate'
import { getAccountInfo, getTaskInfo, getOpenToken } from '@/services/user'
import { getUrlParams } from '@/utils/utils'
import { mapActions } from 'vuex'
import _get from 'lodash.get'
export default {
  name: 'Index',
  data: () => ({
    accountInfo: {},
    taskInfo: {},
    avatar: '/cdn/common/images/common/img_photo.png',
    iconList: [],
    showUserGuide: false,
    list: []
  }),
  components: {
    BaseFooter,
    UserGuide,
    RankInfo,
    AppUpdate
  },
  methods: {
    ...mapActions({
      userIsVisitor: 'USER_IS_VISITOR'
    }),
    openService () {
      this.showService = true
      this.$marchSetsPoint('A_H5PT0303003633')
    },
    AvatarClick () {
      this.$marchSetsPoint('A_H5PT0303003634')
    },
    goWithdraw () {
      this.$router.push({
        name: 'withdraw'
      })
      this.$marchSetsPoint('A_H5PT0303003631')
    },
    goTask () {
      this.$router.push({
        name: 'task',
        params: {
          'taskCurrent': 2
        }
      })
      this.$marchSetsPoint('A_H5PT0303003632')
    },
    goUserAgreement () {
      window.location.href = 'https://wap.beeplaying.com/xmWap/#/my/userAgreement'
    },
    /** 用户账户信息 **/
    _getAccountInfo () {
      getAccountInfo().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.accountInfo = data
        }
      })
    },
    /** 用户任务信息 **/
    _getTaskInfo () {
      getTaskInfo().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.taskInfo = data
        }
      })
    },
    /** 获取推荐排行榜 **/
    _getRankList () {
      Services.getRankList(0).then( res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.list = data
        }
      })
    },
    /** 获取iconList **/
    _getIconList () {
      Services.getIconList().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.iconList = data
        }
      })
    },
    /** 跳转 **/
    jump (url, index) {
      this.$marchSetsPoint('H5PT0303003628', {
        task_name: index
      })
      window.location.href = url
    },
    /** 判断是否显示新手引导 **/
    isUserGuide () {
      let userLabel = getUrlParams('userlabel')
      let cacheNewUser = localStorage.getItem('cacheNewUser')
      if(userLabel && !cacheNewUser) {
        this.showUserGuide = true
        localStorage.setItem('cacheNewUser', Date.now())
      }
    },
    /** 新手引导回调函数 **/
    hideUserGuide () {
      this.showUserGuide = false
    },
    /** 判断是否有openToken **/
    isOpenToken () {
      const isQuickLogin = getUrlParams('quicklogin')
      if(isQuickLogin) {
        getOpenToken().then(res => {
          const {code, data, message} = _get(res, 'data')
          if(code == 200) {
            localStorage.setItem('OPEN_ACCESS_TOKEN', data.token)
          }
        })
      }
    }
  },
  mounted () {
    this._getAccountInfo()
    this._getTaskInfo()
    this._getIconList()
    this._getRankList()
    this.isUserGuide()
    this.userIsVisitor()
    this.isOpenToken()
    this.$marchSetsPoint('P_H5PT0303', {
      source_address: document.referrer
    })
  }
}
</script>
<style lang="less" scoped>
.index {
  padding: .3rem .3rem 1.2rem;
  min-height: 100vh;
  background: #F2F2F2;
  background-size: 7.2rem 6.74rem;
  .user-info {
    position: relative;
    padding: .3rem 0;
    display: flex;
    justify-content: flex-start;
    .avatar {
      margin-right: .2rem;
      width: .9rem;
      height: .9rem;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: .9rem;
      .name {
        margin-bottom: .1rem;
        font-size: .28rem;
        font-weight:800;
        color: #000;
      }
      .id {
        font-size: .24rem;
        color: #000;
      }
    }
    .service {
      position: absolute;
      right: 0;
      top: .5rem;
      width: 1.8rem;
      height: .5rem;
      background: #FFCA00;
      border-radius: .35rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #D39436;
      font-size: .26rem;
      font-weight: bold;
      img {
        margin-right: .05rem;
        width: .3rem;
        height: .3rem;
      }
    }
  }
  .coin-info {
    margin-bottom: .38rem;
    position: relative;
    display: flex;
    justify-content: center;
    border-radius: .3rem;
    background: #fff;
    .item {
      flex: 1;
      height: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .name {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .24rem;
        color: #000;
        img {
          margin-right: .05rem;
          width: .3rem;
          height: .3rem;
        }
      }
      .number {
        position: relative;
        padding: .05rem 0;
        display: flex;
        align-items: flex-end;
        em {
          margin-right: .05rem;
          font-style: normal;
          font-size: .48rem;
          font-weight: bold;
          color: #E8382B;
        }
        span {
          line-height: .5rem;
          font-size: .20rem;
          color: #E8382B;
        }
        .check {
          position: absolute;
          right: -1rem;
          top: 0;
          z-index: 1;
          width: 1rem;
          height: .38rem;
        }
      }
      .add {
        font-size: .2rem;
        color: #ACACAC;
      }
    }
    .line {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1px;
      height: 1rem;
      background: #F2F2F2;
    }
  }
  .task-nav {
    margin: 0 0 .57rem;
    display: flex;
    justify-content: flex-start;
    .item {
      margin-right: .2rem;
      img {
        margin-bottom: .1rem;
        height: 1.4rem;
      }
      p {
        text-align: center;
        color: #000000;
      }
      &:nth-child(1) {
        .animation {
          animation: scale infinite 2s;
        }
      }
      &:nth-child(1) {
        width: 2.6rem;
        flex-shrink: 0;
      }
      &:nth-child(2) {
        flex: 1;
      }
      &:nth-child(3) {
        flex: 1;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .agreement {
    height: .56rem;
    line-height: .56rem;
    text-align: center;
    font-size: .2rem;
    color: #ACACAC;
    span {
      color: #5186CA;
      text-decoration: underline;
    }
  }
  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>