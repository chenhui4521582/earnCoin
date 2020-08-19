<template>
  <div class="duration-entry" 
  v-if="activitiesInfo.show"
  :class="{'rotate': animation=='rotate', 'scale': animation == 'scale'}" 
  @click="goActivities"
  >
    <img class="inner-img" src="./egg.png" alt="">
  </div>
</template>
<script>
import axios from 'axios'
import _get from 'lodash.get'
export default {
  name: 'durationEntry',
  data: () => ({
    activitiesInfo: {}
  }),
  computed: {
    animation () {
      if(this.activitiesInfo.awards || this.activitiesInfo.firstEnter) {
        return 'rotate'
      }
      return 'scale'
    }
  },
  methods: {
    _getInfo () {
      let url = '//platform-api.beeplaying.com/point/api/game/duration/popup'
      axios.post(url).then( res => {
        const {code, data, message} = _get(res, 'data')
        if( code == 200) {
          this.activitiesInfo = data
          this.activitiesInfo.firstEnter = true
        }
      })
    },
    goActivities () {
      const { name } = this.$route
      switch (name) {
        case 'index':
          this.$marchSetsPoint('A_H5PT0303003972')
          break
        case 'task':
          this.$marchSetsPoint('A_H5PT0303003973')
          break
        case 'my':
          this.$marchSetsPoint('A_H5PT0303003974')
          break
      }
      window.location.href = 'https://wap.beeplaying.com/activities/duration.html'
    }

  },
  mounted () {
    this._getInfo()
  }
}
</script>
<style scoped lang="less">
.duration-entry {
  position: fixed;
  z-index: 10;
  right: 0;
  top: 5rem;
  width: 1.6rem;
  height: 1.54rem;
  &.rotate {
    animation: rotate 1s infinite;
  }
  &.scale {
    animation: scale 1s infinite;
  }
}
@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  10% {
    transform: rotate(-10deg);
  }
  20% {
    transform: rotate(10deg);
  }
  25% {
    transform: rotate(-5deg);
  }
  30% {
    transform: rotate(5deg);
  }
  35% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(0);
  }
}
</style>