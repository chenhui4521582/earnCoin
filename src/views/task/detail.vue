<template>
  <div class="task-detail">
    <wf-header title="任务详情" />
    <div class="task-info">
      <div class="task-img">
        <img class="inner-img" :src="taskDetail.icon | filter" alt="">
      </div>
      <div class="info">
        <div class="name">{{taskDetail.name}}</div>
        <div class="platform">{{taskDetail.gameVersion}}</div>
        <div class="text">{{taskDetail.gameRemark}}</div>
      </div>
    </div>
    <div class="task-status">
      <div class="status red" v-if="taskDetail.status == 2">任务未开始</div>
      <div class="status gray" v-if="taskDetail.status == 1">任务已完成</div>
      <div class="status yellow" v-if="taskDetail.status == 0">任务已开始</div>
      <div class="refresh" ref="refreshBtn" @click="refershTask"><img class="inner-img" src="./img/refresh.png" alt=""></div>
      <div class="total">全部任务完成后<span>+{{taskDetail.award}}</span><span class="unit">元</span></div>
    </div>
    <!-- 游戏banner -->
    <game-banner :gameBannerImg="gameBannerImg"/>
    <div class="task-desc" :class="{'active': pullDown}">
      <div class="wrap" v-html="remark" ref="box"></div>
      <div class="count-wrap" ref="wrap" v-html="remark"></div>
      <div class="open" v-if="pullDownBtn" @click="openPullDown">
      </div>
    </div>
    <div class="task-list">
      <div class="nav">
        <div class="item" 
          v-for="(item, index) in taskNav" :key="index"
          :style="[currentIndex == index && activeStyle]"
          @click="handClick(index, item)"
        >
          {{item.name}}
          <div class="line" v-if="index != currentIndex"></div>
        </div>
      </div>
      <div class="list" v-if="taskList.length">
        <!-- 任务列表 -->
        <template v-if="taskNav[currentIndex].value != 3">
          <div class="items" v-for="(item, index) in taskList" :key="index">
            <div class="rank">{{index + 1}}</div>
            <div class="desc">
              <div class="name">
                <div class="img">
                  <img class="inner-img" src="./img/coin-icon.png" alt="">
                </div>
                <div class="prize">+{{item.award}}金币</div>
                <div class="rmb">≈{{item.awardR}}元</div>
              </div>
              <div class="task-text">{{item.remark}}</div>
            </div>
            <div class="right">
              <div class="btn yellow2" v-if="item.status == 2" @click="_userIsVisitor(item)">领奖励</div>
              <div class="btn gray" v-if="item.status == 1">已完成</div>
              <div class="btn yellow" v-if="item.status == 0" @click="listItemClick">去完成</div>
              <div class="progress" v-if="item.userFinish || item.configFinish">当前进度：{{item.userFinish | amountComputen1}}/{{item.configFinish | amountComputen2}}</div>
            </div>
          </div>
        </template>
        <!-- 礼包列表 -->
        <template v-else>
          <div class="card-items" v-for="(item, index) in taskList" :key="index">
            <div class="card-id">{{index + 1}}</div>
            <div class="desc">
              <div class="card-name">{{item.batchName}}</div>
              <div class="card-content">{{item.content}}</div>
              <div class="card-explain">剩余:&nbsp;{{item.type == 1 ? '充足' :  item.num}}&nbsp;&nbsp;&nbsp;过期时间：{{item.expiredTime}}</div>
            </div>
            <div class="btn" v-if="item.status == 0" @click="_getCard(item)">免费领取</div>
            <div class="btn active" v-if="item.status == 1" @click="openCodeModal(item)">查看兑换码</div>
            <div class="btn gray" v-if="item.status == 2">已领完</div>
          </div>
        </template>
      </div>
      <div class="no-data" v-else>
        <div class="content">
          <img class="inner-img" src="./img/no-data.png" alt="">
          <p>亲，暂无数据哦~</p>
        </div>
      </div>
      <div class="download" v-if="showResetDownLoad" @click="resetDownload">如安装包下载失败，点此<span>重新下载</span></div>
    </div>
    <div class="task-footer">
      <div class="service-btn" @click="openService">
        <img src="./img/service-icon.png" alt="">
        <span>联系客服</span>
      </div>
      <div class="task-btn yellow1" v-if="taskDetail.status == 2" @click="startTaskConfirm">开始任务</div>
      <div class="task-btn continue" v-if="taskDetail.status == 1" @click="taskUnderway">去玩游戏</div>
      <div class="task-btn yellow" v-if="taskDetail.status == 0 && taskDetail.gameType == 2" @click="taskUnderway">任务进行中</div>
      <div class="task-btn red" v-if="taskDetail.status == 0 && taskDetail.gameType == 1" @click="resetDownload">如安装包下载失败，点此重新下载</div>
    </div>
    <!-- 客服弹框 -->
    <Service v-model="showService" />
    <!-- 新手引导 -->
    <user-guide />
    <!-- 领取奖励 -->
    <modal v-model="showAward" title="恭喜你获得" saveText="去赚更多" :type="4" @on-save="awardCallback">
      <div class="award-content">
        <img src="./img/big-coin.png" alt="">
        <p class="p1">金币 +{{award.award}}个</p>
        <p v-if="award.balance == 0" class="p2">可以提现了，快去提现吧！</p>
        <p v-else class="p2">再赚{{ award.balance }}金币马上提现</p>
      </div>
    </modal>
    <!-- 开始APP任务询问 -->
    <modal v-model="showApptaskConfirm" title="温馨提示" saveText="知道了" @on-save="_startTask">
      <div class="confirm-content">
        应用开始下载，请及时关注下载进度。<br><br>
        小提示：注册成功后请返回当前页面确认<br>
        用户信息，核对完成后再开始其他任务，<br>
        以免造成不必要的损失。
      </div>
    </modal>
    <!-- 开始h5任务询问 -->
    <modal v-model="showH5taskConfirm" title="温馨提示" saveText="进入游戏" @on-save="_startTask">
      <div class="confirm-content">
        任务已领取<br>
        快去玩游戏吧
      </div>
    </modal>
    <!-- 用户领取兑换码 -->
    <modal v-model="showExchangeCard" title="领取成功" saveText="进入游戏" @on-save="taskUnderway">
      <div class="exchange-content">
        <div class="card">
          兑换码：<div class="code">{{cardAward.code}}</div>
          <div class="copy" 
            v-clipboard:copy="cardAward.code"
            v-clipboard:success="onSuccess" 
          >复制</div>
        </div>
        <div class="pwd">兑换路径：{{cardAward.getWay}}</div>
      </div>
    </modal>
    <!-- 游客登录询问 -->
    <modal v-model="showLoginConfirm" title="账号安全提示" >
      <div class="loginconfirm-content">
        为保障账户的资金安全，建议您绑定手机号后领取奖励。
      </div>
      <div class="loginconfirm-footer" slot="footer">
        <div class="footer-btn" @click="goPhoneBind">绑定手机号</div>
        <p @click="_getAward(confirmItem)">直接领取</p>
      </div>
    </modal>
    <!-- 原生粘贴板 -->
    <textarea cols="20" rows="10" id="copy" style="width:0;height:0;opacity:0"></textarea>
  </div>
</template>
<script>
import Service from '@/components/servicePop/service'
import AppCall from '@/utils/native'
import UserGuide from './components/userGuide/userGuide'
import GameBanner from './components/gameBanner/gameBanner'
import { getTaskDetail, startTask, getAward, getCard, firstReport, durationReport } from '@/services/task'
import { userIsVisitor, getUserCenter } from '@/services/user'
import { jumpUrl } from '@/utils/utils'
import { mapState } from 'vuex'
import _get from 'lodash.get'
export default {
  name: 'taskDetail',
  data: () => ({
    pullDown: false,
    pullDownBtn: false,
    currentIndex: 0,
    taskDetail: {},
    showService: false,
    showAward: false,
    award: '',
    showApptaskConfirm: false,
    showH5taskConfirm: false,
    showExchangeCard: false,
    showLoginConfirm: false,
    confirmItem: '',
    cardAward: {}
  }),
  components: {
    UserGuide,
    Service,
    GameBanner
  },
  filters: {
    amountComputen1 (val) {
      if (!val) { return 0 }
      return val > 10000 ? (val / 10000).toFixed(1) + '万' : val
    },
    amountComputen2 (val) {
      if (!val) { return 0 }
      return val > 10000 ? parseInt(val / 10000) + '万' : val
    }
  },
  computed: {
    ...mapState(['isVisitory']),
    activeStyle () {
      return {
        position: `relative`,
        zIndex: `2`,
        flexShrink: `0`,
        flex: this.taskNav.length == 1 ? `1` : `0 0 ${6.6 / this.taskNav.length + .5}rem`,
        height: `.7rem`,
        lineHeight: '.7rem',
        background: `#FFFFFF`,
        fontSize: '.28rem',
        color: `#D39436`,
        borderRadius: `.3rem .3rem 0 0`
      }
    },
    taskNav () {
      return _get(this.taskDetail, 'taskType', [])
    },
    taskList () {
      const index = _get(this.taskNav[this.currentIndex], 'value', 0)
      return this.taskDetail && this.taskDetail.configInfo && this.taskDetail.configInfo[index] || []
    },
    remark () {
      // if(this.taskDetail.tUserId || this.taskDetail.tUserName) {
      //   let name = this.taskDetail.gameType == 1 ? this.taskDetail.tUserId : this.taskDetail.tUserName
      //   return `账号：${name}<br>${this.taskDetail.remark}`
      // }
      return this.taskDetail.remark || ''
    },
    showResetDownLoad () {
      if(this.taskDetail.status == 0 && !this.taskDetail.tUserId && this.taskDetail.gameType == 1) {
        return true
      }
      return false
    },
    gameBannerImg () {
      if(this.taskDetail.img) {
        return this.taskDetail.img.split(',')
      }
      return []
    }
  },
  methods: {
    handClick (index) {
      this.currentIndex = index
    },
    /** 是否显示下拉菜单 **/
    isShowPullDown () {
      this.$nextTick(res => {
        const box = this.$refs.box.clientHeight
        const wrap = this.$refs.wrap.clientHeight
        if(wrap > box) {
          this.pullDownBtn = true
        }
      })
    },
    /** 下拉菜单点击 **/
    openPullDown () {
      this.pullDown = true
      this.pullDownBtn = false
    },
    /** 打开客服弹框 **/
    openService () {
      this.showService = true
    },
    /** 获取任务详情 **/
    _getTaskDetail () {
      const id = this.$route.query.id
      getTaskDetail(id).then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.taskDetail = data
          this.isShowPullDown()
          this.$marchSetsPoint('A_H5PT0303000015', {
            game_id: id,
            game_name: this.taskDetail.name
          })
        }
      })
    },
    /** 刷新任务 **/
    refershTask () {
      this.$refs.refreshBtn.classList.add('animation')
      this._getTaskDetail()
      setTimeout(() => {
        this.$Toast('刷新完成')
        this.$refs.refreshBtn.classList.remove('animation')
      },1000)
    },
    /** 打开H5游戏**/
    open_h5_game () {
      localStorage.removeItem('earnCoinDuration')
      jumpUrl({
        url: this.taskDetail.download,
        gameId: this.taskDetail.gameId
      })
    },
    /** 打开梦工厂游戏 **/
    open_MGC_game () {
      localStorage.removeItem('earnCoinDuration')
      firstReport({
        value: this.taskDetail.gameId
      }).then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200 && data.sign) {
          localStorage.setItem('MGC_SIGN', data.sign)
          this.taskDetail.gameId && AppCall.openMGCGame(this.taskDetail.gameId)
        }
      })
    },
    /** 开始任务 **/
    async _startTask () {
      const id = this.$route.query.id
      startTask(id).then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this._getTaskDetail()
          /** gameType == 1 下载app处理逻辑 **/
          if(this.taskDetail.gameType == 1) {
            this.copy(() => {
              location.href = this.taskDetail.download.split('?')[0]
            })
          } 
          /** 梦工厂游戏 **/
          else if (this.taskDetail.gameSource == 1) {
            this.open_MGC_game()
          }
          /** h5游戏 **/
          else {
            this.open_h5_game()
          }
        }
      })
      this.showApptaskConfirm = false
      this.showH5taskConfirm = false
    },
    /** 开始任务询问 **/
    startTaskConfirm () {
      /** gameType == 1 下载app处理逻辑 **/
      if(this.taskDetail.gameType == 1) {
        this.showApptaskConfirm = true
      } else {
        this.showH5taskConfirm = true
      }
      this.$marchSetsPoint('A_H5PT0303003642', {
        task_id: this.taskDetail.id,
        task_name: this.taskDetail.name
      })
    },
    /** 领取奖励 **/
    _getAward (item) {
      const id = item.id
      getAward(id).then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.showAward = true
          this.award = data
          this._getTaskDetail()
        }else {
          this.$Toast( message )
        }
        this.showLoginConfirm = false
      })
      this.$marchSetsPoint('A_H5PT0303003643', {
        task_id: this.taskDetail.id,
        task_name: this.taskDetail.name
      })
    },
    /** 领取奖励回调 **/
    awardCallback () {
      this.showAward = false
    },
    /** 任务进行中 **/
    taskUnderway () {
      /** gameType == 1 下载app处理逻辑 **/
      if(this.taskDetail.gameType == 1) {
        this.$Toast('任务已领取,打开app试玩吧')
      }
      /** 梦工厂游戏 **/
      else if (this.taskDetail.gameSource == 1) {
        this.open_MGC_game()
      }
      /** h5游戏 **/
      else{
        this.open_h5_game()
      }
    },
    /** 任务列表点击 **/
    listItemClick () {
      if(this.taskDetail.status == 2) {
        this.startTaskConfirm()
      }else {
        this.taskUnderway()
      }
    },
    /** 复制src到原生粘贴板 **/
    copy (callback) {
      let text = `from=earnCoin&${this.taskDetail.download.split('?')[1]}`
      let input = document.getElementById("copy")
      input.value = text;
      input.select()
      document.execCommand("copy")
      callback && callback()
    },
    /** 重新下载 **/
    resetDownload () {
      this.copy(() => {
        switch (this.taskDetail.appId) {
          case 40000: 
            location.href = 'https://wap.beeplaying.com/ddwgame/'
          break;
          case 10000:
            location.href = 'https://fish.665e.com/fish/fishdown/'
            break;
        }
      })
    },
    /** 获取礼包码 **/
    _getCard ({id}) {
      getCard(id).then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.openCodeModal(data)
          this._getTaskDetail()
        }else {
          this.$Toast( message )
        }
      })
    },
    /** 查看礼包码 **/
    openCodeModal ({code, getWay}) {
      this.cardAward = {
        code, getWay
      }
      this.showExchangeCard = true
    },
    /** 判断用户是否是游客 **/
    _userIsVisitor (item) {
      if(this.isVisitory) {
        this.confirmItem = item
        this.showLoginConfirm = true
      }else {
        this._getAward(item)
      }
    },
    /** 跳转手机绑定页 **/
    goPhoneBind () {
      this.$router.push({
        name: 'bindPhone'
      })
    },
    /** 复制回调 **/
    onSuccess () {
      this.$Toast('复制成功，请前往游戏兑换礼包')
    },
    /** 梦工厂游戏时长上报 **/
    _durationReport ({gameId, time}) {
      const sign = localStorage.getItem('MGC_SIGN')
      if(gameId && time && sign) {
        durationReport({
          duration: time,
          gameId,
          sign
        }).then( res => {
          this._getTaskDetail()
        })
      }
      this.$marchSetsPoint('D_JFQ0001', {
        out_gameplat: 1,
        game_duration: time,
        task_id: this.taskDetail.id,
        task_name: this.taskDetail.name
      })
    },
    /** 梦工厂初始化 **/
    async MGC_gameInit () {
      const userCenter = await getUserCenter()
      const { userId, nickname } = _get(userCenter, 'data.data')
      if(userId && nickname) {
        AppCall.initMGCGame(userId, nickname, this.MGC_duration)
      }
    },
    /** 梦工厂时长回调 **/
    MGC_duration () {
      window.MGCGameCallback = (data) => {
        if(window.isOpenMGCGame) {
          window.isOpenMGCGame = false
          this._durationReport(data)
        }
      }
    },
    /** 向window插入下载监听方法 **/
    insertDownloadFn () {
      window.downloadApkCallback = (d) => {
        // alert(JSON.stringify(d));
      }
    },
    /** 离开页面的时候删除window对象的下载监听方法 **/
    removeDownloadFn () {
      window.downloadApkCallback = null
    }
  },
  mounted () {
    this._getTaskDetail()
    this.MGC_gameInit()
    this.insertDownloadFn()
  },
  beforeDestroy () {
    this.removeDownloadFn()
  }
}
</script>
<style lang="less" scoped>
.task-detail {
  padding: 1.2rem .3rem 1.2rem;
  min-height: 100vh;
  background: #F2F2F2;
  .task-info {
    padding: .3rem .3rem .21rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: .3rem .3rem 0 0;
    background: #fff;
    border-bottom: 1px solid #F2F2F2;
    .task-img {
      margin-right: .2rem;
      width: 1.04rem;
      height: 1.04rem;
      border-radius: .18rem;
      overflow: hidden;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 1.1rem;
      .name {
        font-size: .32rem;
        font-weight: bold;
        color: #252525;
      }
      .platform {
        color: #000;
      }
      .text {
        white-space: normal;
        overflow: hidden;
        color: #ACACAC;
      }
    }
  }
  .task-status {
    padding: 0 .3rem;
    height: .7rem;
    background: #fff;
    border-bottom: 1px solid #F2F2F2;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .status {
      margin-right: .2rem;
      padding: 0 .12rem;
      height: .3rem;
      line-height: .3rem;
      color: #fff;
      font-size: .2rem;
      border-radius: .06rem;
      background: #E8382B;
      &.red {
        background: #E8382B;
      }
      &.yellow {
        background: #FFE790;
        color: #D39436;
      }
      &.gray {
        background: #ACACAC;
      }
    }
    .refresh {
      width: .3rem;
      height: .3rem;
      &.animation {
        animation: refresh 1s 1;
      }
    }
    .total {
      margin-left: auto;
      display: flex;
      align-items: baseline;
      font-size: .2rem;
      color: #ACACAC;
      span {
        color: #E8382B;
        font-size: .32rem;
        font-weight: bold;
      }
      .unit {
        font-size: .2rem;
        color: #E8382B;
      }
    }
  }
  .task-desc {
    position: relative;
    overflow: hidden;
    margin-bottom: .32rem;
    padding: .23rem .23rem .5rem;
    line-height: .4rem;
    height: 2.32rem;
    background: #fff;
    border-radius: 0 0 .3rem .3rem;
    .wrap {
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      color: #666666;
    }
    .count-wrap {
      position: absolute;
      opacity: 0;
    }
    .open {
      position: absolute;
      bottom: 0;
      left: 0;
      height: .5rem;
      width: 100%;
      background: url(./img/open.png) no-repeat center center #fff;
      background-size: .28rem .27rem;
    }
    &.active {
      height: auto;
      .wrap {
        display: -webkit-box;
        -webkit-line-clamp: 10000;
        -webkit-box-orient: vertical;
      }
    }
  }
  .task-list {
    .nav {
      display: flex;
      justify-self: center;
      align-items: flex-end;
      background: #E6E6E6;
      height: .58rem;
      border-radius: .3rem .3rem 0 0 ;
      .item {
        position: relative;
        flex: 1;
        height: .58rem;
        line-height: .58rem;
        color: #ACACAC;
        font-size: .22rem;
        font-weight: bold;
        text-align: center;
        .line {
          position: absolute;
          right: -1px;
          top: .14rem;
          z-index: 1;
          height: .3rem;
          width: 1px;
          background: #ACACAC;
        }
        .text {
          width: 100%;
          height: .3rem;
          border-right: 1px solid ;
        }
        &:last-child {
          .line {
            display: none;
          }
        }
      }
    }
    .list {
      background: #fff;
      border-radius: 0 0 .3rem .3rem;
      border-top: 1px solid #F2F2F2;
      .items {
        padding-right: .3rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 1.2rem;
        border-bottom: 1px solid #F2F2F2;
        &:last-child {
          border: none;
        }
        .rank {
          width: .7rem;
          line-height: 1.2rem;
          text-align: center;
        }
        .desc {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .name {
            margin-bottom: .08rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .img {
              margin-right: .08rem;
              width: .3rem;
              height: .3rem;
            }
            .prize {
              margin-right: .23rem;
              font-weight: bold;
              color: #D39436;
            }
            .rmb {
              padding: 0 .1rem;
              height: .3rem;
              line-height: .3rem;
              font-size: .2rem;
              color: #E8382B;
              border:1px solid #E8382B;
              border-radius: .06rem;
            }
          }
          .task-text {
            color: #000000;
          }
        }
        .right {
          margin-left: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          text-align: right;
          .btn {
            margin-bottom: .05rem;
            width: 1.5rem;
            height: .5rem;
            line-height: .5rem;
            text-align: center;
            font-size: .26rem;
            font-weight: bold;
            border-radius: .3rem;
            &.yellow {
              color: #000000;
              background: #FFCA00;
            }
            &.yellow2 {
              background: #FF7800;
              color: #FFFFFF;
            }
            &.gray {
              background: #DCDCDC;
              color: #fff;
            }
            &.yellow1 {
              background: #FFCA00;
              color: #000000;
            }
          }
          .progress {
            color: #FF7800;
            font-size: .2rem;
            font-weight: bold;
          }
        }
      }
      .card-items {
        padding: .25rem .3rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid #E8E8E8;
        &:last-child {
          border: none
        }
        .card-id {
          padding-right: .25rem;
        }
        .desc {
          margin-right: .2rem;
          .card-name {
            font-size: .24rem;
            color: #000;
            font-weight: bold;
          }
          .card-content {
            font-size: .2rem;
            color: #666666;
          }
          .card-explain {
            font-size: .2rem;
            color: #E7BD69;
          }
        }
        .btn {
          flex-shrink: 0;
          margin-left: auto;
          width: 1.5rem;
          height: .5rem;
          line-height: .52rem;
          font-size: .26rem;
          color: #fff;
          font-weight: bold;
          border-radius: .4rem;
          text-align: center;
          background: #FF7800;
          &.gray {
            background: #ACACAC;
            color: #fff;
          }
          &.active {
            background: #FFE790;
            color: #D39436;
          }
        }
      }
    }
    .no-data {
      overflow: hidden;
      background: #fff;
      border-radius: 0 0 .3rem .3rem;
      border-top: 1px solid #F2F2F2;
      .content {
        margin: .8rem auto 1.2rem;
        width: 2.5rem;
        height: 1.88rem;
      }
      p {
        margin-top: .13rem;
        white-space: nowrap;
        font-size: .2rem;
        color: #E7BD69;
        text-align: center;
      }
    }
  }
  .task-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    display: flex;  
    justify-content: center;
    align-items: center;
    height: 1.1rem;
    background: #fff;
    border-top: 1px solid #F2F2F2;
    .service-btn,.task-btn {
      height: .8rem;
      line-height: .82rem;
      text-align: center;
      font-size: .26rem;
      font-weight: bold;
      border-radius: .4rem;
    }
    .service-btn {
      img {
        width: .3rem;
        height: .3rem;
      }
      span {
        color: #E7BD69;
      }
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: .2rem;
      width: 2.2rem;
      border: .02rem solid #E7BD69
    }
    .task-btn {
      width: 4.2rem;
      &.yellow {
        background: #FFE790;
        color: #D39436;
      }
      &.red {
        background: #E8382B;
        color: #fff;
      }
      &.gray {
        background: #ACACAC;
        color: #fff;
      }
      &.yellow1 {
        background: #FFCA00;
        color: #000000;
      }
      &.continue {
        background: #FF7800;
        color: #FFFFFF;
      }
    }
  }
  .download {
    padding: .2rem 0;
    text-align: center;
    span {
      color: blue;
      text-decoration: underline;
    }
  }
  .award-content {
    text-align: center;
    img {
      width: 1.34rem;
      height: 1.34rem;
    }
    .p1 {
      margin-bottom: .1rem;
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
    }
  }
  .confirm-content {
    padding-top: .3rem;
    text-align: center;
    color: #252525;
    line-height: .5rem;
  }
  .exchange-content {
    padding-top: .1rem;
    .card {
      margin-bottom: .15rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .code {
        font-size: .32rem;
        color: #252525;
        font-weight: bold;
      }
      .copy {
        margin-left: auto;
        width: .9rem;
        height: .5rem;
        line-height: .5rem;
        font-weight: bold;
        font-size: .26rem;
        color: #D39436;
        text-align: center;
        border-radius: .4rem;
        background: #FFE790;
      }
    }
    .pwd {
      line-height: .4rem;
    }
  }
  .loginconfirm-content {
    font-size: .24rem;
    line-height: .4rem;
    color: #000000;
  }
  .loginconfirm-footer {
    .footer-btn {
      margin:0 auto .15rem;
      width: 2.4rem;
      height: .7rem;
      line-height: .7rem;
      text-align: center;
      font-size: .26rem;
      font-weight: bold;
      text-align: center;
      background: #FFCA00;
      border-radius: .35rem;
    }
    p {
      text-align: center;
      font-size: .24rem;
      color: #ACACAC;
    }
  }
}
@keyframes refresh {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
}
</style>