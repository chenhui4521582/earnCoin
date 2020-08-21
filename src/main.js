import Vue from 'vue'
import App from '@/Main.vue'
import router from '@/router/router'
import store from '@/store'
import CommonComponents from '@/components'
import VueClipboard from 'vue-clipboard2'
import { marchSetsPoint } from '@/utils/utils'
import './utils/rem'
Vue.use(CommonComponents)
Vue.use(VueClipboard)
Vue.prototype.$marchSetsPoint = marchSetsPoint
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/** 梦工厂游戏初始化 **/
window.earnCoinAppInit = function () {
  alert(111111)
}

