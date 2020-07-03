import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import(/* webpackChunkName: "index" */ '../views/index/index'),
      meta: {
        title: '高额赚'
      }
    },
    {
      path: '/task',
      name: 'task',
      component: () => import(/* webpackChunkName: "Task" */ '../views/task/task'),
      meta: {
        title: '高额赚'
      }
    },
    {
      path: '/task/detail',
      name: 'taskDetail',
      component: () => import(/* webpackChunkName: "taskDetail" */ '../views/task/detail'),
      meta: {
        title: '任务详情'
      }
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: () => import(/* webpackChunkName: "witchdraw" */ '../views/withdraw/withdraw'),
      meta: {
        title: '提现'
      }
    },
    {
      path: '/withdraw/log',
      name: 'withdrawLog',
      component: () => import(/* webpackChunkName: "withdrawLog" */ '../views/withdraw/withdrawLog'),
      meta: {
        title: '提现'
      }
    },
    {
      path: '/withdraw/course',
      name: 'withdrawCourse',
      component: () => import(/* webpackChunkName: "withdrawCourse" */ '../views/withdraw/withdrawCourse'),
      meta: {
        title: '提现'
      }
    },
    {
      path: '/withdraw/gzhBind',
      name: 'gzhBind',
      component: () => import(/* webpackChunkName: "gzhBind" */ '../views/withdraw/gzhBind'),
      meta: {
        title: '提现'
      }
    }
  ]
})
