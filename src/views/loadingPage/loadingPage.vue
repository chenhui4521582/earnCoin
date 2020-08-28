<template>
  <div class="loading">
    <red-packet 
      v-model="showRedPacket" 
      :redPacketData="redPacketData" 
      @redPacketFinish="redPacketFinish"
      @hideRedPacket="hideRedPacket"
    />
    <!-- 隐私协议 -->
    <modal v-model="showPrivacy" title="六六五隐私协议" :closeIconShow="false">
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
import { getUrlParams } from '@/utils/utils'
import RedPacket from './components/redPacket'
import { visitorLogin, userIsReceive, getRedPacketAward, sendRedPacketToServer, getAccessToken, getOpenToken} from '@/services/user'
import AppCall from '@/utils/native'
import { mapState } from 'vuex'
import _get from 'lodash.get'
export default {
  name: 'loadingPage',
  data: () => ({
    showRedPacket: false,
    redPacketData: {},
    showPrivacy: false
  }),
  components: {
    RedPacket
  },
  computed: {
    ...mapState(['deviceId'])
  },
  methods: {
    async _visitorLogin (callback) {
      /** 游客登录 **/
      const vRes = await visitorLogin({ source: 1,visitorToken: this.deviceId })
      let vCode = _get(vRes, 'data.code')
      let vData = _get(vRes, 'data.data')
      let vMessage = _get(vRes, 'data.message')
      if(vCode == 200) {
        /** 获取ACCESS_TOKEN **/
        const ARes = await getAccessToken({ token: vData, type: 1 })
        let aCode = _get(ARes, 'data.code')
        let aData = _get(ARes, 'data.data')
        if(aCode == 200) {
          localStorage.setItem('ACCESS_TOKEN', aData.accessToken)
          /** 获取OPEN_TOKEN **/
          let openRes = await getOpenToken()
          let openCode = _get(openRes, 'data.code')
          let openToken = _get(openRes, 'data.data.token')
          localStorage.setItem('OPEN_ACCESS_TOKEN', openToken)
          if (openCode == 200) {
            callback && callback()
          }
        }else {
          this.$Toast(message)
        }
      }else if(vCode == 104) {
        this.$Toast(vMessage, () => {
          this.$router.replace({
            name: 'loginPage'
          })
        })
      }else {
        this.$Toast(vMessage)
      }
    },
    /** 红包弹框关闭回调方法 **/
    hideRedPacket () {
      /** 有token 直接进首页 **/
      if(this.ACCESS_TOKEN) {
        this.$router.replace({
          name: 'index'
        })
      }else {
        /** 关闭红包弹框注册游客用户 **/
        this._visitorLogin(() => {
          this.$router.replace({
            name: 'index'
          })
        })
      }
    },
    /** 红包弹框领取完毕回调方法 **/
    redPacketFinish () {
      /** 有token发送奖品数据到后端并且进入首页 **/
      if(this.ACCESS_TOKEN) {
        sendRedPacketToServer()
        this.$router.replace({
          name: 'index'
        })
      }else {
        /** 领取红包完毕注册游客用户并且发送奖品数据到后端 **/
        this._visitorLogin(()=> {
          sendRedPacketToServer()
          this.$router.replace({
            name: 'index'
          })
        })
      }
    },
    /** 判断用户是否领取过红包 **/
    _userIsReceive () { 
      userIsReceive({
        userSource: 1,
        deviceNum: this.deviceId
      }).then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          const showRedPacket = _get(data, 'popup', false)
          this.redPacketData = data
          /** 领取过奖励的直接跳转首页，没领取的打开红包 **/
          if(showRedPacket) {
            this.showRedPacket = true
          } else {
            this.$router.replace({
              name: 'loginPage'
            })
          }
        }
        /** 用户token过期,跳转到登录页 **/
        if(code == 102) {
          this.$router.replace({
            name: 'loginPage'
          })
        }
        /** 用户已经领取过红包并且是游客 **/
        if(code == 103) {
          this._visitorLogin(() => {
            this.$router.replace({
              name: 'index'
            })
          })
        }
        /** 用户已经领取过红包并且不是游客 **/
        if(code == 104) {
          this.$router.replace({
            name: 'loginPage'
          })
        }
      })
    },
    confirmClick () {
      this.showPrivacy = false
      localStorage.setItem('userPrivacy', Date.now())
    },
    cancelClick () {
      AppCall.closeApp()
    },
    init () {
      this.ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN')
      this._userIsReceive()
      let userPrivacy = localStorage.getItem('userPrivacy')
      if(userPrivacy) {
        this.showPrivacy = false
      }else {
        this.showPrivacy = true
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
    background: url(./img/bg.png) no-repeat center top;
    background-size: 100% auto;
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
</style>>