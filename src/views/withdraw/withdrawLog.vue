<template>
  <div class="withdraw-log">
    <wf-header title="记录" />
    <div class="tab-bar">
      <div class="item" :class="{'active': currentIndex == 1}" @click="handleClick(1)">金币记录</div>
      <div class="item" :class="{'active': currentIndex == 2}" @click="handleClick(2)">提现记录</div>
    </div>
    <!-- 金币记录 -->
    <div class="coin-list" v-if="currentIndex == 1">
      <div class="nav">
        <div class="item">时间</div>
        <div class="item">变动原因</div>
        <div class="item">变动额度</div>
      </div>
      <div class="list" v-if="log.length">
        <div class="item" v-for="(item, index) in log" :key="index">
          <div class="time">
            <p>{{item.createTime | formatTime('y-m-d')}}</p>
            <p>{{item.createTime | formatTime('h:m')}}</p>
          </div>
          <div class="num">{{item.remark}}</div>
          <div class="status">
            <!-- 增加 -->
            <div class="success" v-if="item.changeType == 1">+{{item.changeNum}}</div>
            <!-- 减少 -->
            <div class="error" v-if="item.changeType == -1">-{{item.changeNum}}</div>
          </div>
        </div>
      </div>
      <div class="no-data" v-else>
        <img class="inner-img" src="./img/no-data.png" alt="">
        <p>亲，暂无数据哦~</p>
      </div>
    </div>
    <!-- 提现记录 -->
   <div class="withdraw-list" v-if="currentIndex == 2">
      <div class="nav">
        <div class="item">提现时间</div>
        <div class="item">提现额度</div>
        <div class="item">提现状态</div>
      </div>
      <div class="list1" v-if="log.length">
        <div class="item" v-for="(item, index) in log" :key="index">
          <div class="time">
            <p>{{item.receiveTime | formatTime('y-m-d')}}</p>
            <p>{{item.receiveTime | formatTime('h:m')}}</p>
          </div>
          <div class="num">{{item.amount}}</div>
          <div class="status">
            <!-- 已到账 -->
            <div class="success" v-if="item.status == 2">已到账</div>
            <!-- 审核中 -->
            <div class="waiting" v-if="item.status == 1">审核中</div>
            <!-- 失败 -->
            <div class="error" v-if="item.status == 3">
              <p>发放失败</p>
              <p class="service" @click="openService">联系客服></p>
            </div>
            <!-- 金币已退还 -->
            <div class="back" v-if="item.status == 4">
              <p>发放失败</p>
              <p>金币已退还</p>
            </div>
          </div>
        </div>
      </div>
      <div class="no-data" v-else>
        <img class="inner-img" src="./img/no-data.png" alt="">
        <p>亲，暂无数据哦~</p>
      </div>
    </div>
    <!-- 客服 -->
    <Service v-model="showService"/>
  </div>
</template>
<script>
import Service from '@/components/servicePop/service'
import { getWithdrawLog, getCoinLog } from '@/services/withdraw'
import _get from 'lodash.get'
export default {
  name: 'withdrawLog',
  data: () => ({
    currentIndex: 1,
    log: [],
    showService: false
  }),
  components: {
    Service
  },
  methods: {
    handleClick (index) {
      this.currentIndex = index
      if(index == 1) {
        this._getCoinLog()
      } else {
        this._getWithdrawLog()
      }
    },
    openService () {
      this.showService = true
    },
    /** 获取提现记录 **/
    _getWithdrawLog () {
      getWithdrawLog().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.log = data
        }
      })
    },
    /** 获取金币记录 **/
    _getCoinLog () {
      getCoinLog({
        minId: 0,
        pageSize: 100
      }).then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.log = data
        }
      })
    },
    init() {
      this.handleClick(this.currentIndex)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
.withdraw-log {
  padding: 1.2rem .3rem 0;
  height: 100vh;
  background: #F2F2F2;
  .tab-bar {
    position: fixed;
    top: 1.2rem;
    left: .3rem;
    right: .3rem;
    height: .58rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    background: #E6E6E6;
    border-radius: .3rem .3rem 0 0;
    .item {
      flex-shrink: 0;
      width: 2.8rem;
      height: .58rem;
      line-height: .58rem;
      text-align: center;
      font-size: .22rem;
      color: #ACACAC;
      &.active {
        flex: 1;
        height: .7rem;
        line-height: .7rem;
        color: #D39436;
        background: #fff;
        font-size: .28rem;
        font-weight: bold;
        border-radius: .3rem .3rem 0 0;
      }
    }
  }
  .coin-list,.withdraw-list {
    position: fixed;
    top: 1.78rem;
    bottom: .58rem;
    left: .3rem;
    right: .3rem;
    background: #fff; 
    border-top: 1px solid #F2F2F2;
    border-radius: 0 0 .3rem .3rem;
    .nav {
      display: flex;
      justify-items: center;
      border-bottom: 1px solid #F2F2F2;
      .item {
        width: 33.33%;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        color: #ACACAC;
      }
    }
    .list,.list1 {
      position: absolute;
      top: .63rem;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .item {
        display: flex;
        justify-content: center;
        height: .9rem;
        border-bottom: 1px solid #F2F2F2;
        color: #000;
        .time {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 33%;
        }
        .num {
          width: 33%;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .status {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 33%;
          .success {
            color: #D39436;
          }
          .waiting {
            color: #5186CA;
          }
          .error {
            color: #E8382B;
            .service {
              font-size: .2rem;
            }
          }
          .back {
            text-align: center;
            color: #999;
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

}
</style>