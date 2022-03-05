<template>
  <h2 class="text-title text-center mb-10">放心初-每日精選</h2>
  <div class="row product-content">
    <div class="col-lg-3" v-for="item in products" :key="item.id">
      <CardView
        :title-color="'white'"
        :product="item"
      ></CardView>
    </div>
  </div>
</template>

<script>
import CardView from '@/components/CardView.vue'
export default {
  data () {
    return {
      products: []
    }
  },
  components: {
    CardView
  },
  methods: {
    getProducts () {
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/products`)
        .then((res) => {
          this.products = res.data.products
        })
        .catch((err) => {
          console.dir(err)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
  .card{
    flex: 0 0 30%;
  }
</style>
