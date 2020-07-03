import Modal from './modal/modal.vue'
import Toast from './toast/index'
import Loading from './loading/loading'
import NoData from './noData/noData'
import Header from './header/header'
import Filters from './Filters'

// 自定义全局组件
const components = [
  Modal,
  Loading,
  NoData,
  Header
]

const install = function (Vue) {
  if (install.installed) return
  components.map(component => {
    Vue.component(component.name, component)
  })

  Filters.map(filter => {
    Vue.filter(filter.name, filter.method)
  })
  Vue.use(Toast)
}

// Vue 是全局变量时，自动 install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { install }
