<template>
  <BannerView></BannerView>
  <div class="container">
    <div class="user-product mt-10">
      <div class="row">
        <div class="col-lg-3">
          <div class="user-side-menu">
            <div class="search">
              <h3 class="text-title mb-2">輸入關鍵字</h3>
              <input type="text my-2" placeholder="請輸入商品名稱" name="name">
              <button class="user-btn user-btn-gray my-4 py-2" type="button">查詢</button>
            </div>
            <ul class="user-menu">
              <li class="menu-item mt-10">
                <h3 class="text-medium text-c-thirdary f-size-xs">放心初精選</h3>
                <ul class="mt-1">
                  <li class="text-medium mt-2">
                    <a href="#">新品上市</a>
                  </li>
                  <li class="text-medium mt-2">
                    <a href="#">每週精選</a>
                  </li>
                  <li class="text-medium mt-2">
                    <a href="#">檔期精選</a>
                  </li>
                  <li class="text-medium mt-2">
                    <a href="#">加1元多1件</a>
                  </li>
                </ul>
              </li>
              <li class="menu-item mt-8">
                <h3 class="text-medium text-c-thirdary f-size-xs">放心初精選</h3>
                <ul class="mt-1">
                  <li class="text-medium mt-2">
                    <a href="#">新品上市</a>
                  </li>
                  <li class="text-medium mt-2">
                    <a href="#">每週精選</a>
                  </li>
                  <li class="text-medium mt-2">
                    <a href="#">檔期精選</a>
                  </li>
                  <li class="text-medium mt-2">
                    <a href="#">加1元多1件</a>
                  </li>
                </ul>
              </li>
              <li class="menu-item mt-10">
                <h3 class="text-medium text-c-thirdary f-size-xs">放心初精選</h3>
                <ul class="mt-1">
                  <li class="text-medium mt-2">
                    <a href="#">新品上市</a>
                  </li>
                  <li class="text-medium mt-2">
                    <a href="#">每週精選</a>
                  </li>
                  <li class="text-medium mt-2">
                    <a href="#">檔期精選</a>
                  </li>
                  <li class="text-medium mt-2">
                    <a href="#">加1元多1件</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="content py-3">
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

export default {
  data () {
    return {
      cart: []
    }
  },
  components: {
    BannerView,
    CartView
  },
  methods: {
    getCart () {
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data
          console.log(this.cart)
        })
        .catch((err) => {
          console.dir(err)
        })
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>

<style lang="scss">
  .user-product{
    .user-side-menu{
      padding: 12px 0 12px 0;
      input{
        width: 100%;
        border: 1px solid #8e8e8e;
        padding: 8px 8px;
        background-color: #FAF9F8;
        font-size: 18px;
        box-shadow: none;
        transition: .5s;
        display: block;
        &:focus{
          outline: none;
          border: 1px solid $primary;
        }
        &::placeholder{
          color: #ccc;
        }
      }
      .user-btn{
        width: 100%;
        font-size: 18px;
      }
    }
    .user-menu{
      a{
        &:hover{
          color: $primary;
        }
      }
    }
  }
</style>
