<template>
  <div class="list">
    <!-- 任务菜单 -->
    <div class="item task" @click="goTask">
      <div class="icon">
        <img class="inner-img" src="../img/task-icon.png" alt="">
      </div>
      <div class="name">我的任务</div>
      <div class="red-dot" v-if="userInfo.taskNum"></div>
      <div class="desc">
        <span v-if="userInfo.taskNum">{{userInfo.taskNum}}个任务正在进行</span>
        <span class="iconfont icon-next"></span>
      </div>
    </div>
    <!-- 其他菜单 -->
    <div class="item" v-for="(item, index) in list" :key="index" @click="handClick(item)">
      <div class="icon">
        <img class="inner-img" :src="item.icon" alt="">
      </div>
      <div class="name">{{item.name}}</div>
      <div class="desc">
        <span v-if="item.desc">{{item.desc}}</span>
        <span class="iconfont icon-next"></span>
      </div>
    </div>
    <!-- 版本弹框 -->
    <Modal v-model="showVersion" :title="version.title">
      <div class="version-content">
        {{version.description}}
      </div>
      <div class="version-btn" slot="footer">
        <div class="download" @click="downLoad">立即升级</div>
      </div>
    </Modal>
  </div>
</template>
<script>
import AppCall from '@/utils/native/'
import { getAppVersion } from '@/services/user'
import _get from 'lodash.get'
export default {
  name: 'list',
  props: {
    userInfo: {
      type: Object,
      defult: () => {}
    }
  },
  data: () => ({
    version: {},
    showVersion: false,
    list: [
      {
        id: 'service',
        name: '联系客服',
        icon: require('../img/service-icon1.png'),
        fun: function () {
          this.$emit('openService')
        }
      },
      {
        id: 'task',
        name: '用户协议',
        icon: require('../img/agreement-icon.png'),
        fun: function () {
          window.location.href = 'https://wap.beeplaying.com/xmWap/#/my/userAgreement'
        }
      }
    ]
  }),
  methods: {
    goTask () {
      this.$router.push({
        name: 'task',
        params: {
          'taskCurrent': 2
        }
      })
    },
    handClick (item) {
      item.fun && item.fun.call(this)
    },
    _getNewAppVersion () {
      getAppVersion().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.version = data
          if (this.version.force == 0 || this.version.force == 1) {
            this.version.title = `版本更新：${data.version}`
            this.showVersion = true
          }
        }
      })
    },
    async _getCurrAppVersion () {
      try {
        let product = await AppCall.getProductData()
        product && ( product = JSON.parse(product) )
        if(product.appVersion) {
          localStorage.setItem('APP_VERSION', product.appVersion)
          this.list.push({
            id: 'version',
            name: '版本更新',
            desc: product.appVersion,
            icon: require('../img/version-icon.png'),
            fun: function () {
              this._getNewAppVersion()
            }
          })
          this.$emit('inApp')
        }
      } catch {}
    },
    downLoad () {
      window.location.href = this.version.url
    },
    hideModal () {
      this.showVersion = false
    }
  }, 
  mounted () {
    this._getCurrAppVersion()
  }
}
</script>
<style scoped lang="less">
.list {
  margin-bottom: .7rem;
  background: #fff;
  border-radius: .3rem;
  .item {
    padding: 0 .3rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 1rem;
    border-bottom: 1px solid #F2F2F2;
    &:last-child {
      border: none;
    }
    .icon {
      margin-right: .1rem;
      width: .3rem;
      height: .3rem;
    }
    .name {
      margin-right: .1rem;
      font-weight: bold;
    }
    .red-dot {
      width: .15rem;
      height: .15rem;
      border-radius: 5rem;
      background: #E8382B;
    }
    .desc {
      margin-left: auto;
      font-size: .24rem;
      color: #ACACAC;
      .iconfont{
        font-size: .24rem;
        color: #ACACAC;
      }
    }
  }
}
.version-content {
  line-height: .4rem;
}
.version-btn {
  overflow: hidden;
  .download {
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
  .close {
    text-align: center;
    font-size: .24rem;
    color: #ACACAC;
  }
}
</style>