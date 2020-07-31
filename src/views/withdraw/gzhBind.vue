<template>
  <div id="app">
    <div class="top_bg"></div>
    <div class="bind-wrap">
      <div class="bind-box">
        <div class="content-wrap">
          <template v-if="!bind">
            <p v-if="!bind">手机号<input type="tel" v-model="phone" maxlength="11" placeholder="请与游戏内绑定的手机号一致"></p>
            <p>验证码
              <input type="text" class="code" v-model="code" maxlength="6"placeholder="请输入验证码">
              <span class="count-down" v-if="showSendCode" @click="_sendCode">获取验证码</span>
              <span class="count-down" v-else>{{leftTime}}s</span>
            </p>
          </template>
          <p v-else>手机号绑定成功：{{phone}}</p>
        </div>
      </div>
      <p class="bind-btn" v-if="!bind"  @click="bindPhone">立即绑定</p>
    </div>
    <div class="rule">
        <div class="rule-content">
            <p>说明：</p>
            <p>1.绑定的手机号必须与游戏内绑定的手机号一致才能提现。</p>
            <p>2.如果绑定账号与游戏内不一致，请在游戏内联系客服处理。</p>
            <p>3.兑换成功后，请到游戏内“兑换”-“兑奖纪录”页面查看进度，奖励会在1个工作日内到账。</p>
            <p>4.如果采用恶意手段获取奖励，奖励不予发放。</p>
            <p>5.绑定成功后，请在游戏内兑换红包，红包将通过微信发放给您，请留意零钱到账信息。</p>
        </div>
    </div>
  </div>
</template>
<script>
import { getUrlParams } from '@/utils/utils'
import { gzhBindPhone, sendCode, isBindPhone } from '@/services/withdraw'
import _get from 'lodash.get'
export default {
  name: 'App',
  data() {
    return {
      phone: '',
      code: '',
      bind: false,
      leftTime: 60,
      showSendCode: true
    }
  },
  computed: {
    isRight() {
      let reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
      return this.phone && reg.test(this.phone)
    },
  },
  methods: {
    bindPhone () {
      const openId = getUrlParams('openId')
      if(!this.isRight) {
        this.$Toast('请输入正确格式的手机号码')
        return 
      } 
      gzhBindPhone(openId, this.phone, this.code).then( res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.$Toast('绑定成功')
          this.bind = true
        }else {
          this.$Toast( message )
        }
      })
    },
    _sendCode () {
      if (!this.isRight) {
          this.$Toast('手机号格式错误')
          return
      }
      this.showSendCode = false
      sendCode(this.phone).then(res => {
        const {code, data, message} = _get(res, 'data')
        if (code == 200) {
          this.$Toast('发送成功');
          this.countdownFn()
        } else {
          this.$Toast(message);
        }
      })
    },
    /** 验证码倒计时计算 **/
    countdownFn() {
      if (this.leftTime === 0) {
          this.leftTime = 60;
          this.showSendCode = true
          clearTimeout(this.timer);
          return false;
      } else {
          this.leftTime--;
          this.timer = setTimeout(() => {
            this.countdownFn();
          }, 1000);
      }
    },
    isBind () {
      const openId = getUrlParams('openId')
      isBindPhone(openId).then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.bind = data.flag
          this.phone = data.phone 
        }
      })
    }
  },
  mounted () {
    this.isBind()
  }
}
</script>
<style lang="less" scoped>
    ::-webkit-input-placeholder {
        font-size: .24rem;
        color: rgba(197, 197, 197, 1);
    }

    p {
        margin: 0
    }

    #app {
      overflow: hidden;
        .top_bg {
            position: absolute;
            top: 0;
            width: 100%;
            height: 2.7rem;
            background: url(./img/banner@2x.png) no-repeat;
            background-size: 100% 100%;
        }
        .bind-wrap {
            position: absolute;
            top: 2.7rem;
            font-weight: bold;
            height: 3.9rem;
            width: 100%;
            &:before {
                content: '';
                position: absolute;
                top: 0;
                height: .16rem;
                background: rgba(237, 237, 237, 1);
                width: 100%;
            }
            &:after {
                content: '';
                position: absolute;
                bottom: 0;
                height: .16rem;
                background: rgba(237, 237, 237, 1);
                width: 100%;
            }
            .bind-box {
                .content-wrap {
                    box-sizing: border-box;
                    text-align: left;
                    margin-top: .3rem;
                    padding: 0 .8rem;
                    margin-top: .7rem;
                    margin-bottom: .16rem;
                    p {
                        position: relative;
                        height: .7rem;
                        line-height: .8rem;
                        font-size: .28rem;
                        font-weight: bold;
                        color: rgba(154, 154, 154, 1);
                        display: flex;
                        justify-content: center;
                        &:nth-child(2) {
                            margin-top: .3rem;
                        }
                        input {
                            padding: .25rem .2rem;
                            box-sizing: border-box;
                            margin-left: .2rem;
                            width: 4.5rem;
                            background: rgba(240, 240, 240, 1);
                            border-radius: .06rem;
                            border-style: none;
                            font-size: .3rem;
                            font-weight: bold;
                            color: rgba(64, 64, 64, 1);
                            height: 0.7rem;
                        }
                        &:last-child {
                            img, span {
                                position: absolute;
                                right: 0;
                                top: 0;
                                width: 1.61rem;
                                height: .7rem;
                            }
                            span {
                                text-align: center;
                                line-height: .7rem;
                                font-size: .24rem;
                                font-weight: 500;
                                color: rgba(53, 178, 249, 1);
                            }
                        }
                    }
                }
            }
            .bind-btn {
                margin: .3rem auto 0;
                width: 5.9rem;
                height: .7rem;
                background: rgba(53, 178, 249, 1);
                border-radius: .35rem;
                line-height: .7rem;
                font-size: .28rem;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                text-align: center;
            }

        }
        .rule {
            font-size: .24rem;
            font-weight: 700;
            color: #6d6d6d;
            line-height: .42rem;
            display: -ms-flexbox;
            display: flex;
            align-items: center;
            margin-top: 6.5rem;
            padding: .3rem;
        }
    }

    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        font-size: .3rem;
        color: #2475b3;
    }
</style>
