<template>
  <div class="banner" v-if="showBanner">
    <a :href="url">
      <img class="inner-img" :src="img | filter" alt="">
    </a>
  </div>
</template>
<script>
import { isShowBanner } from '@/services/user'
import _get from 'lodash.get'
export default {
  name: 'banner',
  data: () =>({
    img: '',
    url: ''
  }),
  computed: {
    showBanner () {
      return this.img && this.url
    }
  },
  methods: {
    _getBanner () {
      isShowBanner().then(res => {
        const { code, data, message } = _get(res, 'data')
        console.log(data)
        if(code == 200) {
          this.img = _get(res, 'data.data.img', '')
          this.url = _get(res, 'data.data.url', '')
        }
      })
    }
  },
  mounted () {
    this._getBanner()
  }
}
</script>
<style lang="less" scoped>
.banner {
  margin-bottom: .2rem;
}
</style>