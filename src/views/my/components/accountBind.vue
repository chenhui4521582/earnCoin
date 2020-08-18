<template>
  <div class="account-bind" v-if="!allBind">
    <div class="title">
      <span>账号绑定</span>
      <i :class="{active: bind}">为保障资金安全，提现前需要绑定以下信息</i>
    </div>
    <div class="wrap">
      <div class="wechat-bind" @click="_wechatLogin">
        <div class="icon"></div>
        <div class="name">微信号</div>
        <div class="option" v-if="!userInfo.bindWechat">去绑定<span class="iconfont icon-next"></span></div>
        <div class="option bind" v-else>已绑定<span class="iconfont icon-next"></span></div>
      </div>
      <div class="phone-bind" @click="phoneClick">
        <div class="icon"></div>
        <div class="name" v-if="!userInfo.bindPhone">手机号</div>
        <div class="name" v-else>{{userInfo.phone}}</div>
        <div class="option" v-if="!userInfo.bindPhone">去绑定<span class="iconfont icon-next"></span></div>
        <div class="option bind" v-else>已绑定<span class="iconfont icon-next"></span></div>
      </div>
    </div>
  </div>
  <div class="all-bind" v-else>
    <div class="item wechat">
      <div class="name">微信绑定</div>
      <div class="staus">已绑定</div>
    </div>
    <div class="item phone">
      <div class="name">手机号绑定</div>
      <div class="staus">{{userInfo.phone}}<span class="iconfont icon-next"></span></div>
    </div>
  </div>
</template>
<script>
import AppCall from '@/utils/native/index'
import { getAccessToken, wechatLogin, getOpenToken } from '@/services/user'
import { mapState } from 'vuex'
export default {
  name: 'accountBind',
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState(['deviceId']),
    bind () {
      if(this.userInfo.bindWechat || this.userInfo.bindPhone) {
        return true
      }
      return false
    },
    allBind () {
      if(this.userInfo.bindWechat && this.userInfo.bindPhone) {
        return true
      }
      return false
    }
  },
  methods: {
    goBindPhone () {
      this.$router.push({
        name: 'bindPhone'
      })
    },
    goModifyPhone () {
      this.$router.push({
        name: 'phoneBinding',
        query: {
          phone: this.userInfo.phone
        }
      })
    },
    phoneClick () {
      if(this.userInfo.bindPhone) {
        this.goModifyPhone()
      }else {
        this.goBindPhone()
      }
    },
    /** 获取ACCESS_TOKEN **/
    async _getAccessToken (requestToken) {
      let accessRes = await getAccessToken({ token: requestToken, type: 1 })
      let accessCode = _get(accessRes, 'data.code')
      let accessData = _get(accessRes, 'data.data')
      if(accessCode == 200) {
        localStorage.setItem('ACCESS_TOKEN', accessData.accessToken)
        /** 获取OPEN_TOKEN **/
        let openRes = await getOpenToken()
        let openCode = _get(openRes, 'data.code')
        let openToken = _get(openRes, 'data.data.token')
        localStorage.setItem('OPEN_ACCESS_TOKEN', openToken)
        this.$Toast('登录成功！', () => {
          this.$router.push({
            name: 'index'
          })
        })
      }
    },
    /** 微信登录 **/
    _wechatLogin () {
      /** window层创建微信登录回调方法 **/
      this.wechatCallback()
      /** 调用APP方法微信登录 **/
      AppCall.WXLogin()
    },
    /** 微信登录回调 **/
    wechatCallback () {
      window.WXMessage = (callback) => {
        wechatLogin({
          code: callback.Code,
          appId: callback.AppId,
          deviceNum: this.deviceId
        }).then (res => {
          const {code, data, message} = _get(res, 'data')
          if (code == 200) {
            this._getAccessToken(data)
          } else {
            this.$Toast( message )
          }
        })
      }
    }
  }
}
</script>
<style scoped lang="less">
  .account-bind {
    margin-bottom: .2rem;
    padding: .24rem .3rem 0 .34rem;
    height: 2.8rem;
    background: #fff;
    border-radius: .3rem;
    .title {
      margin-bottom: .24rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: .28rem;
        color: #000000;
        font-weight: bold;
      }
      i {
        font-style: normal;
        font-size: .2rem;
        color: #ACACAC;
        &.active {
          color: #D39436;
        }
      }
    }
    .wrap {
      display: flex;
      justify-content: center;
      .wechat-bind {
        width: 50%;
        .icon {
          margin: 0 auto;
          width: 1rem;
          height: 1rem;
          background: url(../img/wechat-icon.png) no-repeat center top;
          background-size: 100% 100%;
        }
        .name {
          height: .4rem;
          line-height: .4rem;
          font-size: .24rem;
          color: #000000;
          text-align: center;
        }
        .option {
          color: #E8382B;
          font-size: .2rem;
          text-align: center;
          .iconfont {
            margin-left: .03rem;
            font-size: .2rem;
          }
          &.bind {
            color: #ACACAC;
          }
        }
      }
      .phone-bind {
        width: 50%;
        .icon {
          margin: 0 auto;
          width: 1rem;
          height: 1rem;
          background: url(../img/phone-icon.png) no-repeat center top;
          background-size: 100% 100%;
        }
        .name {
          height: .4rem;
          line-height: .4rem;
          font-size: .24rem;
          color: #000000;
          text-align: center;
        }
        .option {
          color: #E8382B;
          font-size: .2rem;
          text-align: center;
          .iconfont {
            margin-left: .05rem;
            font-size: .2rem;
          }
          &.bind {
            color: #ACACAC;
          }
        }
      }
    }
  }
  .all-bind {
    margin-bottom: .2rem;
    padding: 0 .3rem;
    height: 2.2rem;
    background: #fff;
    border-radius: .3rem;
    .item {
      padding-left: .39rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.1rem;
      border-bottom: 1px solid #F2F2F2;
      color: #ACACAC;
      .name {
        font-weight: bold;
        color: #000;
      }
      .iconfont {
        font-size: .24rem;
      }
    }
    .wechat {
      background: url(../img/mall-wechat-icon.png) no-repeat 0 center;
      background-size: .3rem .3rem;
    }
    .phone {
      background: url(../img/mall-phone-icon.png) no-repeat 0 center;
      background-size: .3rem .3rem;
    }
  }
</style>