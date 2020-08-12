<template>
  <footer class="footer-warp">
    <div class="item" v-for="(item, index) in footerList" :key="index" @click="changeRouter(item)">
      <img :src="routerName == item.routerName ? item.activeBg : item.defaultBg" alt="" />
      <div class="name" :class="{'active': routerName == item.routerName}">{{ item.name }}</div>
      <!-- 任务标签Tips -->
      <div class="task-tips" v-if="taskTips && item.routerName == 'task'">
        <img class="inner-img" src="./image/task_tips.png" alt="">
      </div>
    </div>
  </footer>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'baseFooter',
  data () {
    return {
      footerList: [
        {
          name: '首页',
          routerName: 'index',
          defaultBg: require('./image/index_default.png'),
          activeBg: require('./image/index_active.png')
        },
        {
          name: '点我赚',
          routerName: 'task',
          defaultBg: require('./image/task_default.png'),
          activeBg: require('./image/task_active.png')
        },
        {
          name: '我的',
          routerName: 'my',
          defaultBg: require('./image/my_default.png'),
          activeBg: require('./image/my_active.png')
        }
      ],
      taskTips: null
    }
  },
  computed: {
    routerName () {
      return this.$route.name
    }
  },
  methods: {
    async changeRouter (item) {
      if(item.routerName == 'task') {
        this.$marchSetsPoint('A_H5PT0303003627')
        this.$router.push({ 
          name: item.routerName,
          params: {
            'taskCurrent': 1,
            'from': 'index'
          }
        })
        this.taskTips = false
        localStorage.setItem('earnCoin_taskTips', `${this.endTime()}`)
        return 
      }
      this.$router.push({ name: item.routerName })
    },
    endTime() {
      let date = new Date()
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      return new Date(`${y}/${m}/${d}`).getTime()
    },
    taskTipsInit () {
      let endTime = this.endTime()
      let cacheTime = localStorage.getItem('earnCoin_taskTips')
      this.taskTips = false;
      if (cacheTime) {
        if(endTime != cacheTime){
          this.taskTips = true;
        }
      } else {
        this.taskTips = true;
      }
    }
  },
  mounted () {
    this.taskTipsInit()
  }
}
</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.footer-warp {
  position: fixed;
  bottom: 0;
  height: 1.1rem;
  width: 100%;
  background-color: #ffffff;
  left: 0;
  display: flex;
  z-index: 10;
  border-top: 1px solid #F2F2F2;
  .item {
    position: relative;
    flex: 1;
    text-align: center;
    padding: 0.1rem 0;
    font-size: 0.2rem;
    position: relative;
    img {
      margin: 0 auto;
      display: block;
      width: 0.6rem;
    }
    .name {
      color: #ACACAC;
      &.active {
        color: #666666;
      }
    }
    .task-tips {
      position: absolute;
      left: 50%;
      top: -.7rem;
      transform: translate(-50%, 0);
      width: 1.9rem;
      height: .7rem;
      animation: tips infinite 2s;
      img {
        width: 100%;
      }
    }
  }
}
@keyframes tips {
  0% {transform: translate(-50%, 0);}
  50% {transform: translate(-50%, -.1rem);}
  100% {transform: translate(-50%, 0);}
}
</style>
