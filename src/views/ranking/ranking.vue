<template>
  <div class="ranking" :style="{'background-image': `url(${background})`}">
    <wf-header title="赚金榜" />
    <div class="nav">
      <div class="item" v-for="(item, index) in nav" :key="index">
        {{item.name}}
      </div>
    </div>
    <div class="list"></div>
  </div>
</template>
<script>
import { getRankList, getRankTab } from '@/services/index'
import _get from 'lodash.get'
export default {
  name: 'ranking',
  data: () => ({
    iconList: {
      1: {
        titleImg: require('./img/ranking-title.png'),
        list: [require('./img/rank1-icon.png'), require('./img/rank2-icon.png'), require('./img/rank3-icon.png')]
      },
      2: {
        titleImg: require('./img/newgame-title.png'),
        list: [require('./img/newgame-icon1.png'), require('./img/newgame-icon2.png'), require('./img/newgame-icon3.png')]
      },
      3: {
        titleImg: require('./img/hot-title.png'),
        list: [require('./img/hot-icon1.png'), require('./img/hot-icon2.png'), require('./img/hot-icon3.png')]
      }
    },
    nav: [],
    list: []
  }),
  computed: {
    background () {
      return this.iconList[1].titleImg
    }
  },
  methods: {
    /** 获取列表数据 **/
    _getRankList () {
      getRankList().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.list = data
        }
      })
    },
    /** 获取列表tab **/
    _getRankTab () {
      getRankTab().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.nav = data
        }
      })
    },
    /** nav 点击**/
    navClick (index) {
      this.currentIndex = index
    },
    /** 初始化 **/
    init () {
      this._getRankTab()
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
.ranking {
  overflow: hidden;
  padding: .9rem .3rem;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-position: center .9rem;
  background-size: 100% 2.4rem;
  background-color: #fff;
  .nav {
    margin-top: 1.8rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    .item {
      margin-right: .3rem;
      font-size: .32rem;
      font-weight: bold;
      color: #252525;
    }
  }
}
</style>