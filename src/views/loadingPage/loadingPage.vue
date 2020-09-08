<template>
  <div class="loading">
    <div class="loading-container">
      <div class="spinner">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        <div class="bar4"></div>
        <div class="bar5"></div>
        <div class="bar6"></div>
        <div class="bar7"></div>
        <div class="bar8"></div>
        <div class="bar9"></div>
        <div class="bar10"></div>
        <div class="bar11"></div>
        <div class="bar12"></div>
      </div>
    </div>
    <!-- 隐私协议 -->
    <modal v-model="showPrivacy" title="六六五隐私协议" :closeIconShow="false" :centerScroll="true">
      <div class="privacy">
        <p class="title">六六五网络科技游戏用户个人信息及隐私保护政策</p>
          《六六五网络科技游戏用户个人信息及隐私保护政策》重要须知：为了贯彻执行相关法律法规的规定，成都六六五网络科技有限公司有限公司（以下称“六六五网络科技”）特此制定本《六六五网络科技游戏用户个人信息及隐私保护政策》。<br>
          在选择使用我们产品前，请务必阅读《用户隐私保护政策协议》内的所有条款，尤其是：<br>
          1、用户同意：个人隐私信息是指那些能够对用户进行个人辨识或涉及个人通信的信息，包括下列信息：用户的姓名，有效身份证件号码，家庭地址、电话号码，IP地址，电子邮件地址信息。而非个人隐私信息是指用户对本软件的操作状态以及使用习惯等一些明确且客观反映在六六五网络科技服务器端的基本记录信息和其他一切个人隐私信息范围外的普通信息。<br>
          2、一般而言，六六五网络科技公司基于下列原因需要使用到用户的信息资源：<br>
          （1） 执行软件验证服务。<br>
          （2）执行软件升级服务。<br>
          （3）网络同步服务。<br>
          （4） 提高用户的使用安全性并提供客户支持。<br>
          （5）因用户使用本软件特定功能或因用户要求六六五网络科技或合作单位提供特定服务时，六六五网络科技或合作单位则需要把用户的信息提供给与此相关联的第三方。<br>
          （6）执行六六五网络科技的《隐私权声明》,用户可访问六六五网络科技网站查阅该声明。<br>
          （7）其他有利于用户和六六五网络科技利益的。<br>
          3、六六五网络科技注重对用户信息资源的保护，会使用各种安全技术和程序来保护用户信息资源不被未经授权的访问、使用和泄漏。六六五网络科技不向第三方公开透露用户信息，但因下列原因而披露给第三方的除外：<br>
          （1）基于国家法律法规的规定而对外披露；<br>
          （2）应国家司法机关及其他有法律赋予权限的政府机关基于法定程序的要求而披露；<br>
          （3）为保护六六五网络科技或您的合法权益而披露；<br>
          （4）在紧急情况下，为保护其他用户及第三方人身安全而披露；<br>
          （5）用户本人或用户监护人授权披露的；<br>
          （6）应用户监护人合法要求而提供用户个人身份信息时。<br>
          4、用户如何更正或投诉个人信息
          如果您需要查询、修改或更正您的个人信息，或对个人信息保护问题有任何疑问或建议，您可以通过客户服务电话：4008735311联系我们。公司地址：苏州市工业园区若水路纳米大学产业园（完）
      </div>
      <div class="privacy-btns" slot="footer">
        <div class="confirm-btn" @click="confirmClick">同意</div>
        <div class="cancel-btn" @click="cancelClick">不同意</div>
      </div>
    </modal>
  </div>
</template>
<script>
import { visitorLogin, getAccessToken, tokenVerify } from '@/services/user'
import AppCall from '@/utils/native'
import { mapState, mapActions } from 'vuex'
import _get from 'lodash.get'
export default {
  name: 'loadingPage',
  data: () => ({
    showPrivacy: false
  }),
  computed: {
    ...mapState(['deviceId'])
  },
  methods: {
    ...mapActions({
      userIsVisitor: "USER_IS_VISITOR",
      userFirstActive: "QTT_REPORT"
    }),
    /** 游客登录 **/
    _visitorLogin () {
      visitorLogin({ source: 1, visitorToken: this.deviceId }).then( res => {
        const { code, data, message } = _get(res, 'data')
        if(code == 200) {
          this._getAccessToken(data)
        } else if (code == 104) {
          this.$Toast( message, () => {
            this.$router.replace({
              name: 'loginPage'
            })
          })
        }else {
          this.$Toast( message )
        }
      })
    },
    /** 获取ACCESS_TOKEN **/
    _getAccessToken (requestToken) {
      getAccessToken({ token: requestToken, type: 1 }).then( res => {
        const { code, data, message } = _get(res, 'data')
        if(code == 200) {
          localStorage.setItem('ACCESS_TOKEN', data.accessToken)
          this.$router.replace({
            name: 'index',
            query: {
              'quicklogin': 1
            }
          })
        } else {
          this.$Toast( message )
        }
      })
    },
    /** 判断Token 是否过期 **/
    _tokenVerify () {
      tokenVerify().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200 && data) {
          this.$router.replace({
            name: 'index',
            query: {
              'quicklogin': 1
            }
          })
        }else {
          this.$router.replace({
            name: 'loginPage'
          })
        }
      })
    },
    /** 用户协议同意按钮回调 **/
    confirmClick () {
      this.showPrivacy = false
      localStorage.setItem('userPrivacy', Date.now())
      this.init()
    },
    /** 用户协议不同意按钮回调 **/
    cancelClick () {
      AppCall.closeApp()
    },
    init () {
      /** 
       * 登录逻辑
       * 1. 用户隐私协议
       * 2. 有token 保持登录
       * 3. 判断是否是游客， 游客就帮他游客登录， 不是游客跳转登录页
      **/
      const userPrivacy = localStorage.getItem('userPrivacy')
      this.ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN')
      if(!userPrivacy) {
        this.showPrivacy = true
      }
      else if (this.ACCESS_TOKEN) {
        this._tokenVerify()
      } else {
        // 6b2dc0d2-7aa4-3d43-9811-4fb832b49e6f
        this.userIsVisitor({deviceNum: this.deviceId}).then(res => {
          const {code, data, message} = _get(res, 'data')
          if (code == 200) {
            if(data) {
              this._visitorLogin()
            }else {
              this.$router.replace({
                name: 'loginPage'
              })
            }
          }
        })
      }
      /** 趣头条广告回传，用户激活 **/
      const firstInApp = localStorage.getItem('firstInApp')
      if( !firstInApp ) {
        this.userFirstActive(0)
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
  .loading {
    height: 100vh;
    background: url(./img/bg.png) no-repeat center bottom;
    background-size: 3.12rem 8.13rem;
  }
  .privacy {
    height: 5rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    line-height: .4rem;
    .title {
      margin-bottom: .1rem;
      font-size: .3rem;
      color: #000;
    }
  }
  .privacy-btns {
    display: flex;
    justify-content: center;
    align-items: center;
    .confirm-btn {
      width: 50%;
      height: .5rem;
      line-height: .5rem;
      text-align: center;
      border-right: 1px solid #ccc;
    }
    .cancel-btn {
      width: 50%;
      height: .5rem;
      line-height: .5rem;
      text-align: center;
      color: #ccc;
    }
  }

  .loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 15;
}

.loading-container {
  position: absolute;
  bottom: 24%;
  left: 50%;
  z-index: 15;
  transform: translate(-50%, 0);
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0.28rem;
}

.spinner {
  position: relative;
  height: 40%;
  width: 40%;
  top: 0.45rem;
  left: 0.02rem;
  margin: 0 auto;
}

.spinner div {
  width: 9%;
  height: 26%;
  background-color: #000;
  position: absolute;
  left: 44.5%;
  top: 37%;
  opacity: 0;
  -webkit-border-radius: 30%;
  -webkit-animation: fade 1s linear infinite;
}

.spinner div.bar1 {
  -webkit-transform: rotate(0deg) translate(0, -142%);
  -webkit-animation-delay: 0s;
}

.spinner div.bar2 {
  -webkit-transform: rotate(30deg) translate(0, -142%);
  -webkit-animation-delay: -0.9167s;
}

.spinner div.bar3 {
  -webkit-transform: rotate(60deg) translate(0, -142%);
  -webkit-animation-delay: -0.833s;
}

.spinner div.bar4 {
  -webkit-transform: rotate(90deg) translate(0, -142%);
  -webkit-animation-delay: -0.75s;
}

.spinner div.bar5 {
  -webkit-transform: rotate(120deg) translate(0, -142%);
  -webkit-animation-delay: -0.667s;
}

.spinner div.bar6 {
  -webkit-transform: rotate(150deg) translate(0, -142%);
  -webkit-animation-delay: -0.5833s;
}

.spinner div.bar7 {
  -webkit-transform: rotate(180deg) translate(0, -142%);
  -webkit-animation-delay: -0.5s;
}

.spinner div.bar8 {
  -webkit-transform: rotate(210deg) translate(0, -142%);
  -webkit-animation-delay: -0.41667s;
}

.spinner div.bar9 {
  -webkit-transform: rotate(240deg) translate(0, -142%);
  -webkit-animation-delay: -0.333s;
}

.spinner div.bar10 {
  -webkit-transform: rotate(270deg) translate(0, -142%);
  -webkit-animation-delay: -0.25s;
}

.spinner div.bar11 {
  -webkit-transform: rotate(300deg) translate(0, -142%);
  -webkit-animation-delay: -0.1667s;
}

.spinner div.bar12 {
  -webkit-transform: rotate(330deg) translate(0, -142%);
  -webkit-animation-delay: -0.0833s;
}

@-webkit-keyframes fade {
  from {
    opacity: 0.8;
  }
  to {
    opacity: 0.25;
  }
}
</style>>