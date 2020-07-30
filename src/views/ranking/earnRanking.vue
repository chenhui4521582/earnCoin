<template>
  <div class="ranking">
    <wf-header title="高额赚" />
    <div class="title">
      <span>
        <i>赚钱排行</i>
      </span>
      <em>每日赚钱榜（24:00更新）</em>
    </div>
    <div class="nav">
      <div class="item">排名</div>
      <div class="item">用户昵称</div>
      <div class="item">累计已赚</div>
      <div class="item">当天已赚</div>
    </div>
    <div class="list" v-if="showRank">
      <div class="items" v-for="(item, index) in yesterdayRank" :key="index">
        <div class="item">
          <img v-if="item.rank == 1" src="./img/rank1-icon.png" alt="">
          <img v-else-if="item.rank == 2" src="./img/rank2-icon.png" alt="">
          <img v-else-if="item.rank == 3" src="./img/rank3-icon.png" alt="">
          <span v-else>{{item.rank}}</span>
        </div>
        <div class="item">{{item.nickName}}</div>
        <div class="item">{{item.totalNum}}</div>
        <div class="item">{{item.rankNum}}</div>
      </div>
    </div>
    <div class="no-data" v-else>
      <img class="inner-img" src="./img/no-data.png" alt="">
      <p>亲，暂无数据哦~</p>
    </div>
  </div>
</template>
<script>
import { getYesterdayRank } from '@/services/index'
import _get from 'lodash.get'
export default {
  name: 'earnRanking',
  data: () => ({
    yesterdayRank: [],
  }),
  computed: {
    showRank () {
      return this.yesterdayRank.length
    }
  },
  methods: {
    _getYesterdayRank () {
      getYesterdayRank().then(res => {
        const {code, data, message} = _get(res,'data')
        if(code == 200) {
          this.yesterdayRank = data
        }
      })
    }
  },
  mounted () {
    this._getYesterdayRank()
  }
}
</script>
<style lang="less" scoped>
.ranking {
  min-height: 100vh;
  background: #F2F2F2;
  padding: 1.1rem .3rem 0;
  .title {
    display: flex;
    align-items: flex-end;
    span {
      position: relative;
      margin-right: .2rem;
      &::after {
        content: '';
        position: absolute;
        bottom: .08rem;
        left: 0;
        z-index: 1;
        height: .1rem;
        width: 100%;
        background: #FFC300;
      }
      i {
        position: relative;
        z-index: 2;
        font-size: .42rem;
        font-style: normal;
        color: #000;
        font-weight: bold;
      }
    }
    em {
      font-style: normal;
      color: #666;
    }
  }
  .nav,.items {
    display: flex;
    justify-content: center;
  }
  .nav {
    position: fixed;
    left: .24rem;
    right: .24rem;
    top: 1.8rem;
    background: #fff;
    border-bottom: 1px solid #F2F2F2;
    border-radius: .3rem .3rem 0 0;
    .item {
      height: .6rem;
      line-height: .6rem;
      text-align: center;
      font-size: .24rem;
      color: #ACACAC;
      font-weight:bold;
      &:nth-child(1) {
        width: 20%;
      }
      &:nth-child(2) {
        width: 27%;
      }
      &:nth-child(3) {
        width: 27%;
      }
      &:nth-child(4) {
        width: 27%;
      }
    }
  }
  .list {
    position: fixed;
    left: .24rem;
    right: .24rem;
    bottom: .9rem;
    top: 2.4rem;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    background: #fff;
    border-radius: 0 0 .3rem .3rem;
    .items {
      border-bottom: 1px solid #F2F2F2;
      .item {
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        justify-content: center;
        align-items: center;
        height: .9rem;
        font-size: .24rem;
        color: #000000;
        img {
          width: .38rem;
          height: .38rem;
        }
        &:nth-child(1) {
          width: 20%;
        }
        &:nth-child(2) {
          width: 27%;
        }
        &:nth-child(3) {
          width: 27%;
        }
        &:nth-child(4) {
          width: 27%;
        }
      }
    }
  }
  .no-data {
    margin: 1.6rem auto;
    width: 2.5rem;
    height: 1.88rem;
    p {
      margin-top: .13rem;
      white-space: nowrap;
      font-size: .2rem;
      color: #E7BD69;
      text-align: center;
    }
  }
}
</style>