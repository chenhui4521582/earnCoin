<template>
  <div class="oher-phone">
    <div class="logo">
      <img class="inner-img" src="./img/logo.png" alt="">
    </div>
    <div class="form-group">
      <div class="label">手机号</div>
      <input v-model="validate.mobile" type="tel" maxlength="11" placeholder="请输入手机号码" >
    </div>
    <div class="form-group">
      <div class="label">验证码</div>
      <div class="code">
        <input v-model="validate.code" type="number" maxlength="6" placeholder="请输入验证码" >
        <div class="send-code">
          <div class="btn" v-if="!validate.countTime" @click="_sendCode">发送验证码</div>
          <div class="count-down">{{validate.countTime}}</div>
        </div>
      </div>
    </div>
    <div class="submit" :class="{'disable': !isSubmit}" @click="submit">登录</div>
    <div class="tips">
      提示：未注册用户将在验证后自动注册用户
    </div>
  </div>
</template>
<script>
import { sendCode, getRequestToken, getAccessToken, getOpenToken } from '@/services/user'
import _get from 'lodash.get'
export default {
  name: 'other-phone',
  data: () => ({
    validate: {
      mobile: '',
      password: '',
      code: '',
      countTime: ''
    }
  }),
  computed: {
    ...mapState(['deviceId']),
    isSubmit () {
      let mobileReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if (this.validate.mobile && mobileReg.test(this.validate.mobile) && this.validate.code && this.validate.code.length == 6 ) {
        return true
      }
      return false
    }
  },
  methods: {
    /** 发送验证码 **/
    _sendCode() {
      let mobileReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if (!this.validate.mobile|| !mobileReg.test(this.validate.mobile)) {
        this.$Toast('手机号码有误，请重填')
        return false
      }
      let params = {
        receiveRange: 1,
        username: this.validate.mobile
      }
      sendCode(params).then(res => {
        let {code, data, message} = _get(res, 'data', {})
        if(code === 200) {
          this.countDown()
        }else {
          this.$Toast(message)
        }
      })
    },
    /** 倒计时 60 **/
    countDown() {
      let date = 60
      this.timer = setInterval(() => {
        date = date - 1
        if (date < 0) {
          date = 0
          clearInterval(this.timer)
          this.validate.countTime = ''
          return false
        }
        this.validate.countTime = date+'s'
      }, 1000)
    },
    /** 获取AccessToken **/
    async _getAccessToken(requestToken) {
      let accessRes = await getAccessToken({ token: requestToken, type: 1 })
      const {code, data, message} = _get(accessRes, 'data')
      let accessCode = _get(accessRes, 'data.code')
      let accessData = _get(accessRes, 'data.data')
      if(code == 200) {
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
    /** 获取requestToken **/
    _getRequestToken () {
      let url = '//uic-api.beeplaying.com/uic/api/user/login/sms/requestToken'
      let params = {
        smsCode: this.validate.code,
        username: this.validate.mobile,
        visitorToken: this.deviceId,
        deviceNum: this.deviceId
      }
      getRequestToken(params).then(res=> {
        let {code, data, message} = _get(res, 'data', {})
        if(code === 200) {
          this._getAccessToken(data)
        }else {
          this.$Toast(message)
        }
      })
    },
    submit() {
      if(!this.isSubmit) return 
      this._getRequestToken()
    },
  },
  mounted () {

  }
}
</script>
<style scoped lang="less">
.oher-phone {
  padding: 0 .3rem;
  overflow: hidden;
  height: 100vh;
  background: #F2F2F2;
  .logo {
    margin: 1.2rem auto .7rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  .form-group {
    margin-bottom: .67rem;
    &:last-child {
      margin-bottom: .75rem;
    }
    .label {
      margin-bottom: .14rem;
      font-size: .28rem;
      color: #000;
      font-weight: bold;
    }
    input {
      padding: 0 .24rem;
      width: 100%;
      height: .9rem;
      background: #fff;
      border-radius: .45rem;
      color: #DCDCDC;
      &::-webkit-input-placeholder{
          color:#DCDCDC;
      }
      &::-moz-placeholder{   /* Mozilla Firefox 19+ */
          color:#DCDCDC;
      }
      &:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
          color:#DCDCDC;
      }
      &:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
          color:#DCDCDC;
      }
    }

    .code {
      padding: 0 .24rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: .9rem;
      background: #fff;
      border-radius: .45rem; 
      input {
        padding: 0;
        width: 60%;
      }
      .send-code {
        font-size: .24rem;
        color: #FF7800;
        font-weight:400;
        .count-down {
          color: #E8382B;
        }
      }
    }
  }
  .submit {
    margin-bottom: .3rem;
    height: .8rem;
    font-weight: bold;
    font-size: .26rem;
    color: #000000;
    text-align: center;
    line-height: .82rem;
    border-radius: .4rem;
    background: #FFCA00;
    &.disable {
      color: #fff;
      background: #DCDCDC;
    }
  }
  .tips {
    text-align: center;
    font-size: .2rem;
    color: #E8382B;
  }
}
</style>