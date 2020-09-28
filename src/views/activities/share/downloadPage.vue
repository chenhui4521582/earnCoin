<template>
  <div class="download-page">
    <div class="mask" v-if="showWechatTips"></div>
    <div class="wechat-tips" v-if="showWechatTips">
      1.点击右上角“...”按钮；<br>
      2.选择浏览器打开。
    </div>
    <div class="download-btn"></div>
  </div>
</template>
<script>
import { newUtils, getUrlParams } from '@/utils/utils'
import { share_download } from '@/services/activities'
import ClipboardJS from 'clipboard/dist/clipboard.min.js'
import _get from 'lodash.get'
export default {
  name: 'downloadPage',
  data: ()=> ({
    showWechatTips: false,
    clipboardJS: null
  }),
  methods: {
    copy () {
      let clipboardJS = new ClipboardJS('.download-btn', {
      text: () => {
        if(newUtils.isWechat()) {
          this.showWechatTips = true
          return 
        }
        this.download()
        return `from=earnShareNewUser&userId=${getUrlParams('userId')}`;
      }
      })
      clipboardJS.on('success', (e) => {
        console.log(e)
      });
    },
    download () {
      share_download().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          const url = _get(res, 'data.data')
          url && (window.location.href = url)
        }
      })
    }
  },
  mounted () {
    let access = getUrlParams('token')
    let channel = getUrlParams('channel')
    this.copy()
  }
}
</script>
<style lang="less" scoped>
.download-page {
  height: 100vh;
  background: url(./img/download-bg.png) no-repeat center top;
  background-size: 100% auto;
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,.6);
    z-index: 2;
  }
  .wechat-tips {
    padding: 0.33rem 0 0 .05rem;
    position: absolute;
    right: .1rem;
    top: .1rem;
    z-index: 5;
    width: 2.84rem;
    height: 1.16rem;
    background: url(./img/wechat-tips.png) no-repeat center top;
    background-size: 100% 100%;
  }
  .download-btn {
    position: absolute;
    left: 50%;
    bottom: .64rem;
    transform: translate(-50%, 0);
    z-index: 1;
    width: 5.86rem;
    height: 1.16rem;
    background: url(./img/download-btn.png) no-repeat center top;
    background-size: 100% 100%;
  }
}
</style>