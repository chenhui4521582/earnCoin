<template>
  <div class="download-page">
    <div class="wechat-tips">
      1.点击右上角“ ”按钮；<br>
      2.选择浏览器打开。
    </div>
    <div class="download-btn"></div>
  </div>
</template>
<script>
export default {
  name: 'downloadPage'
}
</script>
<style lang="less" scoped>
.download-page {
  height: 100vh;
  background: url(./img/download-bg.png) no-repeat center top;
  background-size: 100% auto;
  .wechat-tips {
    padding-top: .33rem;
    text-align: center;
    position: absolute;
    right: .1rem;
    top: .1rem;
    z-index: 5;
    width: 2.84rem;
    height: 1.16rem;
    background: url(./img/wechat-tips.png) no-repeat center top;
    background-size: 100% 100%;
  }
  .download-btn {
    position: absolute;
    left: 50%;
    bottom: .64rem;
    transform: translate(-50%, 0);
    z-index: 5;
    width: 5.86rem;
    height: 1.16rem;
    background: url(./img/download-btn.png) no-repeat center top;
    background-size: 100% 100%;
  }
}
</style>