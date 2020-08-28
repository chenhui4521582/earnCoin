<template>
  <div class="withdraw-type">
    <div class="title">
      <span>
        <i>提现方式</i>
      </span>
      <em>目前只支持微信提现</em>
    </div>
    <div class="is-bind">
      <!-- 没有绑定微信 -->
      <div class="unbind" v-if="!isBindWechat" @click="goBindWechat">
        <img src="../img/unbind.png" alt="">
        尚未绑定微信账户  立即绑定>>
      </div>
      <!-- 绑定过微信 -->
      <div class="bind-end" v-if="isBindWechat">
        <img src="../img/bind-end.png" alt="">
        微信提现
      </div>
    </div>
  </div>
</template>
<script>
import AppCall from '@/utils/native/index'
import { wechatLogin, userBindWechat } from '@/services/user'
import { mapState } from 'vuex'
import _get from 'lodash.get'
export default {
  name: 'withdrawType',
  props: {
    isBindWechat: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['isVisitory', 'APP_VERSION', 'deviceId']),
  }, 
  methods: {
    /** 绑定微信 **/
    goBindWechat () {
      /** 用户是APP用户直接吊起微信绑定 **/
      if(this.APP_VERSION) {
        this._wechatLogin()
      } else {
        /** 用户是H5用户跳转教程页面 **/
        this.goWithdrawCourse()
      }
    },
    /** H5用户跳转绑定公众号教程 **/
    goWithdrawCourse () {
      this.$router.push({
        name: 'withdrawCourse'
      })
      this.$marchSetsPoint('A_H5PT0303003645')
    },
    /** 非游客绑定微信 **/
    _userBindWechat (callback) {
      userBindWechat({
        code: callback.Code,
        appId: callback.AppId,
        deviceNum: this.deviceId
      }).then(res => {
        const { code, data, message } = _get(res, 'data')
        if( code == 200 ) {
          this.$Toast('绑定成功', () => {
            this.$emit('wechatBindSuccess')
          })
        } else {
          this.$Toast( message )
        }
      })
    },
    /** 游客绑定微信 **/
    _visitorBindWechat (callback) {
      wechatLogin({
        code: callback.Code,  
        appId: callback.AppId,
        deviceNum: this.deviceId,
        visitorToken: this.deviceId
      }).then(res => {
        const {code, data, message} = _get(res, 'data')
        if (code == 200) {
          this.$Toast('绑定成功', () => {
            this.$emit('wechatBindSuccess')
          })
        } else {
          this.$Toast( message )
        }
      })
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
        if(!this.isVisitory) {
          this._userBindWechat(callback) 
        }else {
          this._visitorBindWechat(callback)
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.withdraw-type {
  padding: 0 .3rem;
  .title {
    margin-bottom: .14rem;
    display: flex;
    align-items: flex-end;
    span {
      margin-right: .2rem;
      position: relative;
      line-height: 1.2;
      &::after {
        content: '';
        position: absolute;
        bottom: .06rem;
        left: 0;
        z-index: 1;
        height: .1rem;
        width: 100%;
        background: #FFC300;
      }
      i {
        position: relative;
        z-index: 2;
        font-size: .42rem;
        font-style: normal;
        color: #000;
        font-weight: bold;
      }
    }
    em {
      font-style: normal;
      color: #666;
    }
  }
  .is-bind {
    margin-bottom: .5rem;
    height: 1rem;
    background: #fff;
    border: .03rem solid #FFCA00;
    border-radius: .3rem;
    .unbind,.bind-end {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: .2rem;
      img {
        margin-right: .2rem;
        width: .56rem;
        height: .43rem;
      }
    }
    .unbind {
      color: #E8382B;
    }
    .bind-end {
      color: #000000;
      font-weight: bold;
    }
  }
}
</style>