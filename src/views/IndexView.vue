<template>
  <HeaderView v-if="is_show_header"></HeaderView>
  <router-view></router-view>
  <FooterView></FooterView>
  <MobileFooter v-if="is_show_footer"></MobileFooter>
</template>

<script>
import HeaderView from '@/components/HeaderView.vue'
import FooterView from '@/components/FooterView.vue'
import MobileFooter from '@/components/MobileFooter.vue'
export default {
  data () {
    return {
      is_show_footer: true,
      is_show_header: true
    }
  },
  components: {
    HeaderView,
    FooterView,
    MobileFooter
  },
  created () {
    this.$emitter.on('hideFooter', (status) => {
      this.is_show_footer = status
    })
    this.$emitter.on('hideHeader', (status) => {
      this.is_show_header = status
    })
  },
  beforeUnmount () {
    this.$emitter.off('hideFooter')
    this.$emitter.off('hideHeader')
  }
}
</script>

<style lang="scss" scoped>
  .price{
    p{
      padding: 0;
    }
  }
</style>
