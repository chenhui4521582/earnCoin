<template>
  <modal v-model="value" title="温馨提示" @on-close="closeCallback">
    <div class="service-content">
      <p>请添加客服QQ号（备注小游戏）</p>
      <p class="last">客服QQ：<span>1165407173</span></p>
    </div>
    <div class="copy-btn" slot="footer" 
      v-clipboard:copy="1165407173"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
    >复制QQ号</div>
  </modal>
</template>
<script>
export default {
  name: 'service',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onCopy () {
      this.$Toast('复制成功', () => {
        this.$emit('input', false)
      })
    },
    onError () {
      this.$Toast('复制失败', () => {
        this.$emit('input', false)
      })
    },
    closeCallback () {
      this.$emit('input', false)
    }
  }  
}
</script>
<style lang="less" scoped>
  .service-content {
    display: flex;
    height: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      margin-bottom: .3rem;
      span {
        color: #FF8000;
      }
    }
    .last {
      margin-bottom: 0;
    }
  }
  .copy-btn {
    margin: 0 auto;
    width: 2.4rem;
    height: .7rem;
    text-align: center;
    line-height: .7rem;
    background: #FFCA00;
    font-size: .26rem;
    font-weight: bold;
    border-radius: .35rem;
  }
</style>