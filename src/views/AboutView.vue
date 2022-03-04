<template>
  <div class="about">
    <BannerView></BannerView>
    <div class="container">
      <h1 class="text-center my-4">This is an about page</h1>
        <div class="d-flex">
          <template v-for="item in 5" :key="item">
             <CardView></CardView>
          </template>
        </div>
    </div>
  </div>
</template>

<script>
import CardView from '@/components/CardView.vue'
import BannerView from '@/components/BannerView.vue'

export default {
  components: {
    CardView,
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
