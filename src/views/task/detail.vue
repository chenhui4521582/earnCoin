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
      <div class="refresh" @click="_getTaskDetail"><img class="inner-img" src="./img/refresh.png" alt=""></div>
      <div class="total">全部任务完成后<span>+{{taskDetail.award}}</span><span class="unit">元</span></div>
    </div>
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
        <div class="items" v-for="(item, index) in taskList" :key="index">
          <div class="rank">{{item.taskLevel}}</div>
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
          <div class="btn yellow2" v-if="item.status == 2" @click="_getAward(item)">领奖励</div>
          <div class="btn gray" v-if="item.status == 1">已完成</div>
          <div class="btn yellow" v-if="item.status == 0" @click="taskUnderway">去完成</div>
        </div>
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
      <div class="task-btn gray" v-if="taskDetail.status == 1" >任务已完成</div>
      <div class="task-btn yellow" v-if="taskDetail.status == 0" @click="taskUnderway">任务进行中</div>
    </div>
    <!-- 客服弹框 -->
    <Service v-model="showService" />
    <!-- 新手引导 -->
    <user-guide />
    <!-- 领取奖励 -->
    <modal v-model="showAward" title="恭喜你获得" saveText="去赚更多" :type="2" @on-save="awardCallback">
      <div class="award-content">
        <img src="./img/big-coin.png" alt="">
        <p>金币 +{{award || 0}}个</p>
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
        任务已领取，请在创建昵称后回到当前<br>
        页面，点击【刷新】，确认显示昵称与您<br>
        注册昵称一致后再进行充值，<br>
        以免造成不必要的损失。
      </div>
    </modal>
    <!-- 原生粘贴板 -->
    <textarea cols="20" rows="10" id="copy" style="width:0;height:0">1111111111111111</textarea>
  </div>
</template>
<script>
import Service from '@/components/servicePop/service'
import UserGuide from './components/userGuide/userGuide'
import { getTaskDetail, startTask, getAward } from '@/services/task'
import { jumpUrl } from '@/utils/utils'
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
    showH5taskConfirm: false
  }),
  components: {
    UserGuide,
    Service
  },
  computed: {
    activeStyle () {
      return {
        position: `relative`,
        zIndex: `2`,
        flexShrink: `0`,
        flex: `0 0 ${6.6 / this.taskNav.length + .5}rem`,
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
      if(this.taskDetail.tUserId) {
        return `账号：${this.taskDetail.tUserId}<br>${this.taskDetail.remark}`
      }
      return this.taskDetail.remark || ''
    },
    showResetDownLoad() {
      if(this.taskDetail.status == 0 && !this.taskDetail.tUserId && this.taskDetail.gameType == 1) {
        return true
      }
      return false
    }
  },
  methods: {
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
    handClick (index) {
      this.currentIndex = index
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
        }
      })
    },
    /** 开始任务 **/
    _startTask () {
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
          } else {
            jumpUrl({
              url: this.taskDetail.download,
              gameId: this.taskDetail.gameId
            })
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
        task_name: this.taskDetail.id
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
      })
      this.$marchSetsPoint('A_H5PT0303003643', {
        task_id: this.taskDetail.id,
        task_name: this.taskDetail.id
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
      }else{
        jumpUrl({
          url: this.taskDetail.download,
          gameId: this.taskDetail.gameId
        })
      }
    },
    /** 复制src到原生粘贴板 **/
    copy (callback) {
      let text = this.taskDetail.download.split('?')[1]
      let input = document.getElementById("copy")
      input.value = text;
      input.select()
      document.execCommand("copy")
      callback && callback()
    },
    /** 重新下载 **/
    resetDownload () {
      this.copy(() => {
        location.href = this.taskDetail.download.split('?')[0]
      })
    }
  },
  mounted () {
    this._getTaskDetail()
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
    border-bottom: 1px solid #DCDCDC;
    .task-img {
      margin-right: .2rem;
      width: 1.04rem;
      height: 1.04rem;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 1.1rem;
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
    border-bottom: 1px solid #DCDCDC;
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
      .items {
        padding-right: .3rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 1.2rem;
        border-bottom: 1px solid #E8E8E8;
        &:last-child {
          border: none;
        }
        .rank {
          width: .7rem;
          line-height: 1.2rem;
          text-align: center;
          color: #DCDCDC;
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
        .btn {
          margin-left: auto;
          width: 1.5rem;
          height: .5rem;
          line-height: .5rem;
          text-align: center;
          font-size: .26rem;
          font-weight: bold;
          
          border-radius: .3rem;
          &.yellow {
            background: #FFE790;
            color: #D39436;
          }
          &.yellow2 {
            background: #FF7800;
            color: #FFFFFF;
          }
          &.gray {
            background: #ACACAC;
            color: #fff;
          }
          &.yellow1 {
            background: #FFCA00;
            color: #000000;
          }
        }
      }
    }
    .no-data {
      overflow: hidden;
      background: #fff;
      border-radius: 0 0 .3rem .3rem;
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
    border-top: 1px solid #DCDCDC;
    .service-btn,.task-btn {
      height: .8rem;
      line-height: .8rem;
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
      &.gray {
        background: #ACACAC;
        color: #fff;
      }
      &.yellow1 {
        background: #FFCA00;
        color: #000000;
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
    p {
      margin: .15rem;
      color: #E8382B;
    }
  }
  .confirm-content {
    text-align: center;
    color: #252525;
    line-height: .4rem;
  }

}
</style>