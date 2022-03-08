<template>
  <LoadingView :active="isLoading"></LoadingView>
  <h2 class="text-title text-center mb-10">放心初-每日精選</h2>
  <div class="row product-content">
    <div class="col-lg-3 mb-4 p-relative hover-big" v-for="item in products" :key="item.id">
      <div class="addToCart">
        <button
          @click="addCart(1, item.id)"
          type="button"
          class="user-btn user-btn-thirdary py-3"
          :disabled="isBtnLoading === item.id"
        >
          <span v-if="isBtnLoading === item.id">
            <i class="fas fa-pulse fa-spinner"></i>
          </span>
          <span v-else>加入購物車</span>
        </button>
      </div>
      <router-link :to="'/product/'+ item.id ">
        <CardView
        :title-color="'white'"
        :product="item"
        ></CardView>
      </router-link>
    </div>
  </div>
  <PageView
      :pagination="pagination"
      :style="style"
      @get-product="getProducts"
  >
  </PageView>
</template>

<script>
import CardView from '@/components/CardView.vue'
import PageView from '@/components/PageNation.vue'
export default {
  data () {
    return {
      products: [],
      cart: [],
      tempCartProduct: {},
      pagination: {},
      style: {
        bg: '#C59854',
        hoverBg: '#A01800'
      },
      isLoading: false,
      isBtnLoading: ''
    }
  },
  components: {
    CardView,
    PageView
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((err) => {
          console.dir(err)
        })
    },
    getCart () {
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.$emitter.emit('updateCart', res.data.data)
        })
        .catch((err) => {
          console.dir(err)
        })
    },
    addCart (qty, id) {
      const data = {
        data: {
          product_id: id,
          qty: qty
        }
      }
      this.isBtnLoading = id
      this.$http
        .post(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/cart`, data)
        .then(() => {
          this.getCart()
          this.isBtnLoading = ''
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
    width: 100px;
    button{
      width: 100%;
    }
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
