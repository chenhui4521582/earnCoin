<template>
  <div class="my-task">
    <template v-if="showList">
      <div class="task-item" v-for="(item, index) in list" :key="index" @click="goDetail(item)">
        <div class="group">
          <div class="task-img">
            <img class="inner-img" :src="item.icon | filter" alt="">
          </div>
          <div class="task-desc">
            <div class="name">{{item.name}}</div>
            <!-- <div class="desc">{{childTask(item.remark)[0].name}}</div> -->
          </div>
          <div class="num">
            <div class="total">+{{item.award || 0}}</div>
            <div class="add">已赚 {{item.finish || 0}}</div>
          </div>
        </div>
        <div class="task-group">
          <div class="task" v-for="(innerItem, innerIndex) in childTask(item.remark)" :key="innerIndex">
            <div class="finish-name">{{innerItem.name}}</div>
            <div class="finish-num">+{{innerItem.award}}</div>
          </div>
        </div>
        <div class="btn underway " v-if="item.status == 0" >进行中</div>
        <div class="btn finish" v-if="item.status == 1">已完成</div>
      </div>
    </template>
    <div class="no-list" @click="goGreatTask" v-else>
      <img class="inner-img" src="../../img/no-list.png" alt="">
    </div>
  </div>
</template>
<script>

export default {
  name: 'myTask',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    showList () {
      return this.list.length
    }
  },
  methods: {
    goDetail ({id, status, name}) {
      if(status == 0) {
        this.$marchSetsPoint('A_H5PT0303003640', {
          task_id: id,
          task_name: name
        })
      }
      if(status == 1) {
        this.$marchSetsPoint('A_H5PT0303003641', {
          task_id: id,
          task_name: name
        })
      }
      this.$emit('goDetail', id)
    },
    /** 子任务 **/
    childTask (task) {
      if(task) {
        const children = task.split('#')
        let list = []
        children.forEach(item => {
          list.push({
            name: item.split('/')[1],
            award: item.split('/')[0]
          })
        })
        return list
      }
      return []
    },
    goGreatTask () {
      this.$emit('switchTab')
    }
  }
}
</script>
<style lang="less" scoped>
.my-task {
  margin-top: .15rem;
  overflow: hidden;
  .task-item {
    position: relative;
    margin-bottom: .2rem;
    padding: .2rem;
    background: #fff;
    border-radius: .3rem;
    .group {
      margin-bottom: .2rem;
      display: flex;
      justify-content: flex-start;
    }
    .task-group {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    .task-img {
      margin-right: .2rem;
      width: .8rem;
      height: .8rem;
    }
    .task-desc {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .name {
        margin-bottom: .08rem;
      }
    }
    .num {
      position: absolute;
      right: .2rem;
      top: .2rem;
      font-weight: bold;
      height: .8rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: right;
      .total {
        margin-bottom: 0.08rem;
        color: #D39436;
      }
      .add {
        color: #E8382B;
      }
    }
    .task {
      margin-bottom: .11rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      &:last-child {
        margin-bottom: 0;
      }
      .finish-name {
        width: 3rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: .12rem;
        font-size: .2rem;
        color: #666666;
      }
      .finish-num {
        margin-right: .2rem;
        padding: 0 .1rem;
        height: .3rem;
        text-align: center;
        line-height: .3rem;
        color: #E8382B;
        font-size: .2rem;
        border: 1px solid #E8382B;
        border-radius: .06rem;
      }

    }
    .btn {
      position: absolute;
      right: .2rem;
      bottom: .2rem;
      width: 1.5rem;
      height: .5rem;
      line-height: .5rem;
      text-align: center;
      font-size: .26rem;
      font-weight: bold;
      color: #D39436;
      font-weight: bold;
      border-radius: .4rem;
      background: #FFE790;
      &.underway {
        color: #000000;
        background: #FFCA00;
      }
      &.finish {
        background: #DCDCDC;
        color: #FFFFFF;
      }
    }
  }
  .no-list {
    width: 100%;
    height: 2.1rem;
  }
}
</style>