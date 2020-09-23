<template>
  <div class="withdraw">
    <wf-header title="提现" />
    <div class="info">
      <div class="header">
        <div class="left" >
          我的金币<img src="./img/rule-icon.png" alt="" @click="openRule">
        </div>
        <div class="right" @click="goWithdrawLog">
          <img src="./img/coin-list.png" alt="">
          金币记录
        </div>
      </div>
      <div class="coin">
        <span>{{userCenter.currPoint }}</span>个
      </div>
      <div class="rmb">
        <span>≈{{userCenter.convertRmb }}</span>元
      </div>
      <div class="rule">
        <p>金币与现金兑换规则</p>
        <p>{{userCenter.rmbRatio}}个金币=1元</p>
      </div>
    </div>
    <!-- 提现方式 -->
    <withdraw-type :isBindWechat="isBindWechat" @wechatBindSuccess="wechatBindSuccess"/>
    <div class="withdraw-num">
      <div class="title">
        <span>
          <i>提现金额</i>
        </span>
      </div>
      <div class="list">
        <div class="item" 
          v-for="(item, index) in withdrawList"
          :key="index" 
          :class="{'active': currentIndex == index}" 
          @click="handleClick(index)"
        >
          <div class="icon" v-if="item.newUser">新人专享</div>
          <div class="rmb">
            <span>{{item.amount}}</span><em>元</em>
          </div>
          <div class="coin">
            <div class="coin-img">
              <img class="inner-img" src="./img/coin.png" alt="">
            </div>
            <div class="coin-num">{{item.coinNum}}个</div>
          </div>
        </div>
      </div>
    </div>
    <div class="explain">
      <div class="title">
        <span>
          <i>提现说明</i>
        </span>
      </div>
      <div class="text">
        1. 请务必绑定已实名认证的微信账号，以确保金额可直接到账。 一个微信号对应一个提现账号。<br>
        2. 提现申请将在1-3个工作日内审核，审核通过后即可到账， 可在提现记录中查看进度。<br>
        3. 每日可申请提现一次，若当日限额已满，请于次日申请。<br>
        4. 新人专享福利每个账号仅可享受一次。<br>
        5. 最终解释权归官方所有。
      </div>
    </div>
    <div class="withdraw-btn" @click="_userWithDraw">
      <div v-if="!isBindWechat" class="btn disable">请绑定微信</div>
      <div v-else-if="!canWithdraw" class="btn disable">金币不足</div>
      <div v-else class="btn" :class="{'disable': !canWithdraw}">立即提现</div>
    </div>
    <!-- rule 弹框 -->
    <modal v-model="showRule" title="说明" saveText="知道了" @on-save="saveCallback">
      <div class="rule-content">
        1. 金币汇率：10000金币=1元<br>
        2. 金币可通过完成任务、签到等方法获取<br>
        3. 当金币收益满3000时，可进行提现
      </div>
    </modal>
    <!-- 用户金币不够 -->
    <modal 
      v-model="showModal" 
      title="温馨提示" 
      saveText="去赚金币"
      @on-save="balanceCallback"
    >
      <div class="balance">
        未达到提现额度<br>
        快去赚金币吧
      </div>
    </modal>
  </div>
</template>
<script>
import WithdrawType from './components/withdrawType'
import { isBindGZH } from '@/services/user'
import { getWithdrawList, userWithDraw } from '@/services/withdraw'
import { mapActions, mapState } from 'vuex'
import _get from 'lodash.get'
export default {
  name: 'withdraw',
  data: () => ({
    isBind: false,
    showRule: false,
    withdrawList: [],
    currentIndex: 0,
    showModal: false
  }),
  components: {
    WithdrawType
  },
  computed: {
    ...mapState(['APP_VERSION', 'userCenter']),
    canWithdraw () {
      /** 绑定过手机号  并且金币足够才能提现 **/
      const accountCoin = _get(this.userCenter, 'currPoint', 0)
      const listCoin = _get(this.withdrawList[this.currentIndex], 'coinNum', 0)
      if(this.isBindWechat && accountCoin >= listCoin){
        return true
      }
      return false
    },
    /** 判断用户微信绑定的状态 **/
    isBindWechat () {
      if(this.APP_VERSION) {
        return this.userCenter.bindWechat
      } else {
        return this.isBind
      }
    }
  },
  methods: {
    ...mapActions({
      _getUserCenter: "GET_USER_CENTER"
    }),
    goWithdrawLog () {
      this.$router.push({
        name: 'withdrawLog'
      })
    },
    openRule () {
      this.showRule = true
    },
    saveCallback () {
      this.showRule = false
    },
    handleClick (index) {
      this.currentIndex = index
    },
    balanceCallback () {
      this.$router.push({
        name: 'task'
      })
    },
    /** 查看用户是否绑定过公众号 **/
    _isBindGZH () {
      isBindGZH().then( res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.isBind = data
        }
      })
    },
    /** 获取提现列表 **/
    _getWithdrawList () {
      getWithdrawList().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.withdrawList = data
        }
      })
    },
    /** 用户提现 **/
    _userWithDraw () {
      const accountCoin = _get(this.userCenter, 'currPoint', 0)
      const listCoin = _get(this.withdrawList[this.currentIndex], 'coinNum', 0)
      const { level } = this.withdrawList[this.currentIndex]
      /** 金币不足 **/
      if(accountCoin < listCoin) {
        this.showModal = true
        this.$marchSetsPoint('A_H5PT0303003647')
        return
      }
      /** 没有绑定公众号 **/
      if(!this.isBind) {
        this.$Toast('请先绑定微信账户')
        return
      }
      /** 点击锁 **/
      if(this.withdrawLock) return
      this.withdrawLock = true
      userWithDraw(level).then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          let text = this.APP_VERSION ? '申请已提交，将通过微信发放现金红包' : '申请已提交，将通过公众号发放现金红包'
          this.$Toast(text, () => {
            this._getUserCenter()
            this._getWithdrawList()
          })
          this.$marchSetsPoint('A_H5PT0303003646')
        }else {
          this.$Toast( message )
        }
        this.withdrawLock = false
      }).catch ( e => {
        this.$Toast('服务繁忙，请稍候重试')
        this.withdrawLock = false
      })
    },
    /** 绑定成功回调 **/
    wechatBindSuccess() {
      this._isBindGZH()
      this._getUserCenter()
    }
  },
  mounted () {
    this._isBindGZH()
    this._getUserCenter()
    this._getWithdrawList()
    this.$marchSetsPoint('A_H5PT0303003644')
  }
}
</script>
<style lang="less" scoped>
.withdraw {
  padding:.9rem 0 1.2rem;
  min-height: 100vh;
  background: url(./img/bg.png) no-repeat center .9rem #F2F2F2;
  background-size: 100% 4.74rem;
  .info {
    padding: .36rem .31rem 0;
    .header {
      margin-bottom: .12rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .42rem;
        font-weight: bold;
        color: #252525;
        img {
          margin-left: .12rem;
          width: .3rem;
          height: .3rem;
        }
      }
      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.8rem;
        height: .5rem;
        font-size: .26rem;
        font-weight: bold;
        color: #D39436;
        background: #FFCA00;
        border-radius: .35rem;
        img {
          margin-right: .12rem;
          width: .3rem;
          height: .3rem;
        }
      }
    }
    .coin,.rmb {
      margin-bottom: .2rem;
      padding: 0 .25rem;
      width: 6.6rem;
      height: .9rem;
      background: url(./img/item-bg.png) no-repeat center top;
      background-size: 100% 100%;
      display: flex;
      font-size: .2rem;
      color: #A26100;
      line-height: 1rem;
      span {
        line-height: .9rem;
        font-size: .48rem;
        font-weight: bold;
      }
    }
    .rmb {
      color: #E8382B;
    }
    .rule {
      margin-bottom: .8rem;
      color: #D39436;
      line-height: .36rem;
    }
  }

  .withdraw-num {
    .title {
      padding: 0 .31rem;
      margin-bottom: .14rem;
      display: flex;
      align-items: flex-end;
      span {
        margin-right: .2rem;
        position: relative;
        line-height: 1.2;
        &::after {
          content: '';
          position: absolute;
          bottom: .06rem;
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
    .list {
      padding: 0 .11rem .3rem .31rem;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .item {
        position: relative;
        overflow: hidden;
        margin: 0 .19rem .19rem 0;
        width: 1.5rem;
        height: 2rem;
        border-radius: .3rem;
        .icon {
          position: absolute;
          left: 50%;
          top: 0;
          z-index: 3;
          transform: translate(-50%, 0);
          width: .9rem;
          height: .3rem;
          line-height: .3rem;
          text-align: center;
          color: #fff;
          font-size: .2rem;
          white-space: nowrap;
          border-radius: 0 0 .15rem .15rem;
          background: #FF5E55;
        }
        .rmb {
          height: 1rem;
          text-align: center;
          background: #fff;
          span {
            line-height: 1.4rem;
            font-size: .42rem;
            color: #252525;
            font-weight: bold;
          }
          em {
            font-size: .2rem;
            color: #252525;
            font-style: normal;
          }
        }
        .coin {
          overflow: hidden;
          height: 1rem;
          background: #FFF9E1;
          .coin-img {
            margin: .1rem auto .04rem;
            width: .44rem;
            height: .44rem;
          }
          .coin-num {
            text-align: center;
            color: #D39436;
            font-weight: bold;
          }
        }
        &.active::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          z-index: 1;
          border: .03rem solid #FFCA00;
          border-radius: .3rem;
        }
      }
    }
  }
  .explain {
    padding: 0 .3rem;
    .title {
      margin-bottom: .14rem;
      display: flex;
      align-items: flex-end;
      span {
        margin-right: .2rem;
        position: relative;
        line-height: 1.2;
        &::after {
          content: '';
          position: absolute;
          bottom: .06rem;
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
    .text {
      color: #666666;
      line-height: .36rem;
    }
  }
  .withdraw-btn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    height: 1.1rem;
    background: #fff;
    .btn {
      margin: .15rem auto 0;
      width: 6.6rem;
      height: .8rem;
      line-height: .8rem;
      color: #000;
      font-size: .26rem;
      text-align: center;
      background: #FFCA00;
      border-radius: .4rem;
      font-weight:bold;
      &.disable {
        background: #DCDCDC;
        color: #fff;
      }
    }
  }
  .rule-content {
    line-height: .4rem;
    color: #000;
  }
  .balance {
    height: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    line-height: .5rem;
    color: #000000;
    display: flex;
  }
}
</style>