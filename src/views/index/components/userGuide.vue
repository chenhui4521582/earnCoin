<template>
  <div class="user-guide">
    <div class="step1" v-if="step == 1">
      <div class="cover"></div>
    </div>
    <div class="step2" v-if="step == 2"></div>
    <div class="step3" v-if="step == 3"></div>
  </div>
</template>
<script>
export default {
  name: 'userGuide',
  data: () => ({
    step: 1
  })  
}
</script>
<style lang="less" scoped>

</style>