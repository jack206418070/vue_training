<template>
  <HeaderView></HeaderView>
  <router-view></router-view>
  <FooterView></FooterView>
  <MobileFooter></MobileFooter>
</template>

<script>
import HeaderView from '@/components/HeaderView.vue'
import FooterView from '@/components/FooterView.vue'
import MobileFooter from '@/components/MobileFooter.vue'
export default {
  components: {
    HeaderView,
    FooterView,
    MobileFooter
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
