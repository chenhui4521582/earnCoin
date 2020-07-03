<template>
  <footer class="footer-warp">
    <div class="item" v-for="(item, index) in footerList" :key="index" @click="changeRouter(item)">
      <img :src="routerName == item.routerName ? item.activeBg : item.defaultBg" alt="" />
      <div class="name" :class="{'active': routerName == item.routerName}">{{ item.name }}</div>
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
          defaultBg: require('./image/my_default.png'),
          activeBg: require('./image/my_active.png')
        },
        {
          name: '点我赚',
          routerName: 'task',
          defaultBg: require('./image/index_default.png'),
          activeBg: require('./image/index_active.png')
        }
      ],
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
      }
      this.$emit('on-change', item.routerName)
      this.$router.push({ name: item.routerName })
    },
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
  border-top: 1px solid #DCDCDC;
  .item {
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
  }
}
</style>
