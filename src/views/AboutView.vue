<template>
  <div class="about">
    <BannerView></BannerView>
    <div class="container">
      <h1 class="text-center my-4">This is an about page</h1>
    </div>
  </div>
</template>

<script>
import BannerView from '@/components/BannerView.vue'

export default {
  components: {
    BannerView
  }
}
</script>

<style lang="scss">
  .card{
    flex: 0 0 19%;
    margin-right: 1%;
  }
</style>
