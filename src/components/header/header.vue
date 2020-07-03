<template>
  <div class="header-wap" :style="{backgroundColor: bgColor}">
    <div class="return-img" @click="returnPage">
      <i class="iconfont icon-return"></i>
    </div>
    <slot>
      <div class="title">{{title}}</div>
    </slot>
  </div>
</template>
<script>
export default {
  name: "wf-header",
  props: {
    title: {
      type: String,
      default: ""
    },
    customize: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String,
      default: '#fff'
    }
  },
  data: () => ({

  }),
  methods: {
    returnPage () {
      if (this.customize) {
        this.$emit("on-click")
      } else {
        this.$router.go(-1)
        this.$emit("on-back")
      }
    }
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.header-wap {
  height: .9rem;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  box-sizing: border-box;
  padding: 0 .26rem;
  color: #000;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  .return-img {
    position: absolute;
    top: 0;
    left: .26rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 1rem;
    height: .9rem;
    box-sizing: border-box;
    z-index: 10;
    .iconfont {
      font-size: .27rem;
    }
  }
  .title {
    text-align: center;
    font-size: .34rem;
    font-weight: bold;
  }
}
</style>

