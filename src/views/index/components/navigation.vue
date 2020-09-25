<template>
  <!-- navigation 走配置的 -->
  <div class="navigation">
    <div class="item" 
      v-for="(item, index) in iconList" 
      :key="index"
      @click="jump(item.link, index)"
    >
      <img v-if="item.img" :src="item.img | filter" class="inner-img" :class="{'animation': item.animation}" alt="" />
      <img v-if="item.image" :src="item.image" class="inner-img" :class="{'animation': item.animation}" alt="" />
      <p>{{item.name}}</p>
    </div>
  </div>
</template>
<script>
import { getIconList, getNewUserActive } from '@/services/index'
import _get from 'lodash.get'
export default {
  name: 'navigation',
  data: () => ({
    iconList: []
  }),
  methods: {
    /** 跳转 **/
    jump (url, index) {
      this.$marchSetsPoint('H5PT0303003628', {
        task_name: index
      })
      window.location.href = url
    },
    async init () {
      /** 获取iconList **/
      let iconListRes = await getIconList()
      let iconListData = _get(iconListRes, 'data.data', [])
      /** 获取活动信息 **/
      let newUserRes = await getNewUserActive()
      let newUserData = _get(newUserRes, 'data.data', {})
      /** 假如新手任务开启状态 **/
      if(newUserData.active) {
        let data = {
          animation: true,
          name: '新人福利',
          image: require('../img/navigation/img2.png'),
          link: '//wap.beeplaying.com/activities/earnCoinNewUser.html'
        }
        iconListData[1] = data
      }
      /** 假如砸蛋开启状态 **/
      if(newUserData.egg) {
        let data = {
          name: '砸金蛋',
          image: require('../img/navigation/img3.png'),
          link: '//wap.beeplaying.com/activities/duration.html'
        }
        iconListData[2] = data
      }
      if(!newUserData.active) {
        iconListData[0].animation = true
      }
      this.iconList = iconListData
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
  .navigation {
    margin: 0 0 0.57rem;
    display: flex;
    justify-content: flex-start;
    min-height: 1.81rem;
    .item {
      margin-right: 0.2rem;
      img {
        margin-bottom: 0.1rem;
        height: 1.4rem;
      }
      p {
        text-align: center;
        color: #000000;
      }
      .animation {
        animation: scale infinite 2s;
      }
      &:nth-child(1) {
        width: 2.6rem;
        flex-shrink: 0;
      }
      &:nth-child(2) {
        flex: 1;
      }
      &:nth-child(3) {
        flex: 1;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>