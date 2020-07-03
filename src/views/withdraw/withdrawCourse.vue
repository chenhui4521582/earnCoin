<template>
  <div class="withdraw-course">
    <wf-header title="提现教程" />
    <div class="group" v-if="!bindPhone">
      <div class="title">1.游戏内绑定手机号</div>
      <div class="bind-moblie">
        <div class="mobile">
          <input type="text" placeholder="请输入手机号" v-model.trim="phone" maxlength="11">
        </div>
        <div class="code">
          <input type="text" placeholder="请输入验证码" v-model.trim="code" maxlength="6">
          <div class="code-btn" @click="_getCode">{{countdownText}}</div>
        </div>
        <div class="btn" @click="_saveBinding">点击绑定</div>
      </div>
    </div>
    <div class="group" v-else>
      <div class="title1">
        <span>1.游戏内绑定手机号</span>
        <span class="reset" @click="reset">修改手机号 <i class="iconfont icon-next"></i></span>
      </div>
      <div class="bind-moblie">
        <div class="mobile">
          {{bindPhone}}
        </div>
      </div>
    </div>
    <div class="group">
      <div class="title">2.微信搜索并关注“坤瑞游戏”</div>
      <div class="step1">
        <img class="inner-img" src="./img/step1.png" alt="">
      </div>
      <div class="btn" 
        v-clipboard:copy="'坤瑞游戏'"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >点击复制“坤瑞游戏”</div>
    </div>
    <div class="group">
      <div class="title">3.公众号内选择“红包券兑换”</div>
      <div class="step2">
        <img class="inner-img" src="./img/step2.png" alt="">  
      </div>
    </div>
    <div class="group">
      <div class="title">4.输入手机号并点击绑定，绑定成功后返回游戏提现</div> 
      <div class="step3">
        <img class="inner-img" src="./img/step3.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { getPhoneCode, bindMobilePhone, getUserPhone } from '@/services/user'
import _get from 'lodash.get'
export default {
  nmae: 'withdrawCourse',
  data: () => ({
    bindPhone: '',
    phone:"",
    code:"",
    countdown: 60,
    countdownText: '获取验证码'
  }),
  methods: {
    onCopy () {
      this.$Toast('复制成功')
    },
    onError () {
      this.$Toast('复制失败')
    },
    /** 绑定手机号码 **/
    _saveBinding () {
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
      bindMobilePhone(this.phone,this.code).then(res => {
        const {code,data ,message} = _get(res, 'data')
        if(code===200){
            this.$Toast('绑定成功');
            this.modalShow = false;
            this.getUserInfo();
            this.$emit('on-success')
        }else{
            this.$Toast(message);
        }
      })
    },

    /** 获取短信验证吗 **/
    _getCode () {
      let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if(this.countdown !== 60){
          return ;
      }
      if(this.phone===""){
          this.$Toast('请输入手机号码');
          return 
      }
      if (!phoneReg.test(this.phone)) {
          this.$Toast("请输入正确的手机号码");
          return;
      }
      getPhoneCode(this.phone).then(res => {
        const {code,data,message} = _get(res, 'data')
        if(code===200){
            this.$Toast("短信验证码已发送，注意查收");
            this.countdownFn();
        }else{
            this.$Toast(message);
            clearInterval(this.time);
        }
      })
    },
    /** 验证码倒计时计算 **/
    countdownFn() {
      if (this.countdown === 0) {
          this.countdown = 60;
          this.code = "";
          clearTimeout(this.time);
          return false;
      } else {
          this.countdown--;
          if (this.countdown === 0) {
              this.countdownText = "重新获取";
          } else {
              this.countdownText = this.countdown + "s";
          }
          this.time = setTimeout(() => {
              this.countdownFn();
          }, 1000);
      }
    },
    /** 获取用户绑定的手机号 **/
    _getUserPhone () {
      getUserPhone().then( res => {
        this.bindPhone = _get(res, 'data.data', '')
      })
    },
    reset () {
      window.location.href = `https://wap.beeplaying.com/xmWap/#/personalCenter/editPhone?phone=${this.bindPhone}`
    }
  },
  mounted () {
    this._getUserPhone()
  }
}
</script>
<style lang="less" scoped>
.withdraw-course {
  overflow: hidden;
  padding: 1.2rem .3rem 0;
  min-height: 100vh;
  background: #FFE790;
  .group {
    margin-bottom: .2rem;
    padding: .3rem .2rem;
    background: #fff;
    border-radius: .3rem;
    .title {
      margin-bottom: .3rem;
      color: #000000;
      font-weight: bold;
    }
    .title1 {
      font-weight: bold;
      margin-bottom: .3rem;
      display: flex;
      justify-content: space-between;
      .reset {
        color: #ACACAC;
        font-size: .24rem;
        font-weight: normal;
      }
    }
    .bind-moblie {
      .mobile,.code {
        padding-left: .34rem;
        margin-bottom: .2rem;
        overflow: hidden;
        background: #F7F7F7;
        border-radius: .45rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: .9rem;
        input {
          flex: 1;
          height: .5rem;
          line-height: .5rem;
        }
      }
      .code {
        margin-bottom: .3rem;
        .code-btn {
          width: 1.85rem;
          height: .5rem;
          line-height: .5rem;
          text-align: center;
          color: #FF7800;
          border-left: 1px solid #DCDCDC;
        }
      }

    }
    .btn {
      margin: 0 auto;
      width: 2.8rem;
      height: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: bold;
      font-size: .26rem;
      color: #000;
      background: #FFCA00;
      border-radius: .45rem;
    }
    .step1{
      margin: 0 auto .3rem;
      width:4.4rem;
      height: 2.3rem;
    }
    .step2{
      margin: 0 auto;
      width: 3.12rem;
      height: 1.04rem;
    }
    .step3{
      margin: 0 auto;
      width: 4.78rem;
      height: 1.31rem;
    }
    
  }
}
</style>