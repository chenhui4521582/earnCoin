<template>
  <transition name="pullup">
    <div class="share-type" v-if="value">
      <div class="item">
        <img class="inner-img" src="../img/wechat-icon.png" alt="">
        <p>微信</p>
      </div>
      <div class="item">
        <img class="inner-img" src="../img/wechat1-icon.png" alt="">
        <p>朋友圈</p>
      </div>
      <div class="item">
        <img class="inner-img" src="../img/copy-icon.png" alt="">
        <p>复制链接</p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'shareType',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="less" scoped>
.share-type {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  height: 1.3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  // transform: translate(0, 1.3rem);
  transform: translate(0, 0);
  border-radius: .3rem .3rem 0 0;
  background: #fff;
  .item {
    width: .8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  p {
    font-size: .2rem;
    color: #353535;
    text-align: center;
    white-space: nowrap;
  }
}
</style>