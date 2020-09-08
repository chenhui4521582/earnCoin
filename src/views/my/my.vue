<template>
  <div class="my">
    <wf-header title="高额赚" />
    <!-- userInfo -->
    <div class="user-info" >
      <div class="avatar" @click="AvatarClick">
        <img class="inner-img" :src="(userInfo.headImg || avatar) | filter" alt="">
      </div>
      <div class="info" @click="AvatarClick">
        <div class="name">{{userInfo.nickname}}</div>
        <div class="id">用户ID:{{userInfo.userId}}</div>
      </div>
      <div class="service" @click="openService">
        <img src="./img/service-icon.png" alt="">联系客服
      </div>
    </div>
    <!-- accountInfo -->
    <div class="account-info">
      <div class="title">
        金币总额
        <i v-if="userInfo.balance==0">可以提现了</i>
        <span v-else>再赚{{userInfo.balance}}金币就能提现了</span>
      </div>
      <div class="coin">
        {{userInfo.currPoint}}<span>个</span>
      </div>
      <div class="rmb">
        ≈{{userInfo.convertRmb}}<span>元</span>
      </div>
      <div class="btn" @click="goWithdraw">提现</div>
    </div>
    <!-- 账号绑定 -->
    <account-bind :userInfo="userInfo" v-if="isShowAccount" @wechatBindSuccess="wechatBindSuccess"/>
    <!-- 个人中心List -->
    <my-list :userInfo="userInfo" @openService="openService"/>
    <!-- 退出登录 -->
    <div class="logout" v-if="isShowLogout" @click="logout"> 退出登录</div>
    <!-- 客服弹框 -->
    <Service v-model="showService" />
    <!-- 时长活动入口 -->
    <duration-entry />
    <!-- footer -->
    <base-footer></base-footer>
  </div>
</template>
<script>
import BaseFooter from '@/components/baseFooter/baseFooter'
import Service from '@/components/servicePop/service'
import AccountBind from './components/accountBind'
import MyList from './components/list'
import DurationEntry from '@/components/durationEntry/durationEntry'
import { getUserCenter } from '@/services/user'
import { mapState, mapActions } from 'vuex'
import _get from 'lodash.get'
export default {
  name: 'my',
  data: () => ({
    userInfo: {},
    showService: false,
    avatar: '/cdn/common/images/common/img_photo.png',
    isApp: false
  }),
  components: {
    Service,
    BaseFooter,
    AccountBind,
    MyList,
    DurationEntry
  },
  computed: {
    ...mapState(['APP_VERSION', 'isVisitory', 'deviceId']),
    isShowLogout () {
      if(!this.isVisitory && this.APP_VERSION) {
        return true
      }
      return false
    },
    isShowAccount () {
      if(this.APP_VERSION) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions({
      _userIsVisitor: 'USER_IS_VISITOR'
    }),
    AvatarClick () {
      this.$marchSetsPoint('A_H5PT0303003634')
    },
    openService () {
      this.showService = true
      this.$marchSetsPoint('A_H5PT0303003633')
    },
    /** 获取用户信息 **/
    _getUserCenter () {
      getUserCenter().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.userInfo = data
        }
      })
    },
    wechatBindSuccess () {
      this.userInfo.bindWechat = true
      setTimeout(()=> {
        this._getUserCenter()
        this._userIsVisitor({deviceNum: this.deviceId})
      }, 1000)
    },
    goWithdraw () {
      this.$router.push({
        name: 'withdraw'
      })
    },
    logout () {
      this.$router.push({
        name: 'loginPage'
      })
    }
  },
  mounted () {
    this._getUserCenter()
    this._userIsVisitor()
  }
}
</script>
<style scoped lang="less">
.my {
  padding: .9rem .3rem 1.2rem;
  min-height: 100vh;
  background: url(./img/banner.png) no-repeat center .9rem #F2F2F2;
  background-size: 100% 2.5rem;
  .user-info {
    position: relative;
    padding: .34rem 0 .24rem;
    display: flex;
    justify-content: flex-start;
    .avatar {
      margin-right: .2rem;
      width: .9rem;
      height: .9rem;
      border-radius: 50%;
      overflow: hidden;
      border: .02rem solid #D66400;
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
  .account-info {
    margin-bottom: .2rem;
    position: relative;
    padding-left: .34rem;
    height: 2rem;
    background: #fff;
    border-radius: .3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      margin-bottom: .1rem;
      font-weight: bold;
      font-size: .28rem;
      color: #000000;
      span {
        line-height: .4rem;
        font-weight: normal;
        color: #D39436;
        font-size: .2rem;
      }
      i {
        font-weight: normal;
        font-style: normal;
        color: #E8382B;
        font-size: .2rem;
        line-height: .4rem;
      }
      
    }
    .coin {
      margin-bottom: .1rem;
      line-height: .9;
      font-weight: bold;
      font-size: .48rem;
      color: #E8382B;
      span {
        line-height: .2rem;
        color: #E8382B;
        font-size: .2rem;
      }
    }
    .rmb {
      font-weight: bold;
      font-size: .28rem;
      color: #FF7800;
      span {
        color: #FF7800;
        font-size: .2rem;
      }
    }
    .btn {
      position: absolute;
      right: .3rem;
      top: .69rem;
      width: 1.8rem;
      height: .7rem;
      line-height: .7rem;
      text-align: center;
      font-size: .26rem;
      font-weight: bold;
      border-radius: .4rem;
      background: #FFCA00;
    }
  }
  .logout {
    height: .8rem;
    color: #ACACAC;
    font-size: .26rem;
    font-weight: bold;
    text-align: center;
    line-height: .84rem;
    border-radius: .4rem;
    background: #FFFFFF;
  }
}
</style>