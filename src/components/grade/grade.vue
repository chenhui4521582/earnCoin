<template>
  <div class="grade">
    <div class="star" v-for="(item, index) in starNum" :key="index">
      <img v-if="star < item && star > item-1" src="./img/star2-icon.png" alt="">
      <img v-else-if="star >= item" src="./img/star1-icon.png" alt="">
      <img v-else src="./img/star-icon.png" alt="">
    </div>
  </div>  
</template>
<script>
export default {
  name: 'grade',
  props: {
    star: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    starNum: 5
  })
}
</script>
<style lang="less" scoped>
.grade {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .star {
    margin-right: .05rem;
    width: .3rem;
    height: .3rem;
    &:last-child {
      margin-right: 0;
    }
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
  }
}
</style>