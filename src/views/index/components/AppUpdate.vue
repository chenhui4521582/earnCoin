<template>
    <!-- 版本弹框 -->
    <Modal v-model="showVersion" :title="version.title" :closeIconShow=false :type="3">
      <div class="version-content">
        {{version.description}}
      </div>
      <div class="version-btn" slot="footer">
        <div class="download" @click="downLoad">立即升级</div>
      </div>
    </Modal>
</template>
<script>
import AppCall from '@/utils/native/'
import { getAppVersion } from '@/services/user'
import _get from 'lodash.get'
export default {
  name: 'AppUpdate',
  data: () => ({
    version: {},
    showVersion: false
  }),
  methods: {
    downLoad () {
      window.location.href = this.version.url
    },
    hideModal () {
      this.showVersion = false
    },
    async _getCurrAppVersion () {
      try {
        let product = await AppCall.getProductData()
        product && ( product = JSON.parse(product) )
        if(product.appVersion) {
          localStorage.setItem('APP_VERSION', product.appVersion)
          this._getNewAppVersion()
        }
      } catch {

      }
    },
    _getNewAppVersion () {
      getAppVersion().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.version = data
          if(this.version.force == 1) {
            this.version.title = `版本更新：${data.version}`
            this.showVersion = true
          }
        }
      })
    },
  },
  mounted () {
    this._getCurrAppVersion()
  }
}
</script>
<style scoped lang="less">
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