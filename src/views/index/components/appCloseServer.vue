<template>
  <div class="app-close-server">
    <Modal 
      v-model="showPopup" 
      :saveButtonShow="false" 
      :closeIconShow="false" 
      :type=5
      title="公告"
      @on-close="hide"
    >
      <div class="close-wrap">
        <!-- 还没有关服 -->
        <div class="close-server-no" v-if="isClose == 2">
          <p>游戏赚 平台将于2020年10月31日12:00停止运营，感谢玩家这段时间的信任。</p>
          <p>请达到提现标准但还未兑换金币的玩家，在停运日期前兑换平台内金币。</p>
          <div class="close-btn" @click="hide"></div>
          <div class="continue-btn" @click="hide">知道了</div>
        </div>
        <!-- 已经关服 -->
        <div class="close-server-yes"  v-if="isClose == 1">
          <p>游戏赚 平台</p>
          <p>于2020年10月31日12:00 已停止运营， 感谢玩家这段时间的信任。</p>
        </div>
      </div>
    </Modal>    
  </div>
</template>
<script>
import { closeServer } from '@/services/index'
import _get from 'lodash.get'
export default {
  name: 'appCloseServer',
  data: () => ({
    showPopup: false,
    isClose: 0
  }),
  methods: {
    hide () {
      this.showPopup = false
      this.$emit('popupSortHide')
    },
    init (callback) {
      closeServer().then(res => {
        const { code, data, message } = _get(res, 'data')
        if(code == 200) {
          if(data) {
            this.isClose = 1
          }else {
            this.isClose = 2
          }
        }
        this.showPopup = true
        callback && callback(true)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.app-close-server {
}
.close-wrap {
  
  .close-server-no {
    p {
      padding: 0 .1rem .2rem;
      font-size: .24rem;
      line-height: .35rem;
      &:nth-child(1){}
      &:nth-child(2){
        color: #E8382B;
      }
    }
    .continue-btn {
      margin: .23rem auto 0;
      width: 2.4rem;
      height: .7rem;
      line-height: .7rem;
      text-align: center;
      font-size: .26rem;
      color: #000000;
      background: #FFCA00;
      border-radius: .35rem;
      font-weight: bold;
    }
    .close-btn {
      position: absolute;
      right: .2rem;
      top: .2rem;
      position: absolute;
      height: .2rem;
      width: .2rem;
      top: .37rem;
      right: .31rem;
      background: url('~@/components/modal/assets/close.png') no-repeat;
      background-size: 100% 100%;
    }
  }
  .close-server-yes {
    padding: 0 .1rem .2rem;
    min-height: 2.5rem;
    color: #000;
    p {
      margin-bottom: .1rem;
      line-height: .34rem;
    }
  }
}
</style>