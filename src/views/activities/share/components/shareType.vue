<template>
  <transition :name="pullup">
    <div class="share-type" v-if="value">
      <div class="item">
        <img class="inner-img" src="../img/wechat-icon.png" alt="">
      </div>
      <div class="item">
        <img class="inner-img" src="../img/wechat1-icon.png" alt="">
      </div>
      <div class="item">
        <img class="inner-img" src=".,./img/copy-icon.png" alt="">
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

</style>