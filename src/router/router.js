import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import(/* webpackChunkName: "index" */ '../views/index/index')
    },
    {
      path: '/task',
      name: 'task',
      component: () => import(/* webpackChunkName: "Task" */ '../views/task/task')
    },
    {
      path: '/task/detail',
      name: 'taskDetail',
      component: () => import(/* webpackChunkName: "taskDetail" */ '../views/task/detail')
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: () => import(/* webpackChunkName: "witchdraw" */ '../views/withdraw/withdraw')
    },
    {
      path: '/withdraw/log',
      name: 'withdrawLog',
      component: () => import(/* webpackChunkName: "withdrawLog" */ '../views/withdraw/withdrawLog')
    },
    {
      path: '/withdraw/course',
      name: 'withdrawCourse',
      component: () => import(/* webpackChunkName: "withdrawCourse" */ '../views/withdraw/withdrawCourse')
    },
    {
      path: '/withdraw/gzhBind',
      name: 'gzhBind',
      component: () => import(/* webpackChunkName: "gzhBind" */ '../views/withdraw/gzhBind')
    }
  ]
})
