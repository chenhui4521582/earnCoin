<template>
  <div class="index">
    <div class="goshare" @click="goshare">去分享</div>
    <!-- coin-info -->
    <div class="coin-info">
      <div class="coin item" @click="goWithdraw">
        <div class="name">
          <img src="./img/coin-icon.png" alt="">
          我的金币
        </div>
        <div class="number">
          <em>{{ userCenter.currPoint }}</em><span>个</span>
          <div class="check">
            <img class="inner-img" src="./img/check-now.png" alt="">
          </div>
        </div>
        <div class="add">
          今日+{{ userCenter.todayPoint }}
        </div>
      </div>
      <div class="task item" @click="goTask">
        <div class="name">
          <img src="./img/task-icon.png" alt="">
          我的任务
        </div>
        <div class="number">
          <em>{{userCenter.num}}</em><span>个</span>
        </div>
        <div class="add">
          已完成+{{userCenter.finishNum}}
        </div>
      </div>
      <div class="line"></div>
    </div>
    <!-- 导航 -->
    <Navigation />
    <!-- ranking -->
    <Rank-info v-for="(item, index) in list" :info="item" :key="index" />
    <!-- agreement -->
    <div class="agreement">
      高额赚 <span @click="goUserAgreement">用户协议</span>
    </div>
    <!-- footer -->
    <Base-footer />
    <!-- H5新手引导 -->
    <H5-user-guide ref="h5UserGuide" @popupSortHide="popupSortHide" />
    <!-- APP新手引导 -->
    <App-user-guide ref="appUserGuide" @popupSortHide="popupSortHide" />
    <!-- APP强更新弹框 -->
    <App-update ref="appUpdate" @popupSortHide="popupSortHide"/>
    <!-- 新手1小时活动 -->
    <New-user-active ref="newUserActive" @popupSortHide="popupSortHide"/>
    <!-- 红包 -->
    <Red-packet ref="redPacket" @refresh="_getUserCenter" @popupSortHide="popupSortHide" />
  </div>
</template>
<script>
import BaseFooter from '@/components/baseFooter/baseFooter'
import Navigation from './components/navigation'
import H5UserGuide from './components/h5UserGuide'
import AppUserGuide from './components/appUserGuide'
import RankInfo from './components/rankInfo'
import AppUpdate from './components/AppUpdate'
import RedPacket from './components/redPacket'
import NewUserActive from './components/newUserActive'
import Services from '@/services/index'
import { getUrlParams } from '@/utils/utils'
import { getOpenToken } from '@/services/user'
import { mapState, mapActions } from 'vuex'
import _get from 'lodash.get'
export default {
  name: 'Index',
  data: () => ({
    taskInfo: {},
    avatar: '/cdn/common/images/common/img_photo.png',
    list: [],
    isDisplay: true,
    popupSort: {
      popup: {
        1: 'appUpdate',
        2: 'redPacket',
        3: 'userGuide',
        4: 'newUserActive'
      },
      currentIndex: 0,
      serverSort: []
    }
  }),
  components: {
    BaseFooter,
    Navigation,
    RankInfo,
    AppUpdate,
    H5UserGuide,
    AppUserGuide,
    RedPacket,
    NewUserActive
  },
  computed: {
    ...mapState(['APP_VERSION', 'userCenter']),
  },
  methods: {
    ...mapActions({
      userFirstRegister: "QTT_REPORT",
      _getUserCenter: "GET_USER_CENTER"
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
    goshare () {
      this.$router.push({
        name: 'shareFriends'
      })
    },
    goUserAgreement () {
      window.location.href = 'https://wap.beeplaying.com/xmWap/#/my/userAgreement'
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
        /** 趣头条广告回传，用户注册 **/
        this.userFirstRegister(1)
      }
    },
    /** 首页弹框排序Init **/
    popupSortInit () {
      /** 服务器返回来的3个弹框 **/
      this.popupSort.serverSort = [1, 4]
      /** 打开第一个弹框 **/
      let index = this.popupSort.serverSort[this.popupSort.currentIndex]
      let popup = this.popupSort.popup[index] || ''
      this.openPopup(popup)
    },
    /** 首页弹框排序->关闭弹框 **/
    popupSortHide () {
      this.popupSort.currentIndex ++
      let index = this.popupSort.serverSort[this.popupSort.currentIndex]
      let popup = this.popupSort.popup[index] || ''
      this.openPopup(popup)
    },
    /** 首页弹框排序->打开弹框 **/
    openPopup (popup) {
      if(!popup) return 
      // /** 判断不同平台的新手引导 **/
      if (popup == 'userGuide' && this.APP_VERSION) {
        popup = 'appUserGuide'
      } 
      /** 判断不同平台的新手引导 **/
      if (popup == 'userGuide' && !this.APP_VERSION) {
        popup = 'h5UserGuide'
      }
      this.$refs[popup].init(isShow => {
        if(!isShow) {
          this.popupSortHide()
        }
      })
    }
  },
  mounted () {
    this._getUserCenter()
    this._getRankList()
    this.isOpenToken()
    this.popupSortInit()
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

}
</style>
