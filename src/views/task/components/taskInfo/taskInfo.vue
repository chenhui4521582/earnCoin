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
    <great-task v-show="currentIndex == 1" :list="greatTaskList"/>
    <my-task v-show="currentIndex == 2" :list="myTaskList" />
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
    /** 获取任务列表 **/
    _getMyTaskList () {
      getMyTaskList().then( res=> {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.myTaskList = data
        }
      })
    },
    /** 获取任务列表 **/
    _getGreatTaskList () {
      getGreatTaskList().then( res=> {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.greatTaskList = data
        }
      })
    }
  },
  mounted () {
    const { currentIndex = 1 } = this.$route.query
    this.handclick(currentIndex)
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