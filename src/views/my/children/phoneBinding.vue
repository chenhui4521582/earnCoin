<template>
  <div class="phone-warp">
    <wf-header title="绑定手机号"/>
    <div class="phone-content" @click="goModifyPhone">
      <div class="phone-info">
        <div class="phone-text">{{queryPhone}}</div>
        <div class="phone-pit" >
          <span>修改绑定手机号码</span>
          <i class="iconfont icon-next"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name:"phoneBinding",
    data() {
      return {
        isPhoneBind:false,
        userPhoneInfo:{},
        show:false
      }
    },
    computed:{
      queryPhone(){
        return this.$route.query.phone
      }
    },
    methods:{
      // 打开手机操作
      goModifyPhone () {
        this.$router.push({
          name:"modifyPhone",
          query:{ 
            phone: this.queryPhone
          }
        })
      }
    }
}
</script>
<style lang="less" scoped>
.phone-warp{
  min-height: 100vh;
  background: #F2F2F2;
  padding-top: .94rem; 
  .phone-info{
    height: .9rem;
    line-height: .9rem;
    padding: 0 .24rem;
    display: flex;
    .phone-text{
      flex:1;
      font-size: .28rem;
      color: #000;
      font-weight: bold;
    }
    .phone-pit{
      width: 2.4rem;
      flex: 0 2.4rem;
      text-align: right;
      color: #888888;
      font-size: .24rem;
      i{
          font-size: .2rem;
          margin-left: .05rem;
      }
    }
  }
}
</style>


