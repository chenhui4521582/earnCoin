<template>
  <div class="task-info">
    <div class="nav">
      <div class="item" :class="{'active': currentIndex == 1}" @click="handclick(1)">
        <i>高额任务</i>
      </div>
      <div class="item" :class="{'active': currentIndex == 2}" @click="handclick(2)">
        <i>我的任务</i>
      </div>
    </div>
    <great-task v-show="currentIndex == 1" :list="greatTaskList" @goDetail="goDetail"/>
    <my-task v-show="currentIndex == 2" :list="myTaskList" @switchTab="handclick(1)" @goDetail="goDetail"/>
  </div>
</template>
<script>
import GreatTask from './greatTask'
import MyTask from './myTask'
import { getGreatTaskList, getMyTaskList } from '@/services/task'
import _get from 'lodash.get'
export default {
  name: 'taskInfo',
  data: () => ({
    currentIndex: 1,
    myTaskList: [],
    greatTaskList: [],
  }),
  components: {
    GreatTask,
    MyTask
  },
  methods: {
    handclick (index) {
      this.currentIndex = index
      if(index == 1) {
        this._getGreatTaskList()
        this.$marchSetsPoint('A_H5PT0303003638')
      }
      if(index == 2) {
        this._getMyTaskList()
        this.$marchSetsPoint('A_H5PT0303003639')
      }
    },
    goDetail (id) {
      this.$router.push({
        name: 'taskDetail',
        query: { id }
      })
      localStorage.setItem('taskCurrent', this.currentIndex) 
    },
    /** 获取任务列表 **/
    _getMyTaskList (callback) {
      getMyTaskList().then( res=> {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.myTaskList = data
          callback && callback()
        }
      })
    },
    /** 获取任务列表 **/
    _getGreatTaskList (callback) {
      getGreatTaskList().then( res=> {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.greatTaskList = data
          callback && callback()
        }
      })
    },
    /** scrll定位 **/
    goScroll () {
      let scroll = localStorage.getItem('taskScrllTop')
      if(scroll) {
        window.scrollTo(0, scroll);
      }
    },
    bodyOnscrll () {
      clearTimeout(timer)
      let timer = setTimeout(() => {
        let scroll = (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop)
        if(scroll) {
          localStorage.setItem('taskScrllTop', scroll)
          localStorage.setItem('taskCurrent', this.currentIndex)
        }
      }, 500)
    },
    async init () {
      const taskCurrent = _get(this.$route, 'params.taskCurrent') || localStorage.getItem('taskCurrent') || 1
      const from = _get(this.$route, 'params.from')
      this.currentIndex = taskCurrent
      /** 首页点击过来 **/
      if(taskCurrent == 1 && from) {
        const res = await getMyTaskList()
        const {code, data, message} = _get(res, 'data')
        let runTask = data && data.find(item => item.status == 0)
        if(runTask) {
          this.myTaskList = data
          this.currentIndex = 2
          return 
        }
      } 
      if(taskCurrent == 1) {
        this._getGreatTaskList(() => {
          this.$nextTick(() => {
            this.goScroll()
          })
        })
      }
      if(taskCurrent == 2) {
        this._getMyTaskList(() => {
          this.$nextTick(() => {
            this.goScroll()
          })
        })
      }
    }
  },
  mounted () {
    this.init()
    document.addEventListener('touchmove', this.bodyOnscrll, false)
  },
  beforeDestroy () {
    document.removeEventListener('touchmove', this.bodyOnscrll, false)
  }
}
</script>
<style lang="less" scoped>
.task-info {
  padding: 0 .3rem;
  .nav {
    display: flex;
    justify-content: flex-start;
    .item {
      position: relative;
      margin-right: .2rem;
      height: .57rem;
      line-height: .6rem;
      i {
        font-size: .32rem;
        font-style: normal;
        color: #000;
        font-weight: bold;
      }
    }
    .active {
      line-height: .55rem;
      &::after {
        content: '';
        position: absolute;
        bottom: .08rem;
        left: 0;
        z-index: 1;
        height: .1rem;
        width: 100%;
        background: #FFC300;
      }
      i {
        position: relative;
        z-index: 2;
        font-size: .42rem;
        font-style: normal;
        color: #000;
        font-weight: bold;
      }
    }
  }
}
</style>