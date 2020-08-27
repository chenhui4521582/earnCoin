<template>
  <div class="sign">
    <div class="wrapper">
      <div class="sign-header">
        <!-- 头部Icon -->
        <img src="../../img/sign/sign-icon.png" alt="" class="sign-icon">
        <!-- 头部文字 -->
        <div class="wrap">
          <div class="day">
            <i>已连续签到</i><span>{{ signEndDay }}</span><i>天</i><img src="../../img/sign/rule-icon.png" alt="" class="rule-icon" @click="openRule">
          </div>
          <div class="tips">
            连续签到7天额外获得 <span>1000个金币</span>
          </div>
  
        </div>
        <!-- 打开收起 -->
        <div class="toggle" :class="{'closed': signToggle }" @click="signToggleClick"></div>
      </div>
      <template v-if="signToggle">
        <ul>
          <li
            v-for="(item, index) in newList" 
            :class="[ item.day == currDay && isSign ? 'sign-curr' : {'sign-end': item.status == 1 , 'sign-no': item.status == 0}]"
            :key="index">
            <P class="s-time">第{{ item.day }}天</P>
            <!-- icon -->
            <div class="icon">
              <!-- 当天签到过的icon -->
              <img class="inner-img" src="../../img/sign/sign-curr.png" v-if="item.day == currDay && isSign"/>
              <!-- 签到过的icon -->
              <img class="inner-img" :src="item.showSignedIcon | filter"  v-else-if="item.status == 1"/>
              <!-- 没有签到的icon -->
              <img class="inner-img" :src="item.showIcon | filter" v-else-if="item.status == 0"/>
            </div>
            <!-- award -->
            <div class="award">+{{item.showName}}个</div>
          </li>
        </ul>
        <div class="sign-btn" :class="{gray: isSign}" @click="_sign">{{isSign ? '明天再来吧' : '签到领奖励'}}</div>
      </template>
      <!-- 奖品弹框 -->
      <Modal 
        v-model="showAward" 
        title="恭喜你获得"
        saveText="去赚更多"
        :type="2"
        @on-save="awardCallback"
      >
        <div class="award-item" v-for="(item, index) in award.awardsDesc" :key="index">
          <img v-if="item.awardIcon" :src="item.awardIcon | filter" class="award-img" />
          <p class="p1">金币 +{{ item.awardsNumDesc }}个<span>≈{{item.awardsNumDesc / 10000}}元</span> </p>
        </div>
        <p v-if="award.day == 7" class="p2">成功签到一周，下一周可获得 <span>{{allAward}}</span> 金币</p>
        <p v-else class="p2">明天再来，可以获得<span>{{nextAward}}</span>金币</p>
      </Modal>
      <!-- 规则弹框 -->
      <Modal v-model="showRule" title="说明" saveText="知道了" @on-save="ruleCallback">
        <div class="rule-content">
          1. 每天签到可获得一定金币，若连续签到<br>
          断开，则从第一天开始重新记录。<br>
          2. 连续签到天数越多奖励越高，每签满7天<br>
          都可额外获得2000个金币。<br>
          3. 签到发放金币至【我的金币】，可在金<br>
          币记录中查看。
        </div>  
      </Modal>
    </div>
  </div>
</template>
<script type="text/javascript">
import { getSignList, sign, getTodaySign } from '@/services/task'
import { jumpUrl, getUrlParams, newUtils } from '@/utils/utils'
import _get from 'lodash.get'

export default {
  name: 'sign',
  data: () => ({
    newList: [],
    isSign: false,
    isCurDaySign: false,
    signToggle: true,
    showAward: false,
    award: [],
    showRule: false
  }),
  computed: {
    signEndDay () {
      let signEndDay = this.newList && this.newList.filter(item => {
          return item.status == 1
        }).length
      return signEndDay
    },
    currDay () {
      if(this.isSign) {
        return this.signEndDay
      }
      return this.signEndDay + 1
    },
    is7Day () {
      return this.currDay == 7
    },
    nextAward () {
      if(this.award.day == 7) {
        let award = 0
        this.award.awardsDesc && this.award.awardsDesc.forEach(item => {
          award += ~~item.awardsNumDesc
        })
        return award
      }
      if(this.award.day == 6) {
        let award = _get(this.newList[this.award.day], 'showName', 0)
        return ~~award + 1000
      }
      return _get(this.newList[this.award.day], 'showName', 0)
    },
    allAward () {
      let award = 1000
      this.newList.forEach(item => {
        award += ~~item.showName
      })
      return award
    }
  },
  methods: {
    _getSignList () {
      getSignList().then(res => {
        const {code, data, message} = _get(res, 'data')
        if (code == 200) {
          this.newList = data
        }
      })
    },
    _getTodaySign () {
      getTodaySign().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.isSign = _get(res, 'data.data.haveSignedIn', false)
          if(this.isSign) {
            this.signToggle = false
          }
        }
      })
    },
    _sign () {
      // if(this.isSign) return
      sign().then( res => {
        // res = {
        //   "data":{
        //     "code":200,
        //     "data":{
        //       "showName":"3500",
        //       "showIcon":"/group1/M00/42/80/CmcEHF7-1WiAYErIAAAJIlg5cTY122.png",
        //       "showSignedIcon":"/group1/M00/43/66/CmcEHV7-1g6AVVD6AAAH4-9fIkc580.png",
        //       "day":7,
        //       "status":1,
        //       "awardsType":null,
        //       "awardsName":"3500+2000",
        //       "awardsDesc":[
        //         {"awardIcon":"/group1/M00/42/81/CmcEHF8D65-AUDFwAAAp4GWqT7s687.png","awardsNumDesc":"3500","awardsType":"1"},
        //       ],
        //         "balance":0},
        //       "message":null},
        // }
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.showAward = true
          this.award = data
          if(this.award.day == 7) {
            // let num = 0
            // this.award.awardsDesc.forEach(element => {
            //   num +=  Number(element.awardsNumD  esc)
            // });
            // this.award.awardsDesc.length = 1
            this.award.awardsDesc[1].awardIcon = null
          }
          this.isSign = true
          this._getSignList()
        }else {
          this.$Toast( message )
        }
      })
      this.$marchSetsPoint('A_H5PT0303003636')
    },
    openRule () {
      this.showRule = true
    },
    ruleCallback () {
      this.showRule = false
    },
    awardCallback () {
      this.showAward = false
      /** 重新拉取数据 **/
      this._getSignList()
    },
    goIndex () {
      this.$marchSetsPoint('A_H5PT0022001316')
      this.$router.push({ path: '/' })
    },
    signToggleClick () {  
      this.signToggle = !this.signToggle
      if (this.signToggle === false) {
        this.$marchSetsPoint('A_H5PT0022001686')
      } else {
        this.$marchSetsPoint('A_H5PT0022001687')
      }
    },
    init () {
      this._getTodaySign()
      this._getSignList()
    }
  },
  created () {
    this.init()
  },
  watch: {
    showDialog (value) {
      if (value) {
        newUtils.ScrollNoMove()
      } else {
        newUtils.ScrollMove()
      }
    }
  }
}
</script>
<style lang="less" scoped>

.sign {
  overflow: hidden;
  margin: 0 .3rem .5rem;
  border-radius: .3rem;
  background: #fff;
  .wrapper {
    padding: .24rem .3rem .29rem;
    .sign-header {
      display: flex;
      justify-content: flex-start;
      .sign-icon {
        margin-right: .2rem;
        width: .76rem;
        height: .77rem;
      }
      .wrap {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .day {
          display: flex;
          align-items: flex-end;
          white-space: nowrap;
          font-size: .28rem;
          color: #000000;
          font-weight: bold;
          height: .32rem;
          span {
            font-size: .48rem;
            color: #E8382B;
            line-height: .4rem;
          }
          i {
            line-height: .32rem;
            font-style: normal;
          }
          .rule-icon {
            margin-left: .15rem;
            width: .3rem;
            height: .3rem;
          }
        }
        .tips {
          font-size: .24rem;
          color: #000000;
          span {
            color: #FF8000;
          }
        }
      }
      .toggle {
        margin-left: auto;
        width: .30rem;
        height: .30rem;
        transition: all 0.3s;
        background: url('../../img/sign/toggle.png') no-repeat center center;
        background-size: 100% 100%;
        &.closed {
          transform: rotate(180deg);
        }
      }
    }
    ul {
      margin-top: .3rem;
      padding-bottom: .1rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    li {
      overflow: hidden;
      margin-bottom: .2rem;
      width: 1.35rem;
      height: 1.5rem;
      background: #FFF7DA;
      border-radius: .12rem;
      .s-time {
        display: block;
        height: .44rem;
        line-height: .44rem;
        text-align: center;
        font-size: .24rem;
      }
      .icon {
        margin: .16rem auto .08rem;
        width: .44rem;
        height: .44rem;
      }
      .award {
        text-align: center;
        font-weight: bold;
      }
      &:nth-child(2) {
        .icon {
          margin: .14rem auto .08rem;
          width: .56rem;
          height: .53rem;
        }
      }
      &:nth-child(5) {
        .icon {
          margin: .14rem auto .08rem;
          width: .56rem;
          height: .53rem;
        }
      }
      &:last-child {
        position: relative;
        width: 2.9rem;
        .icon {
          position: absolute;
          margin: 0;
          right: .28rem;
          top: .54rem;
          width: 1.16rem;
          height: .94rem;
        }
        .award {
          margin-top: .68rem;
          padding-left: .27rem;
          text-align: left;
        }
      }
      &.sign-end {
        background: #F0F0F0;
        .s-time {
          color: #ACACAC;
          background: #DCDCDC;
        }
        .award {
          color: #ACACAC;
        }
      }
      &.sign-curr {
        background: #FFCA00;
        .s-time {
          color: #D39436;
          background: #FFE790;
        }
        .award {
          color: #E8382B;
        }
      }
      &.sign-no {
        background: #FFF7DA;
        .s-time {
          color: #E7BD69;
          background: #FFEFB7;
        }
        .award {
          color: #D39436;
        }
      }
    }
    li.active {
      .box {
        .sign-icon {
          background: #ff4141;
          .icon {
            animation: fadeout 0.4s forwards;
          }
        }

        .signed-icon {
          .icon {
            animation: fadein 0.6s ease-out;
          }
        }
        .line {
          .inline {
            transition: all 1s;
          }
        }
      }
    }
    .btn-sign-container {
      position: absolute;
      top: 100px;
      right: 30px;
      text-align: center;
      z-index: 11;
      .btn {
        min-width: 160px;
        display: inline-block;
        padding: 0 23px;
        height: 54px;
        line-height: 54px;
        background: rgba(238, 111, 11, 1);
        border-radius: 3px;
        font-size: 24px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        &.btn-gray {
          background: #4e5666;
          color: #0f1726;
        }
      }
      &.hide {
        visibility: hidden;
      }
    }
    .sign-btn {
      margin: 0 auto;
      width: 2.8rem;
      height: .8rem;
      text-align: center;
      line-height: .8rem;
      font-size: .26rem;
      color: #000;
      font-weight: bold;
      background: #FFCA00;
      border-radius: .4rem;
      &.gray {
        background: #DCDCDC;
        color: #FFFFFF;
      }
    }
  }
  .remove-wrap {
    img {
      width: 256px;
      height: 160px;
      display: block;
      margin: 0 auto;
    }
    div {
      text-align: center;
      margin: 16px 0 0;
      color: #bbb;
      font-size: 20px;
      line-height: 30px;
    }
  }

}

.scalc-enter-active {
  animation: fadeAnimation 0.3s ease-in-out;
}
@keyframes fadeout {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes fadein {
  0% {
    transform: scale(0);
  }
  33% {
    transform: scale(1);
  }
  66% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes fadeAnimation {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.award-item {
  margin-bottom: .1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    margin: 0 auto .15rem;
    width: 1.34rem;
  }
}
.p1 {
  text-align: center;
  font-size: .24rem;
  font-weight: bold;
  color: #D39436;
  span {
    color: #E8382B;
  }
}
.p2 {
  text-align: center;
  color: #000000;
  font-size: .24rem;
  span {
    color: #D39436;
  }
}
.rule-content {
  line-height: .42rem;
  color: #000000;
}
</style>
