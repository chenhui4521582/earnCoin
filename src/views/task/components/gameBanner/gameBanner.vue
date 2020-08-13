<template>
  <div class="game-banner" v-if="showGameBanner">
    <!-- 正常状态 -->
    <template>
      <swiper :options="defaultOptions">
        <swiper-slide class="min-item" v-for="(item, index) in gameBannerImg" :key="index">
          <img class="inner-img" :src="item | filter" alt="">
        </swiper-slide>
      </swiper>
    </template>
    <!-- 全屏 -->
    <template>
      
    </template>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'gameBanner',
  props: {
    gameBannerImg: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    defaultOptions: {
      autoplay: {
        delay: 5000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
      },
      loop: true
    }
  }),
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    showGameBanner () {
      return this.gameBannerImg.length
    }
  }

}
</script>
<style lang="less" scoped>
.game-banner {
  overflow: hidden;
  padding: .2rem .3rem 0;
  height: 4.56rem;
  background: #fff;
  .min-item {
    width: 2.56rem;
    height: 4.56rem;
  }
}
</style>