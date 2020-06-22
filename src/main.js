import Vue from 'vue'
import App from '@/Main.vue'
import router from '@/router/router'
import store from '@/store'
import CommonComponents from '@/components'
import './utils/rem'
Vue.use(CommonComponents)
Vue.config.productionTip = false
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')