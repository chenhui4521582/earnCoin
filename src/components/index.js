import Modal from './modal/modal.vue'
import Toast from './toast/toast'
import Filters from './Filters'

// 自定义全局组件
const components = [
  Modal,
  loading
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
