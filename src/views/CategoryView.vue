<template>
  <h2
    v-if="category !== '全部商品' && category !== '我的最愛'"
    class="text-title text-center mb-10"
  >放心初-精選{{ category }}</h2>
  <h2 v-else class="text-title text-center mb-10">{{ category }}</h2>
  <div class="row product-content">
    <div class="col-xs-6 col-sm-4 col-md-3 mb-4 p-relative hover-big" v-for="item in products" :key="item.id">
      <div class="addToCart d-sm-none">
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
      <CardView
        @add-cart="addCart"
        @favor-handler="favorHandler"
        :favor="favor"
        :title-color="'white'"
        :product="item"
        :is-loading="isBtnLoading"
      ></CardView>
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
      isBtnLoading: '',
      category: '',
      favor: [],
      favorProduct: []
    }
  },
  components: {
    CardView,
    PageView
  },
  methods: {
    getProducts (page = 1) {
      this.category = this.$route.query.category
      if (this.$route.params.products !== undefined) {
        this.products = [...JSON.parse(this.$route.params.products)]
        this.pagination = {}
        return
      }

      this.$emitter.emit('isLoading', true)

      let apiUrl = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/products?page=${page}`
      if (this.category === '' || this.category === '全部商品' || this.category === undefined) {
        apiUrl = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/products?page=${page}`
      } else if (this.category === '我的最愛') {
        this.getFavorProduct()
        this.pagination = {}
        return
      } else {
        apiUrl = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/products?category=${this.category}&&page=${page}`
      }
      this.$http
        .get(apiUrl)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.$emitter.emit('isLoading', false)
        })
        .catch((err) => {
          console.dir(err)
          this.$emitter.emit('isLoading', false)
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
    },
    favorHandler (type, id) {
      if (type === 'add') {
        this.favor.push(id)
        localStorage.setItem('favor', JSON.stringify(this.favor))
      } else {
        this.favor.splice(this.favor.indexOf(id), 1)
        localStorage.setItem('favor', JSON.stringify(this.favor))
        if (this.$route.query.category === '我的最愛') {
          this.getProducts()
        }
      }
    },
    getFavorProduct () {
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.$emitter.emit('isLoading', false)
          const tempProducts = res.data.products
          this.products = tempProducts.filter(product => {
            return this.favor.indexOf(product.id) !== -1
          })
        })
        .catch((err) => {
          console.dir(err)
        })
    }
  },
  watch: {
    $route (to) {
      this.category = to.query.category
      if (to.params.products !== undefined) {
        this.products = [...JSON.parse(to.params.products)]
        this.pagination = {}
      }
    },
    category () {
      this.getProducts()
    }
  },
  mounted () {
    this.getProducts()
    this.favor = JSON.parse(localStorage.getItem('favor')) || []
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
      @include mobile{
        transform: scale(1)
      }
      .addToCart{
        opacity: 1;
        z-index: 100;
      }
    }
  }
</style>
