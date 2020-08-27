<template>
  <div class="rank-info" v-if="showList" :style="{'background-image': `url(${iconList[infoType].titleImg})`}">
    <div class="header">
      <div class="title">{{info.name}}</div>
      <div class="more" @click="goRanking(info)">
        <span>更多</span>
        <img src="../img/more-icon.png" alt="">
        <img src="../img/more-icon.png" alt="">
      </div>
    </div>
    <div class="list" v-for="(item, index) in info.list" :key="index"  @click="goDetail(item)">
      <div class="wrap">
        <div class="rank">
          {{index + 1}}
        </div>
        <div class="icon">
          <img class="inner-img" :src="item.gameIcon | filter" alt="">
        </div>
        <div class="text">
          <div class="name">{{item.name}}</div>
          <div class="desc">{{item.recommendRemark}} <span v-if="info.type == 1">得{{item.award}}元</span> </div>
        </div>
        <div class="btn">去看看</div>
      </div>
      <div class="game-banner" v-if="item.gameBanner">
        <img class="inner-img" :src="item.gameBanner | filter" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import _get from 'lodash.get'
export default {
  name: 'rankInfo',  
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    iconList: {
      1: {
        titleImg: require('../img/ranking-title.png'),
      },
      2: {
        titleImg: require('../img/newgame-title.png'),
      },
      3: {
        titleImg: require('../img/hot-title.png'),
      }
    }
  }),
  computed: {
    showList () {
      let list = _get(this.info, 'list', [])
      return list.length
    },
    infoType () {
      return _get(this.info, 'type' , 0)
    }
  },
  methods: {
    goDetail ({ id }) {
      this.$router.push({
        name: 'taskDetail',
        query: { id }
      })
      this.$marchSetsPoint('A_H5PT0303003786')
    },
    goRanking ({ type }) {
      localStorage.setItem('rankingCurrent', type)
      this.$router.push({
        name: 'ranking'
      })
      switch (type) {
        case 1: 
          this.$marchSetsPoint('A_H5PT0303003859')
          break
        case 2: 
          this.$marchSetsPoint('A_H5PT0303003860')
          break
        case 3: 
          this.$marchSetsPoint('A_H5PT0303003861')
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .rank-info {
    overflow: hidden;
    margin-bottom: .2rem;
    width: 6.6rem;
    border-radius: .3rem;
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 100% auto;
    background-color: #fff;
    .header {
      padding: 0 .2rem .17rem;
      margin-bottom: .2rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      height: 1rem;
      .title {
        font-size: .42rem;
        color: #000;
        font-weight:800;
      }
      .more {
        display: flex;  
        justify-content: center;
        align-items: center;
        width: 1.3rem;
        height: .5rem;
        background: #FF7800;
        border-radius: .35rem;
        span{
          font-size: .26rem;
          color: #FFFFFF;
          font-weight: bold;
        }
        img {
          width: .116rem;
          height: .2rem;
        }
      }
    }
    .list {
      overflow: hidden;
      margin-bottom: .4rem;
      padding-right: .2rem;
      .wrap {
        margin-bottom: .2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .rank {
          flex-shrink: 0;
          width: .6rem;
          text-align: center;
        }
        .icon {
          margin-right: .2rem;
          flex-shrink: 0;
          width: .8rem;
          height: .8rem;
        }
        .text {
          overflow: hidden;
          display: flex;
          justify-content: center;
          flex-direction: column;
          .name {
            font-size: .28rem;
            font-weight: bold;
          }
          .desc {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: .4rem;
            color: #666666;
            font-size: .24rem;
            span {
              color: #FF7800;
              font-weight:bold;
            }
          }
        }
        .btn {
          flex-shrink: 0;
          margin-left: auto;
          width: 1.3rem;
          height: .5rem;
          font-size: .26rem;
          font-weight: bold;
          line-height: .52rem;
          text-align: center;
          background: #FFCA00;
          border-radius: .4rem;
        }
      }
      .game-banner {
        margin-left:.6rem;
        width: 5.8rem;
        height: 1.5rem;
      }
    }
  }
</style>