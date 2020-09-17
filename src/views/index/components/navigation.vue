<template>
  <!-- navigation 走配置的 -->
  <div class="navigation">
    <template v-if="showNewUserActive == 1">
      <div class="item" 
        v-for="(item, index) in iconList" 
        :key="index"
        @click="jump(item.link, index)"
      >
        <img :src="item.img | filter" class="inner-img" :class="{'animation': index == 0}" alt="" />
        <p>{{item.name}}</p>
      </div>
    </template>
    <template v-if="showNewUserActive == 2">
      <div class="item" @click="goTask">
        <img src="../img/navigation/img1.png" alt="" class="inner-img">
        <p>高额赚</p>
      </div>
      <div class="item" @click="goNewUserActive">
        <img src="../img/navigation/img2.png" alt="" class="inner-img animation">
        <p>新人福利</p>
      </div>
      <div class="item" @click="goDutaionActive">
        <img src="../img/navigation/img3.png" alt="" class="inner-img">
        <p>砸金蛋</p>
      </div>
    </template>
  </div>
</template>
<script>
import { getIconList, getNewUserActive } from '@/services/index'
import _get from 'lodash.get'
export default {
  name: 'navigation',
  data: () => ({
    iconList: [],
    showNewUserActive: 0
  }),
  methods: {
    /** 获取iconList **/
    _getIconList () {
      getIconList().then(res => {
        const { code, data, message } = _get(res, 'data')
        if (code == 200) {
          this.iconList = data
        }
      })
    },
    /** 跳转 **/
    jump (url, index) {
      this.$marchSetsPoint('H5PT0303003628', {
        task_name: index
      })
      window.location.href = url
    },
    init () {
      getNewUserActive().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          if(data) {
            this.showNewUserActive = 1
          }else {
            this.showNewUserActive = 2
            this._getIconList()
          }
        }
      })
    },
    goTask () {
      window.location.href = `https://wap.beeplaying.com/earnCoin/#/task`
    },
    goDutaionActive () {
      window.location.href = 'https://wap.beeplaying.com/activities/duration.html'
    },
    goNewUserActive () {
      window.location.href = '//wap.beeplaying.com/activities/earnCoinNewUser.html'
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