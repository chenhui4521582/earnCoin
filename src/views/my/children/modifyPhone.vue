<template>
  <div class="edit-warp">
    <wf-header title="修改手机号" />
    <div class="edit-content">
      <div class="edit-text">
        <p>输入发送至</p>
        <p>+86 {{phoneNumber}}的验证码</p>
      </div>
      <ul class="captcha-ul">
        <li v-for="(item, index) in inputArr" :key="index">
          <input 
            type="tel" 
            pattern="\d*" 
            maxlength="1" 
            v-model="item.val"
            class="captcha-input"
            :disabled="item.disabled" 
            @input="inputFn(item,index,$event)" 
          />
        </li>
      </ul>
      <div class="send" v-if="showCountDown">
        <p>验证码已发送</p>
        <p>{{countDownTime}}s后重新获取</p>
      </div>
      <div class="no-code" v-else @click="getUpdateCaptcha()">
        <p>点击</p>
        <p>重新获取验证码</p> 
      </div>
    </div>
  </div>
</template>
<script>
import { updatePhoneCode, changeUpdatePhoneCode } from "@/services/user"
export default {
  name: "editPhone",
  data () {
    return {
      inputArr: [],
      captcha: '', // 验证码
      countDownTime: 60,
      showCountDown: false,
      inputIndex: 0,
      originalMobile: null
    }
  },
  computed: {
    phoneNumber () {
      const { phone } = this.$route.query
      return phone
    },
    inputElArr () {
      return Array.from(document.getElementsByClassName('captcha-input'))
    }
  },
  methods: {
    // 创建验证码输入框数据对象
    createInputData (num) {
      let arr = []
      for (let i = 0; i < num; i++) {
        arr.push({
          val: '',
          disabled: i == 0 ? false : true,
        })
      }
      return arr
    },
    // 初始化input数组
    initInputArr (inputIndex) {
      if (inputIndex) { // 如果inputIndex存在或大于0 初始化对应inputIndex的input框
        this.inputArr[inputIndex].val = ''
        this.inputArr[inputIndex].disabled = false
        this.inputArr[inputIndex + 1].disabled = true
        this.$nextTick(() => {
          this.inputElArr[inputIndex].focus()
        })
        this.inputIndex -= 1
        if (this.inputIndex < 0) {
          this.inputIndex = 0
        }
        return
      }
      this.inputArr = this.createInputData(6)
      this.$nextTick(() => {
        if (this.inputElArr && this.inputElArr.length > 0) {
          this.inputElArr[0].focus()
        }

      })
    },
    // input输入事件，初始化时，第一个input可输入后面的全部disabled
    inputFn (item, i) {
      this.inputIndex = i // 保存下一下输入框索引，以便删除时使用
      if (item.val) { // 如果有输入值
        if (i == this.inputArr.length - 1) { // 全部输入完毕提交验证接口
          this.inputArr[i].disabled = true // 当前的输入框disabled
          let smsCode = this.inputArr.map(item => {
            return item.val
          }).join('')
          document.activeElement.blur() // 收起键盘
          this.inputIndex = 0 // 重置索引
          changeUpdatePhoneCode(smsCode).then(this.checkCaptchaFn)
          return
        }
        this.inputArr[i].disabled = true // 当前的输入框disabled
        this.inputArr[i + 1].disabled = false // 下一个输入框可输入
        this.$nextTick(() => {
          this.inputElArr[i + 1].focus() // 下一个输入框获得焦点
        })
      }
    },
    // 验证换绑验证码后的判断逻辑
    checkCaptchaFn (r) {
      if (r.code == 200) { // 验证通过 直接跳转绑定页面
        this.$router.replace({ name: "bindNewPhone" })
      } else { // 如果验证不通过 初始化输出框数据
        this.$Toast(r.message)
        this.initInputArr()
      }
    },
    // 监听键盘删除键
    listenDelFn (flag) {
      if (flag == 'remove') {
        document.onkeydown = null
        return
      }
      document.onkeydown = (e) => {
        if (e.keyCode == 8) {
          this.initInputArr(this.inputIndex)
        }
      }
    },
    // 获取换绑手机验证码
    async getUpdateCaptcha (first) {
      const { code, data, message } = await updatePhoneCode()
      if (code === 200) {
        !first && this.countDown()
      } else {
        this.$Toast(message)
      }
    },
    // 倒计时
    countDown () {
      this.showCountDown = true
      let stop = setInterval(() => {
        this.countDownTime -= 1
        if (this.countDownTime <= 0) {
          clearInterval(stop)
          this.countDownTime = 60
          this.showCountDown = false
        }
      }, 1000)
    }
  },
  mounted () {
    this.initInputArr()
    this.listenDelFn()
    this.getUpdateCaptcha('first')
  },
  destroyed () {
    this.listenDelFn('remove')
  }
}
</script>
<style lang="less" scoped>
.edit-warp {
  padding-top: .94rem;
  min-height: 100vh;
  background: #F2F2F2;
  .edit-text {
    margin: 2rem 0 .2rem;
    text-align: center;
    font-size: .28rem;
    font-weight: bold;
    line-height: .4rem;
  }
}
.edit-content {
  overflow: hidden;
  padding: 0 .22rem 0 .26rem;
}

.tips {
  color: #ff4141;
  font-size: 24px;
  line-height: 1.6;
  padding: 14px 0 40px;
}

.mobile-number {
  font-size: 24px;
  color: #000000;
  padding-bottom: 15px;
}

.mobile__input {
  background: rgba(247, 247, 247, 1);
  border-radius: 16px;
  font-size: 24px;
  color: #bbb;
  padding: 0 20px;
  line-height: 90px;
  width: 100%;
}
.submit {
  width: 100%;
  line-height: 90px;
  background: #ff4141;
  text-align: center;
  position: fixed;
  left: 0;
  bottom: 0;
  color: #fff;
  font-size: 24px;
}

.captcha-ul {
  display: flex;
  justify-content: center;
  align-items: center;
  li {
    margin-right: .2rem;
    width: .5rem;
    height: .5rem;
    overflow: hidden;
    border-bottom: 1px solid #666666;
    input {
      border: none;
      display: block;
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      font-size: .24rem;
      color: #000;
    }
  }
}
.send {
  padding-top: 5rem;
  text-align: center;
  width: fit-content;
  margin: 0 auto;
  color: #ACACAC;
  font-size: .24rem;
}

.no-code {
  padding-top: 5rem;
  text-align: center;
  width: fit-content;
  margin: 0 auto;
  color: #FF7800;
  font-size: .24rem;
}
</style>


