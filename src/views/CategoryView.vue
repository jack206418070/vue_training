<template>
  <h2 class="text-title text-center mb-10">放心初-每日精選</h2>
  <div class="product-content d-flex flex-wrap">
    <template v-for="item in 5" :key="item">
      <CardView
        :title-color="'white'"
      ></CardView>
    </template>
  </div>
</template>

<script>
import CardView from '@/components/CardView.vue'
export default {
  components: {
    CardView
  }
}
</script>

<style lang="scss" scoped>
  .card{
    flex: 0 0 24%;
    margin-right: 1%;
  }
</style>
