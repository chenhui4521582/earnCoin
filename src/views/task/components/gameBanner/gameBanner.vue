<template>
  <div class="game-banner" v-if="showGameBanner">
    <!-- 正常状态 -->
    <template v-if="bannerSwitch == 0" >
      <div class="min-wrap" @click="minHandleClick">
        <swiper :options="defaultOptions">
          <swiper-slide class="min-item" v-for="(item, index) in gameBannerImg" :key="index" >
            <img class="inner-img" :src="item | filter" alt="" :data="index">
          </swiper-slide>
        </swiper>
      </div>
    </template>
    <!-- 全屏 -->
    <template v-if="bannerSwitch == 1">
      <div class="max-swiper">
        <div class="mask" @click="maxHandleClick"></div>
        <div class="max-wrap" @click="maxHandleClick">
          <swiper :options="maxOptions">
            <swiper-slide class="max-item" v-for="(item, index) in gameBannerImg" :key="index">
              <img class="inner-img" :src="item | filter" alt="" :data="index">
            </swiper-slide>
          </swiper>
          <div class="swiper-pagination" slot="pagination"></div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'gameBanner',
  props: {
    gameBannerImg: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    bannerSwitch: 0,
    defaultOptions: {
      initialSlide: 0,
      slidesPerView: "auto"
    },
    maxOptions: {
      initialSlide: 0,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        clickable: true
      }
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
  },
  methods: {
    minHandleClick (e) {
      let index = e.target.getAttribute('data')
      this.maxOptions.initialSlide = index
      this.bannerSwitch = this.bannerSwitch == 0 ? 1 : 0
    },
    maxHandleClick (e) {
      let index = e.target.getAttribute('data')
      this.defaultOptions.initialSlide = index
      this.bannerSwitch = this.bannerSwitch == 0 ? 1 : 0
    },
  }
}
</script>
<style lang="less" scoped>
.game-banner {
  overflow: hidden;
  padding: .2rem .3rem 0;
  height: 4.56rem;
  background: #fff;
  box-sizing: content-box;
  .min-item {
    padding-right: .2rem;
    overflow: hidden;
    width: 2.56rem;
    height: 4.56rem;
    img {
      border-radius: .3rem;
    }
  }
}
.max-swiper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 15;
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(0,0,0,.8);
  }
  .max-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    width: 5.4rem;
    height: 9.6rem;
    transform: translate(-50%,-50%);
    .max-item {
      width: 5.4rem;
      height: 9.6rem;
      border-radius: .4rem;
      overflow: hidden;
    }
  }
}
.swiper-pagination {
  bottom: -20px;
  color: #fff;
}
</style>