<template>
  <div class="bind-phone">
    <wf-header title="绑定手机号" />
    <div class="body">
      <div class="group">
        <div class="label">新的手机号</div>
        <div class="input">
          <input type="tel" placeholder="请输入手机号码" maxlength="11" v-model="phone">
          <div class="clear" v-if="showClear" @click="clearPhone" >
            <img class="inner-img" src="../img/clear-icon.png" alt="">
          </div>
        </div>
      </div>
      <div class="group">
        <div class="label">验证码</div>
        <div class="code">
          <input type="number" placeholder="请输入验证码" maxlength="6" v-model="code">
          <div class="send" v-if="!showCountdown" @click="getCode">发送验证码</div>
          <div class="countdown" v-else>{{countdown}}s</div>
        </div>
      </div>
      <div class="submit" @click="saveBinding" v-if="isSubmit">绑定</div>
      <div class="submit disable" v-else>绑定</div>
    </div>
  </div>
</template>
<script>
import { getPhoneCode, bindMobilePhone } from "@/services/user"
import _get from 'lodash.get'
export default {
  name: 'bindPhone',
  data: () => ({
    phone: '',
    code: '',
    countdown: 60,
    showCountdown: false
  }),
  computed: {
    isSubmit () {
      let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if(this.phone === "" || !phoneReg.test(this.phone) || this.code=== ""){
        return false
      }
      return true
    },
    showClear () {
      return this.phone.length
    }
  },
  methods: {
    // 绑定手机号码
    saveBinding () {
      let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if(this.phone===""){
        this.$Toast('请输入手机号码');
        return 
      }
      if (!phoneReg.test(this.phone)) {
        this.$Toast("请输入正确的手机号码");
        return;
      }
      if(this.code===""){
        this.$Toast('请输入短信验证码');
        return 
      }
      bindMobilePhone(this.phone, this.code).then(res => {
        const {code, data ,message} = _get(res, 'data') 
        if(code == 200){
          this.$Toast('绑定成功');
          this.$router.push({
            name: "my"
          })
        }else{
          this.$Toast(message);
        }
      })
    },
    // 获取短信验证吗
    getCode () {
      let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if(this.countdown !== 60){
        return ;
      }
      if(this.phone == ""){
        this.$Toast('请输入手机号码');
        return 
      }
      if (!phoneReg.test(this.phone)) {
        this.$Toast("请输入正确的手机号码");
        return;
      }
      getPhoneCode(this.phone).then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200){
          this.$Toast("短信验证码已发送，注意查收");
          this.countdownFn();
        }else{
          this.$Toast( message );
          clearInterval(this.time);
        }
      })
    },
    // 验证码倒计时计算
    countdownFn () {
      if (this.countdown === 0) {
        this.countdown = 60;
        this.code = "";
        this.showCountdown = false
        clearTimeout(this.time);
        return 
      } 
      this.showCountdown = true
      this.countdown--;
      this.time = setTimeout(() => {
        this.countdownFn();
      }, 1000);
    },
    clearPhone () {
      this.phone = ""
    }
  },
  beforeDestroy () {
    if(this.time){
      clearInterval(this.time);
    }
  }
}
</script>
<style scoped lang="less">
.bind-phone {
  padding: .9rem .3rem 1.2rem;
  min-height: 100vh;
  background: #F2F2F2;
  background-size: 100% 2.5rem;
  input {
    color: #000;
  }
  .group {
    .label {
      color: #000;
      font-size: .28rem;
      font-weight: bold;
      height: .8rem;
      line-height: .8rem;
    }
    .input {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 .37rem 0 .24rem;
      height: .9rem;
      border-radius: .45rem;
      background: #FFFFFF;
      .clear {
        width: .28rem;
        height: .28rem;
      }

    }
    .code {
      padding: 0 .37rem 0 .24rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: .9rem;
      border-radius: .45rem;
      background: #FFFFFF;
      .send {
        color: #FF7800;
        font-size: .24rem;
      }
      .countdown {
        color: #E8382B;
      }
    }
  }
  .submit {
    margin-top: 1.05rem;
    height: .8rem;
    line-height: .82rem;
    font-size: .26rem;
    font-weight: bold;
    text-align: center;
    border-radius: .4rem;
    background: #FFCA00;
    color: #000000;
    &.disable {
      background: #DCDCDC;
      color: #FFFFFF;
    }
  }
  .explain {
    margin-top: .3rem;
    font-size: .2rem;
    color: #ACACAC;
    text-align: center;
  }
}
</style>