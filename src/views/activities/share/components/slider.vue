<template>
  <div class="slider">
    <swiper v-if="showNotice" :options="options">
      <swiper-slide v-for="(item,index) in list" :key="index">
        恭喜玩家{{item.nickname}}赚取{{item.awardsName}}
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'slider',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    options: {
      autoplay: {
        disableOnInteraction: false,
        delay: 2000
      },
      direction : 'vertical',
      loop: true,
      height: 23,
      spaceBetween : 10
    }
  }),
  components: {
    swiper, swiperSlide
  },
  computed: {
    showNotice () {
      return  this.list.length
    }
  }
}
</script>
<style scoped lang="less">
.slider {
  overflow: hidden;
  position: absolute;
  left: 50%;
  top: .25rem;
  z-index: 10;
  transform: translate(-50%, 0);
  height: 23px;
  width: 3.7rem;
  background: rgba(0,0,0,.5);
  border-radius: .3rem;
  .swiper-slide {
    color: #fff;
    width: 100%;
    height: 23px;
    text-align: center;
    font-size: .22rem;
    white-space: nowrap;
    line-height: 24px;
    color: #FFFFFF;
    font-weight: 500;
  }
}
</style>