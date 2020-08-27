<template>
  <div class="task-items">
    <div class="task-item" v-for="(item, index) in list" :key="index" @click="goDetail(item)">
      <div class="task-img">
        <img class="inner-img" :src="item.icon | filter" alt="">
      </div>
      <div class="task-desc">
        <div class="name">{{item.name}}</div>
        <div class="desc">{{item.remark}}</div>
      </div>
      <div class="add-num">+{{item.award}}</div>
      <div class="btn" >去完成</div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'greatTask',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goDetail ({id, name}) {
      this.$marchSetsPoint('A_H5PT0303003637', {
        task_id: id,
        task_name: name
      })
      this.$emit('goDetail', id)
    }
  }
}
</script>
<style lang="less" scoped>
.task-items {
  margin-top: .15rem;
  overflow: hidden;
  .task-item {
    position: relative;
    margin-bottom: .2rem;
    padding: .2rem;
    display: flex;
    justify-content: flex-start;
    background: #fff;
    border-radius: .3rem;
    .task-img {
      margin-right: .2rem;
      width: .8rem;
      height: .8rem;
      border-radius: .15rem;
      overflow: hidden;
    }
    .task-desc {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 3.6rem;
      .name {
        margin-bottom: .08rem;
      }
      .desc {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      } 
    }
    .add-num {
      position: absolute;
      right: .35rem;
      top: .15rem;
      color: #FF543A;
      font-weight: bold;
    }
    .btn {
      position: absolute;
      right: .2rem;
      bottom: .18rem;
      width: 1.5rem;
      height: .5rem;
      line-height: .5rem;
      text-align: center;
      font-size: .28rem;
      font-weight: bold;
      border-radius: .4rem;
      color: #000000;
      background: #FFCA00;
    }
  }
}
</style>