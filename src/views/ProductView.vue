<template>
  <div
    class="mobile-search d-none d-md-block"
    :class="{'status': status}"
  >
    <div class="container">
      <div class="mobile-search-content">
        <div class="search d-flex jy-content-between">
          <input type="text" placeholder="請輸入商品名稱" v-model.trim="searchText">
          <button class="user-btn user-btn-gary" type="button" @click="searchProduct">查詢</button>
        </div>
        <div class="category-bar">
          <ul class="d-flex">
            <li @click="is_active = '全部商品'" :class="{'active': is_active === '全部商品'}">
              <router-link :to="{name: '全部商品', query: {category: '全部商品'}}">
                全部商品
              </router-link>
            </li>
            <li @click="is_active = '我的最愛'" :class="{'active': is_active === '我的最愛'}">
              <router-link :to="{name: '全部商品', query: {category: '我的最愛'}}">
                我的最愛
              </router-link>
            </li>
            <template v-for="item in category" :key="item">
              <li @click="is_active = item" :class="{'active': is_active === item}">
                <router-link :to="{name: '全部商品', query: {category: item}}">
                  {{ item }}
                </router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="user-product mt-10 mb-10">
      <div class="row">
        <div class="col-md-3 d-md-none mt-10">
          <div class="user-side-menu mt-10">
            <div class="search">
              <h3 class="text-title mb-2">輸入關鍵字</h3>
              <input type="text my-2" placeholder="請輸入商品名稱" name="name" v-model.trim="searchText" />
              <button class="user-btn user-btn-gray my-4 py-2" type="button" @click="searchProduct">
                查詢
              </button>
            </div>
            <ul class="user-menu">
              <li class="menu-item mt-10">
                <h3 class="text-medium text-c-thirdary f-size-xs mb-5">放心初精選</h3>
                <ul class="mt-1">
                  <li class="text-medium f-w-bold mb-3" @click="is_active = '全部商品'" :class="{'active': is_active === '全部商品'}">
                    <router-link :to="{name: '全部商品', query: {category: '全部商品'}}">
                      全部商品
                    </router-link>
                  </li>
                  <li class="text-medium f-w-bold mb-3" @click="is_active = '我的最愛'" :class="{'active': is_active === '我的最愛'}">
                    <router-link :to="{name: '全部商品', query: {category: '我的最愛'}}">
                      我的最愛
                    </router-link>
                  </li>
                  <template v-for="item in category" :key="item">
                    <li class="text-medium f-w-bold mb-3" @click="is_active = item" :class="{'active': is_active === item}">
                      <router-link :to="{name: '全部商品', query: {category: item}}">
                        {{ item }}
                      </router-link>
                    </li>
                  </template>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-9 mt-20 mt-sm-0">
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
import CartView from '@/components/CartModal.vue'

export default {
  data () {
    return {
      cart: [],
      is_show_banner: true,
      category: [],
      is_active: '',
      searchText: '',
      status: false
    }
  },
  components: {
    CartView
  },
  methods: {
    getCart () {
      this.$emitter.emit('isLoading', true)
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data
          this.$emitter.emit('isLoading', false)
          this.$emitter.emit('updateCart', res.data.data)
        })
        .catch((err) => {
          console.dir(err)
          this.$emitter.emit('isLoading', false)
        })
    },
    getCategory () {
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          const tempCategory = []
          res.data.products.forEach((product) => {
            tempCategory.push(product.category)
          })
          this.category = [...new Set(tempCategory)]
        })
        .catch((err) => {
          console.log(err)
        })
    },
    searchProduct () {
      if (this.searchText === '') return
      this.$emitter.emit('isLoading', true)
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          const tempProduct = res.data.products.filter((product) => {
            return product.title.indexOf(this.searchText) !== -1
          })
          this.$router.push({ name: '全部商品', params: { products: JSON.stringify(tempProduct) } })
          this.$emitter.emit('isLoading', false)
          this.searchText = ''
        })
        .catch((err) => {
          console.dir(err)
        })
    }
  },
  watch: {
    $route (to, from) {
      if (to.fullPath.indexOf('/product/') !== -1) {
        this.is_active = ''
        this.status = true
      } else {
        this.status = false
        this.is_active = this.$route.query.category || '全部商品'
      }
    }
  },
  mounted () {
    this.getCart()
    this.getCategory()
    this.$emitter.on('updateCart', (data) => {
      this.cart = data
    })
    if (this.$route.fullPath.indexOf('/product/') !== -1) {
      this.status = true
    } else if (this.$route.fullPath.indexOf('/product') !== -1) {
      this.status = false
      this.is_active = this.$route.query.category || '全部商品'
    }
  },
  unmounted () {
    this.$emitter.off('updateCart')
  }
}
</script>
