<template>
  <h2 class="text-title text-center mb-10">放心初-每日精選</h2>
  <div class="row product-content">
    <div class="col-lg-3 mb-4 p-relative hover-big" v-for="item in products" :key="item.id">
      <div class="addToCart">
        <button class="user-btn user-btn-thirdary py-3">加入購物車</button>
      </div>
      <router-link :to="'/product/'+ item.id ">
        <CardView
        :title-color="'white'"
        :product="item"
        ></CardView>
      </router-link>
    </div>
  </div>
</template>

<script>
import CardView from '@/components/CardView.vue'
export default {
  data () {
    return {
      products: [],
      cart: []
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
  .addToCart{
    position: absolute;
    @include absCenter();
    top: 45%;
    z-index: -100;
    opacity: 0;
    transition: .5s;
    &:hover{
      button{
        background-color: $primary;
      }
    }
  }
  .hover-big{
    transition: .5s;
    &:hover{
      transform: scale(1.05);
      .addToCart{
        opacity: 1;
        z-index: 100;
      }
    }
  }
</style>
