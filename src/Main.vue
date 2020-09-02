<template>
  <div id="app">
    <transition v-if="keepAlive" :name="transitionName">
      <router-view v-if="keepAlive"></router-view>
    </transition>
    <router-view v-if="!keepAlive" />
    <login />
  </div>
</template>
<script>
import Login from '@/components/login/login'
import { newUtils } from '@/utils/utils'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'APP',
  data: () => ({
    transitionName: ''
  }),
  components: {
    Login
  },
  computed: {
    ...mapState(['APP_VERSION', 'isVisitory', 'deviceId']),
    keepAlive () {
      return !!(this.$route.meta && this.$route.meta.keepAlive)
    }
  },
  methods: {
    ...mapActions({
      _userIsVisitor: 'USER_IS_VISITOR',
      _getDeviceId: 'GET_DEVICEID',
      _getAppVersion: 'GET_APP_VERSION'
    })
  },
  mounted () {
    /**
     * 获取设备id
     * 获取app版本
     **/
    this._getDeviceId()
    this._getAppVersion()
    this._userIsVisitor()
  },
  watch: {
    $route (to, from) {
      /**
       * 添加缓存处理
       * 如果to的索引值为1，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
       **/
      if (to.meta.index > 1) {
        if (to.meta.index < from.meta.index) {
          this.transitionName = 'slide-right'
        } else if (to.meta.index > from.meta.index) {
          this.transitionName = 'slide-left'
        }
      } else if (to.meta.index == 1 && from.meta.index > 1) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = ''
      }
      /* 路由发生变化修改页面title */
      if (to.meta.title) {
        document.title = to.meta.title
      }
      /** 切换路由的时候解除页面锁定 **/
      newUtils.ScrollMove()
    }
  }
}
</script>

<style lang="less">
@import url('./assets/less/base.less');
@import url('./assets/iconfont/iconfont.css');
#app {
  font-size: 0.24rem;
  color: #333333;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.2s;
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
}
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-active {
  transform: translateX(100%);
}
.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-leave-active {
  transform: translateX(-100%);
}
</style>
