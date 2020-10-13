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
        <p>“玩游戏赚金币”活动将于2020年10月31号12:00结束。“多多玩游戏”平台依旧正常运营，活动结束后玩家依旧可以在“多多玩游戏”平台玩游戏。</p>
        <p>请达到提现标准但还未兑换金币的玩家，在停运日期前兑换平台内金币。</p>
        <div class="close-btn" @click="hide"></div>
        <div class="continue-btn" @click="goDDW">去多多玩</div>
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
  }),
  methods: {
    goDDW () {
      window.location.href = 'https://wap.beeplaying.com/xmWap/#/'
    },
    hide () {
      this.showPopup = false
      this.$emit('popupSortHide')
    },
    init (callback) {
      this.showPopup = true
      callback && callback(true)
    }
  }
}
</script>
<style lang="less" scoped>
.app-close-server {
}
.close-wrap {
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
</style>