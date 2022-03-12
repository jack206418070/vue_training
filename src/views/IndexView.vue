<template>
  <HeaderView></HeaderView>
  <router-view></router-view>
  <FooterView></FooterView>
</template>

<script>
import HeaderView from '@/components/HeaderView.vue'
import FooterView from '@/components/FooterView.vue'
export default {
  components: {
    HeaderView,
    FooterView
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
