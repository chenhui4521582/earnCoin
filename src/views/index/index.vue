<template>
  <div class="index">
    <!-- coin-info -->
    <div class="coin-info">
      <div class="coin item" @click="goWithdraw">
        <div class="name">
          <img src="./img/coin-icon.png" alt="">
          我的金币
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
      <div class="item" v-for="(item, index) in iconList" :key="index"
        @click="jump(item.link, index)">
        <img :src="item.img | filter" class="inner-img" :class="{'animation': showAnimation}"
          alt="">
        <p>{{item.name}}</p>
      </div>
    </div>
    <!-- ranking -->
    <rank-info v-for="(item, index) in list" :info="item" :key="index" />
    <!-- agreement -->
    <div class="agreement">
      高额赚 <span @click="goUserAgreement">用户协议</span>
    </div>
    <!-- footer -->
    <base-footer></base-footer>
    <!-- H5新手引导 -->
    <h5-user-guide v-if="showH5UserGuide" @hideUserGuide="hideUserGuide" />
    <!-- APP新手引导 -->
    <app-user-guide v-if="showAppNewUserGuide" @hideUserGuide="hideUserGuide" />
    <!-- APP强更新弹框 -->
    <app-update />
    <!-- 时长活动入口 -->
    <duration-entry />
  </div>
</template>
<script>

import BaseFooter from '@/components/baseFooter/baseFooter'
import H5UserGuide from './components/h5UserGuide'
import AppUserGuide from './components/appUserGuide'
import RankInfo from './components/rankInfo'
import AppUpdate from './components/AppUpdate'
import DurationEntry from '@/components/durationEntry/durationEntry'
import Services from '@/services/index'
import AppCall from '@/utils/native'
import { getAccountInfo, getTaskInfo, getOpenToken } from '@/services/user'
import { getUrlParams, newUtils } from '@/utils/utils'
import { mapState, mapActions } from 'vuex'
import _get from 'lodash.get'
export default {
  name: 'Index',
  data: () => ({
    accountInfo: {},
    taskInfo: {},
    avatar: '/cdn/common/images/common/img_photo.png',
    iconList: [],
    showH5UserGuide: false,
    showAppNewUserGuide: false,
    list: [],
    isDisplay: true
  }),
  components: {
    BaseFooter,
    RankInfo,
    AppUpdate,
    DurationEntry,
    H5UserGuide,
    AppUserGuide
  },
  computed: {
    ...mapState(['APP_VERSION']),
    showAnimation () {
      if (this.APP_VERSION) {
        return !this.showAppNewUserGuide
      } else {
        return !this.showH5UserGuide
      }
    }
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
        const { code, data, message } = _get(res, 'data')
        if (code == 200) {
          this.accountInfo = data
        }
      })
    },
    /** 用户任务信息 **/
    _getTaskInfo () {
      getTaskInfo().then(res => {
        const { code, data, message } = _get(res, 'data')
        if (code == 200) {
          this.taskInfo = data
        }
      })
    },
    /** 获取推荐排行榜 **/
    _getRankList () {
      Services.getRankList(0).then(res => {
        const { code, data, message } = _get(res, 'data')
        if (code == 200) {
          this.list = data
        }
      })
    },
    /** 获取iconList **/
    _getIconList () {
      Services.getIconList().then(res => {
        const { code, data, message } = _get(res, 'data')
        if (code == 200) {
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
    /** 判断是否显示H5新手引导 **/
    isH5UserGuide () {
      let userLabel = getUrlParams('userlabel')
      let cacheNewUser = localStorage.getItem('cacheH5NewUser')
      if (userLabel && !cacheNewUser) {
        this.showH5UserGuide = true
        newUtils.ScrollNoMove()
        localStorage.setItem('cacheH5NewUser', Date.now())
      }
    },
    /** 判断是否显示app新手引导 **/
    isAppUserGuide () {
      let cacheNewUser = localStorage.getItem('cacheAppNewUser')
      if (!cacheNewUser) {
        this.showAppNewUserGuide = true
        newUtils.ScrollNoMove()
        localStorage.setItem('cacheAppNewUser', Date.now())
      }
    },
    /** 新手引导回调函数 **/
    hideUserGuide () {
      newUtils.ScrollMove()
      this.showH5UserGuide = false
      this.showAppNewUserGuide = false
    },
    /** 判断是否有openToken **/
    isOpenToken () {
      const isQuickLogin = getUrlParams('quicklogin')
      if (isQuickLogin) {
        getOpenToken().then(res => {
          const { code, data, message } = _get(res, 'data')
          if (code == 200) {
            localStorage.setItem('OPEN_ACCESS_TOKEN', data.token)
          }
        })
      }
    },
    /** 判断不同平台的新手引导 **/
    plantUserGuide () {
      if (this.APP_VERSION) {
        this.isAppUserGuide()
      } else {
        this.isH5UserGuide()
      }
    }
  },
  mounted () {
    this._getAccountInfo()
    this._getTaskInfo()
    this._getIconList()
    this._getRankList()
    this.plantUserGuide()
    this.isOpenToken()
    this.$marchSetsPoint('P_H5PT0303', {
      source_address: document.referrer
    })
  }
}
</script>
<style lang="less" scoped>
.index {
  padding: 0.3rem 0.3rem 1.2rem;
  min-height: 100vh;
  background: #f2f2f2;
  background-size: 7.2rem 6.74rem;
  .user-info {
    position: relative;
    padding: 0.3rem 0;
    display: flex;
    justify-content: flex-start;
    .avatar {
      margin-right: 0.2rem;
      width: 0.9rem;
      height: 0.9rem;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 0.9rem;
      .name {
        margin-bottom: 0.1rem;
        font-size: 0.28rem;
        font-weight: 800;
        color: #000;
      }
      .id {
        font-size: 0.24rem;
        color: #000;
      }
    }
    .service {
      position: absolute;
      right: 0;
      top: 0.5rem;
      width: 1.8rem;
      height: 0.5rem;
      background: #ffca00;
      border-radius: 0.35rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #d39436;
      font-size: 0.26rem;
      font-weight: bold;
      img {
        margin-right: 0.05rem;
        width: 0.3rem;
        height: 0.3rem;
      }
    }
  }
  .coin-info {
    margin-bottom: 0.38rem;
    position: relative;
    display: flex;
    justify-content: center;
    border-radius: 0.3rem;
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
        font-size: 0.24rem;
        color: #000;
        img {
          margin-right: 0.05rem;
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      .number {
        position: relative;
        padding: 0.05rem 0;
        display: flex;
        align-items: flex-end;
        em {
          margin-right: 0.05rem;
          font-style: normal;
          font-size: 0.48rem;
          font-weight: bold;
          color: #e8382b;
        }
        span {
          line-height: 0.5rem;
          font-size: 0.2rem;
          color: #e8382b;
        }
        .check {
          position: absolute;
          right: -1rem;
          top: 0;
          z-index: 1;
          width: 1rem;
          height: 0.38rem;
        }
      }
      .add {
        font-size: 0.2rem;
        color: #acacac;
      }
    }
    .line {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1px;
      height: 1rem;
      background: #f2f2f2;
    }
  }
  .task-nav {
    margin: 0 0 0.57rem;
    display: flex;
    justify-content: flex-start;
    .item {
      margin-right: 0.2rem;
      img {
        margin-bottom: 0.1rem;
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
    height: 0.56rem;
    line-height: 0.56rem;
    text-align: center;
    font-size: 0.2rem;
    color: #acacac;
    span {
      color: #5186ca;
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
