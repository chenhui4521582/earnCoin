<template>
  <div class="no-data">
    <img src="./img/nodata.png" alt="">
    <p>{{text}}</p>
  </div>
</template>
<script>
export default {
  name: 'noData',
  props: {
    text: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>
<style lang="less" scoped>
.no-data {
  width: 100%;
  text-align: center;
  font-size: 0.28rem;
  color: #e0e3ec;
  img {
    vertical-align: top;
    width: 3.5rem;
    height: 2.7rem;
  }
}
</style>