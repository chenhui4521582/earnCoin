<template>
  <div class="task-detail">
    <wf-header title="任务详情" />
    <div class="task-info">
      <div class="task-img">
        <img class="inner-img" :src="taskDetail.icon | filter" alt="">
      </div>
      <div class="info">
        <div class="name-wrap">
          <div class="name">{{taskDetail.name}}</div>
          <grade :star="taskDetail.star"/>
        </div>
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
                <div class="read-ad" v-if="item.profit">看视频领{{ item.profit | numberFormat }}倍</div>
              </div>
              <div class="task-text">{{item.remark}}</div>
            </div>
            <div class="right">
              <div class="btn yellow2" v-if="item.status == 2" @click="userReadAdvertiting(item)">领奖励</div>
              <div class="btn gray" v-if="item.status == 1">已完成</div>
              <div class="btn yellow" v-if="item.status == 0" @click="listItemClick(index)">去完成</div>
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
    </div>
    <!-- 底部按钮 -->
    <div class="task-footer">
      <div class="service-btn" @click="openService">
        <img src="./img/service-icon.png" alt="">
      </div>
      <!-- H5任务按钮 -->
      <template v-if="taskDetail.gameType == 2">
        <div class="task-btn yellow1" v-if="taskDetail.status == 2" @click="startTaskConfirm">开始任务</div>
        <div class="task-btn yellow1" v-if="taskDetail.status == 0 || taskDetail.status == 1" @click="taskUnderway">开始游戏</div>
      </template>
      <!-- app任务按钮 -->
      <template v-if="taskDetail.gameType == 1">
        <!-- 任务完成 -->
        <div class="task-btn gray" v-if="taskDetail.status == 1">任务已完成</div>
        <!-- 开始任务 -->
        <div class="task-btn yellow1" v-else-if="taskDetail.status == 2" @click="startTaskConfirm">开始任务</div>
        <!-- 下载进度条 -->
        <div class="download-progress" v-else-if="downloadedProgress">
          <div class="text">正在下载 {{downloadedProgress}}</div>
          <div class="progress" :style="{width: downloadedProgress}"></div>
        </div>
        <!-- 打开apk -->
        <div class="task-btn yellow1" v-else-if="isShowOpenAppBtn" @click="openAPP">开始游戏</div>
        <!-- 安装apk -->
        <div class="task-btn yellow1" v-else-if="isShowInstallBtn" @click="installAPK">安装游戏</div>
        <!-- 重新下载 -->
        <div class="task-btn yellow1" v-else-if="isShowReloadBtn" @click="downloadApk">下载游戏</div>
        <!-- 1.0.1, 1.0 版本兼容 -->
        <div class="task-btn yellow1" v-else @click="downloadApk">下载游戏</div>
      </template>
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
    <modal v-model="showApptaskConfirm" title="温馨提示" saveText="知道了" @on-save="_startTask" @on-close="hideConifrm">
      <div class="confirm-content">
        应用开始下载，请及时关注下载进度。<br><br>
        小提示：注册成功后请返回当前页面确认<br>
        用户信息，核对完成后再开始其他任务，<br>
        以免造成不必要的损失。
      </div>
    </modal>
    <!-- 开始h5任务询问 -->
    <modal v-model="showH5taskConfirm" title="温馨提示" saveText="进入游戏" @on-save="_startTask" @on-close="hideConifrm">
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
    <!-- 是否显示多倍看广告弹框 -->
    <div class="user-read-advertiting" v-if="showReadAdvertiting">
      <div class="mask"></div>
      <div class="user-read-advertiting-center">
        <div class="user-read-advertiting-btn" @click="openAdvertiting">
          <img src="./img/ad-icon.png" alt="">
          {{ confirmItem.profit | numberFormat}}倍领取</div>
        <p @click="_getAward(confirmItem)">直接领取</p>
      </div>
    </div>
    <!-- 原生粘贴板 -->
    <textarea cols="20" rows="10" id="copy" style="width:0;height:0;opacity:0" readonly="readonly"></textarea>
  </div>
</template>
<script>
import Service from '@/components/servicePop/service'
import AppCall from '@/utils/native'
import UserGuide from './components/userGuide/userGuide'
import GameBanner from './components/gameBanner/gameBanner'
import Grade from '@/components/grade/grade'
import { getTaskDetail, startTask, getAward, getCard, firstReport, durationReport, getReadAdAward } from '@/services/task'
import { jumpUrl } from '@/utils/utils'
import { mapState } from 'vuex'
import md5 from 'js-md5';
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
    showReadAdvertiting: false,
    confirmItem: '',
    cardAward: {},
    download: {},
    isShowReloadBtn: false,
    isShowInstallBtn: false,
    isShowOpenAppBtn: false
  }),
  components: {
    UserGuide,
    Service,
    GameBanner,
    Grade
  },
  filters: {
    amountComputen1 (val) {
      if (!val) { return 0 }
      return val > 10000 ? (val / 10000).toFixed(1) + '万' : val
    },
    amountComputen2 (val) {
      if (!val) { return 0 }
      return val > 10000 ? parseInt(val / 10000) + '万' : val
    },
    numberFormat (val) {
      if (!val) { return 0 }
      let format = {
        1: '一',
        2: '双',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '七',
        8: '八',
        9: '九'
      }
      return format[val]
    }
  },
  computed: {
    ...mapState(['APP_VERSION', 'userCenter']),
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
    },
    downloadedProgress () {
      let {downloaded = 0, length = 0} = this.download
      if(downloaded && length) {
        if(downloaded >= length) {
          this.download = {}
          return
        }
        return (downloaded / length * 100).toFixed(1)  + '%'
      }
      return false
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
          this.appBtnStatus()
          this.$marchSetsPoint('A_H5PT0303000015', {
            game_id: this.taskDetail.gameId,
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
    /** 下载APK **/
    downloadApk () {
      if(this.downlock) {
        this.$Toast('请勿连续点击')
        return 
      } 
      this.copy(() => {
        this.taskDetail.status = 0
        sessionStorage.setItem(`downloadLength${this.taskDetail.id}`, 0)
        const url = this.taskDetail.download.split('?')[0]
        AppCall.downloadApk(url)
      })
      this.downlock = true
      setTimeout( () => {
        this.downlock = false
      }, 3000)
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
      this.taskDetail.gameId && firstReport({
        value: this.taskDetail.gameId
      }).then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200 && data.sign) {
          localStorage.setItem('MGC_SIGN', data.sign)
          AppCall.openMGCGame(this.taskDetail.gameId)
          this.taskDetail.status = 0
        }
      })
    },
    /** 开始任务按钮点击弹出确认弹框 **/
    startTaskConfirm () {
      /** gameType == 1 下载app处理逻辑 **/
      if(this.taskDetail.gameType == 1) {
        this.showApptaskConfirm = true
      } else {
        this.showH5taskConfirm = true
      }
      this.$marchSetsPoint('A_H5PT0303000016', {
        game_id: this.taskDetail.gameId,
        game_name: this.taskDetail.name
      })
    },
    /** 开始任务 **/
    async _startTask () {
      const id = this.$route.query.id
      startTask(id).then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          /** gameType == 1 下载app处理逻辑 **/
          if(this.taskDetail.gameType == 1) {
            this.downloadApk()
          } 
          /** 梦工厂游戏 **/
          else if (this.taskDetail.gameSource == 1) {
            this.open_MGC_game()
          }
          /** h5游戏 **/
          else if (this.taskDetail.gameType == 2) {
            this.open_h5_game()
          }
          this.$marchSetsPoint('A_H5PT0303000017', {
            game_id: this.taskDetail.gameId,
            game_name: this.taskDetail.name
          })
        }
      })
      this.showApptaskConfirm = false
      this.showH5taskConfirm = false
    },
    /** 任务进行中按钮点击 **/
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
      else if (this.taskDetail.gameType == 2) {
        this.open_h5_game()
      }
    },
    /** 领取奖励的时候判断用户是否要看广告 **/
    userReadAdvertiting (item) {
      if(item.profit != 0) {
        this.confirmItem = item
        this.showReadAdvertiting = true
        this.$marchSetsPoint('A_H5PT0303000043', {
          task_id: item.id,
          task_name: item.remark
        })
      }else {
        this._getAward(item)
      }
    },
    /** 领取奖励 **/
    _getAward (item) {
      const {id, remark} = item
      getAward(id).then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.showAward = true
          this.award = data
          this._getTaskDetail()
        }else {
          this.$Toast( message )
        }
        this.showReadAdvertiting = false
      })
      this.$marchSetsPoint('A_H5PT0303003643', {
        task_id: id,
        task_name: remark
      })
      this.$marchSetsPoint('A_H5PT0303000045', {
        task_id: id,
        task_name: remark
      })
    },
    /** 领取看广告多倍奖励 **/
    _getReadAdAward (item) {
      const {id} = item
      let channel = localStorage.getItem('APP_CHANNEL')
      let timestamp = Date.now()
      let sign = md5(`channelId=${channel}&id=${id}&timestamp=${timestamp}&userId=${this.userCenter.userId}`)
      getReadAdAward({
        id,
        sign,
        timestamp
      }).then( res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.showReadAdvertiting = false
          this.showAward = true
          this.award = data
          this._getTaskDetail()
        }else {
          this.$Toast( message )
        }
      })
    },
    /** 领取奖励回调 **/
    awardCallback () {
      this.showAward = false
    },
    /** 任务列表点击 **/
    listItemClick (index) {
      if(index == 0) {
        this.$marchSetsPoint('A_H5PT0303000020', {
          game_id: this.taskDetail.gameId,
          game_name: this.taskDetail.name
        })
      }
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
    /** 跳转手机绑定页 **/
    goPhoneBind () {
      this.$router.push({
        name: 'bindPhone'
      })
    },
    /** 复制成功回调 **/
    onSuccess () {
      this.$Toast('复制成功，请前往游戏兑换礼包')
    },
    /** 计算APP下载的按钮状态 **/
    async appBtnStatus () {
      try {
        let { packageName, fileName } = this.taskDetail
        let checkIsDownload = await AppCall.checkIsDownload(fileName)
        let checkIsInstall = await AppCall.checkIsInstall(packageName)
        this.isShowReloadBtn = false
        this.isShowInstallBtn = false
        this.isShowOpenAppBtn = false
        /**  1.0.1, 1.0 版本包不运行分步骤下载 **/
        if(this.APP_VERSION == '1.0.1' || this.APP_VERSION == '1.0') {
          console.log('1.0.1, 1.0 版本包不运行分步骤下载')
          return
        }
        /** 显示重新下载按钮 **/
        if(checkIsDownload == 'false' && this.taskDetail.status == 0) {
          this.isShowReloadBtn = true
          console.log('1是否下载', checkIsDownload)
        }
        /** 显示重新安装按钮 **/
        if(checkIsInstall == 'false' && checkIsDownload == 'true' && this.taskDetail.status == 0) {
          this.isShowInstallBtn = true
          console.log('2是否安装', checkIsInstall)
        }
        /** 显示去玩游戏按钮 **/
        if(checkIsInstall == 'true' && this.taskDetail.status == 0) {
          this.isShowOpenAppBtn = true
          console.log('3是否去玩游戏', checkIsInstall)
        }
      } catch (e) {
        return false
      }
    },
    /** 重新安装APK **/
    installAPK () {
      let { fileName } = this.taskDetail
      AppCall.installApk(fileName)
    },
    /** 打开APP **/
    openAPP () {
      let { packageName } = this.taskDetail
      AppCall.openPackage(packageName)
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
        this.$marchSetsPoint('D_JFQ0001', {
          out_gameplat: 1,
          game_duration: time,
          game_id: this.taskDetail.gameId,
          game_name: this.taskDetail.name
        })
      }
    },
    /** 梦工厂初始化 **/
    async MGC_gameInit () {
      const { userId, nickname } = this.userCenter
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
    insertWindowFn () {
      /** 下载回调 **/
      window.downloadApkCallback = (d) => {
        /** 判断url **/
        const {url, downloaded} = d
        let downloadUrl = this.taskDetail.download.split('?')[0]
        let downloadLength = sessionStorage.getItem(`downloadLength${this.taskDetail.id}`) || 0
        if(downloadUrl == url && downloaded > downloadLength) {
          sessionStorage.setItem(`downloadLength${this.taskDetail.id}`, downloaded)
          this.download = d
        }
      }
      /** APP重后台返回前台的时候刷新下载按钮 **/
      window.launchTimes = () => {
        (this.taskDetail.gameType == 1) && this.appBtnStatus()
      }
    },
    /** 离开页面的时候删除window对象的下载监听方法 **/
    removeWindowFn () {
      window.downloadApkCallback = null
      window.launchTimes = null
    },
    /** 开始任务确认弹框关闭回调 **/
    hideConifrm () {
      this.$marchSetsPoint('A_H5PT0303000018', {
        task_id: this.taskDetail.id,
        task_name: this.taskDetail.name
      })
    },
    /** 打开广告 **/
    openAdvertiting () {
      AppCall.advertiting({
        advertitingId: 945457455,
        userId: this.userCenter.userId
      }).then(res => {
        if(res) {
          this.showReadAdvertiting = false
          this._getReadAdAward(this.confirmItem)
        }else {
          this.showReadAdvertiting = false
        }
      })
      this.$marchSetsPoint('A_H5PT0303000044', {
        task_id: this.confirmItem.id,
        task_name: this.confirmItem.remark
      })
    },
  },
  mounted () {
    this._getTaskDetail()
    this.MGC_gameInit()
    this.insertWindowFn()
  },
  beforeDestroy () {
    this.removeWindowFn()
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
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      min-height: 1.1rem;
      .name-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
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
        &:first-child {
          .prize {
            font-size: .28rem;
            color: #E8382B !important;
          }
        }
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
              margin-right: .08rem;
              font-weight: bold;
              color: #D39436;
            }
            .read-ad {
              height: .3rem;
              font-size: .2rem;
              border: 1px solid #E8382B;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0 .1rem;
              white-space: nowrap;
              border-radius: .06rem;
              color: #E8382B;
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
    padding: 0 .3rem;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    display: flex;  
    justify-content: space-between;
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
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: .2rem;
      width: .8rem;
      background: #FFF5CF
    }
    .task-btn {
      width: 5.4rem;
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
      &.orange {
        background: #FF7800;
        color: #FFFFFF;
      }
    }
    .download-progress {
      position: absolute;
      right: .3rem;
      top: .15rem;
      z-index: 1;
      overflow: hidden;
      padding: 0;
      width: 5.4rem;
      height: .8rem;
      line-height: .82rem;
      font-size: .26rem;
      font-weight: bold;
      text-align: center;
      border: 1px solid #D39436;
      border-radius: .4rem;
      background: #fff;
      .progress {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        background: #FFE790;
      }
      .text {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: .8rem;
        font-weight: bold;
        font-size: .26rem;
        color: #D39436;
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
  .user-read-advertiting {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 99;
    .mask {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 1;
      overflow: hidden;
      pointer-events: none;
    }
    .user-read-advertiting-center {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 2;
      padding-top: .56rem;
      width: 5rem;
      width: 3.4rem;
      height: 2.2rem;
      transform: translate(-50%, -50%);
      border-radius: .5rem;
      background: #fff;
      .user-read-advertiting-btn {
        margin: 0 auto .2rem;
        width: 2.4rem;
        height: .7rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FFCA00;
        border-radius: .35rem;
        font-size: .26rem;
        color: #000;
        font-weight: bold;
        img {
          margin-right: .05rem;
          width: .3rem;
          height: .3rem;
        }
      }
      p {
        color: #ACACAC;
        text-align: center;
      }
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