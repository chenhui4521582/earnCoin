<template>
  <div class="slider">
    <swiper v-if="showNotice" :options="options">
      <swiper-slide v-for="(item,index) in list" :key="index">
        用户{{item.nickname}}{{item.taskName}}获得{{item.awardsName}}
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
      height: 26,
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
  height: 26px;
  width: 3.7rem;
  background: rgba(0,0,0,.5);
  border-radius: .3rem;
  .swiper-slide {
    color: #fff;
    width: 100%;
    height: 26px;
    text-align: center;
    font-size: .22rem;
    white-space: nowrap;
    line-height: 26px;
    color: #FFFFFF;
  }
}
</style>