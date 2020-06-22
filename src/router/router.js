import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import(/* webpackChunkName: "Home" */ '../views/index/index')
    },
    {
      path: '/task',
      name: 'Task',
      component: () => import(/* webpackChunkName: "Task" */ '../views/task/task')
    }
  ]
})
