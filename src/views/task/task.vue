<template>
  <div class="task">
    <wf-header title="高额赚" />
    <sign />
    <task-info />
    <base-footer />
  </div>
</template>
<script>
import BaseFooter from '@/components/baseFooter/baseFooter'
import Sign from './components/sign/sign'
import TaskInfo from './components/taskInfo/taskInfo'
export default {
  name: 'Task',
  components: {
    BaseFooter,
    Sign,
    TaskInfo
  },
  mounted () {
    this.$marchSetsPoint('A_H5PT0303003635')
  }
}
</script>
<style lang="less" scoped>
.task {
  padding: 1.2rem 0 1.1rem;
  min-height: 100vh;
  background: #F2F2F2;
}
</style>