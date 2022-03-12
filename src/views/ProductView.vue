<template>
  <BannerView></BannerView>
  <div class="container">
    <div class="user-product mt-10 mb-10">
      <div class="row">
        <div class="col-md-3">
          <DeskCategory></DeskCategory>
          <MobileCategory></MobileCategory>
        </div>
        <div class="col-md-9">
          <div class="content pb-3">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CartView :cart-data="cart" @get-cart="getCart"></CartView>
</template>

<script>
import BannerView from '@/components/BannerView.vue'
import CartView from '@/components/CartModal.vue'
import DeskCategory from '@/components/DeskCategory.vue'
import MobileCategory from '@/components/MobileCategory.vue'

export default {
  data () {
    return {
      cart: []
    }
  },
  components: {
    BannerView,
    CartView,
    DeskCategory,
    MobileCategory
  },
  methods: {
    getCart () {
      this.$emitter.emit('isLoading', true)
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data
          this.$emitter.emit('updateCart', res.data.data)
        })
        .catch((err) => {
          console.dir(err)
        })
    }
  },
  mounted () {
    this.getCart()
    this.$emitter.on('updateCart', (data) => {
      this.cart = data
    })
  }
}
</script>
