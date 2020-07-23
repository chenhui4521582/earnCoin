<template>
  <div class="ranking" :style="{'background-image': `url(${background})`}">
    <wf-header title="赚金榜" />
    <div class="nav">
      <div 
        class="item" 
        v-for="(item, index) in nav" 
        ref="navItem"
        :key="index" 
        :class="{'active': currentIndex == item.type}"
        @click="navClick(item, index)"
      >
        <i>{{item.name}}</i>
      </div>
      <div class="line" ref="navLine"></div>
    </div>
    <div class="list" :class="{'animation': animation}">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="ranking-num">
          <img :src="iconList[currentIndex].list[index]" alt="">
        </div>
        <div class="item-img">
          <img class="inner-img" :src="item.gameIcon | filter" alt="">
        </div>
        <div class="text">
          <div class="name">{{item.name}}</div>
          <div class="desc">{{item.recommendRemark}}</div>
        </div>
        <div class="wrap"> 
          <div class="earn-Num">+{{item.award}}</div>
          <div class="btn">试玩</div>
        </div>
      </div>
    </div>
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
    currentIndex: 1,
    nav: [],
    list: [],
    animation: false
  }),
  computed: {
    background () {
      return this.iconList[this.currentIndex].titleImg
    }
  },
  methods: {
    /** 获取列表数据 **/
    _getRankList (type) {
      getRankList(type).then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.list = _get(data[0], 'list', [])
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
    navClick ({ type }, index) {
      this.currentIndex = type
      this._getRankList(type)
      this.navAnimation(index)
      switch (type) {
        case 1: 
          this.$marchSetsPoint('A_H5PT0303003782')
          break
        case 2: 
          this.$marchSetsPoint('A_H5PT0303003783')
          break
        case 3: 
          this.$marchSetsPoint('A_H5PT0303003784')
          break
      }
    },
    navAnimation (index) {
      let navItem = this.$refs.navItem
      let navLine = this.$refs.navLine
      navLine.style.left = (navItem[0].offsetWidth) * index + 'px'
    },
    /** 初始化 **/
    init () {
      let {type} = this.$route.query
      if(type) {
        setTimeout(() => {
          this.currentIndex = type
          this.navClick({type}, type-1)
        }, 500)
      }
      this._getRankTab()
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    list: {
      handler (value) {
        this.animation = true
        setTimeout( () => {
          this.animation = false
        }, 500)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
.ranking {
  transition: background .5s;
  overflow: hidden;
  padding: .9rem .3rem;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-position: center .9rem;
  background-size: 100% 2.4rem;
  background-color: #F2F2F2;
  .nav {
    position: relative;
    margin: 1.8rem 0 .2rem;
    display: flex;
    justify-content: flex-start;
    .item {
      position: relative;
      width: 1rem;
      text-align: center;
      height: .57rem;
      line-height: .6rem;
      i {
        font-size: .32rem;
        font-style: normal;
        color: #000;
        font-weight: bold;
      }
    }
    .line {
      position: absolute;
      bottom: .08rem;
      left: 0;
      z-index: 1;
      width: 1rem;
      height: .1rem;
      background: #FFC300;
      transition: left .2s;
    }
    .active {
      line-height: .55rem;
      i {
        transition: all .1s;
        position: relative;
        z-index: 2;
        font-size: .42rem;
        font-style: normal;
        color: #000;
        font-weight: bold;
      }
    }
  }
  .list {
    &.animation {
      animation: scale .5s 1;
    }
    .item {
      margin-bottom: .2rem;
      padding: 0 .2rem 0 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 1.2rem;
      background: #fff;
      border-radius: .3rem;
      .ranking-num {
        flex-shrink: 0;
        width: .7rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          vertical-align: top;
          width: .38rem;
          height: .38rem;
        }
      }
      .item-img {
        flex-shrink: 0;
        margin-right: .2rem;
        width: .8rem;
        height: .8rem;
      }
      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name {
          margin-bottom: .1rem;
          color: #000000;
        }
        .desc {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 2.9rem;
          height: .4rem;
          color: #ACACAC;
        }
      }
      .wrap {
        margin-left: auto;
        display: flex;
        flex-direction: column;
        .earn-Num {
          padding-right: .15rem;
          text-align: right;
          color: #E8382B;
          font-weight: bold;
        }
        .btn {
          flex-shrink: 0;
          width: 1.5rem;
          height: .5rem;
          background: #FFCA00;
          border-radius: .4rem;
          text-align: center;
          line-height: .5rem;
          color: #000000;
          font-size: .26rem;
          font-weight: bold;
        }
      }
    }
  }
  @keyframes scale {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>