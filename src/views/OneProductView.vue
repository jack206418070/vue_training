<template>
  <div class="oneProduct">
    <div class="row">
      <div class="col-sm-7 col-md-6">
        <div class="oneProduct-img">
          <img :src="product.imageUrl" alt="">
        </div>
      </div>
      <div class="col-sm-5 col-md-6 pt-3">
        <div class="oneProduct-content pb-10 mb-10 pb-md-5">
          <h3 class="text-title mb-8 mb-sm-0">{{ product.title }}</h3>
          <h4 class="text-medium f-size-xs text-c-primary mb-8 mb-sm-0">
            <span v-if="product.price !== ''">特價NT$   {{ product.price }}</span>
            <span v-else>NT${{ product.origin_price }}</span>
          </h4>
          <p class="content-info mb-8 mb-sm-0">
            <span class="d-block text-medium text-c-primary mb-2 mb-sm-0">商品資訊</span>
            <span class="d-block mb-1 mb-sm-0">重量：{{ product.content }}</span>
            <span class="d-block mb-1 mb-sm-0">規格：{{ product.unit }}</span>
          </p>
          <p class="d-sm-none">
            <span class="d-block text-medium text-c-primary mb-2">付款方式</span>
            <span class="d-block mb-1">現金</span>
            <span class="d-block mb-1">信用卡</span>
          </p>
        </div>
      </div>
      <div class="col-md-12 mt-0 mb-15 mt-md-4">
        <div class="row jy-content-end">
          <div class="col-md-6">
            <div class="oneProduct-buy">
              <p class="mb-2">數量</p>
              <div class="amount mb-4">
                <div @click="addQty" class="add">+</div>
                <input :value="qty" type="number" name="amount" min="1" max="20" step="1" readonly>
                <div @click="decQty" class="dec">-</div>
              </div>
              <button
                @click="addCart(qty, product.id)"
                class="user-btn user-btn-primary text-center py-2"
                type="button"
                :disabled="isBtnLoading === product.id"
                >
                <span v-if="isBtnLoading === product.id">
                  <i class="fas fa-pulse fa-spinner"></i>
                </span>
                <span v-else>加入購物車</span>
              </button>
            </div>
          </div>
      </div>
      </div>
      <div class="col-lg-12 mb-5">
        <div class="oneProduct-desc">
          <h4 class="text-medium text-center text-c-primary f-size-xs">商品說明</h4>
          <hr>
          <p class="text-medium pt-5" v-html="product.description">
          </p>
          <hr>
        </div>
      </div>
      <div class="col-lg-12 mb-5">
        <h4 class="text-title mb-2">別人也逛過</h4>
        <div class="d-flex refrence">
          <template v-for="item in products" :key="item.id">
            <div class="card-item pointer">
              <CardView
                @add-cart="addCart"
                :title-color="'white'"
                :product="item"
                :is-loading="isBtnLoading"
              ></CardView>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardView from '@/components/CardView.vue'
export default {
  props: ['id'],
  data () {
    return {
      product: {},
      products: [],
      isBtnLoading: '',
      qty: 1
    }
  },
  components: {
    CardView
  },
  methods: {
    addQty () {
      this.qty >= 20 ? this.qty = 20 : this.qty += 1
    },
    decQty () {
      this.qty <= 1 ? this.qty = 1 : this.qty -= 1
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
    addCart (qty = 1, id) {
      this.isBtnLoading = id
      const data = {
        data: {
          product_id: id,
          qty: qty
        }
      }
      this.$http
        .post(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/cart`, data)
        .then(() => {
          this.getCart()
          this.isBtnLoading = ''
          this.qty = 1
        })
        .catch((err) => {
          console.dir(err)
        })
    },
    getProduct () {
      this.$emitter.emit('isLoading', true)
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/product/${this.id}`)
        .then((res) => {
          this.product = res.data.product
          this.$emitter.emit('isLoading', false)
        })
        .catch((err) => {
          this.$emitter.emit('isLoading', false)
          console.dir(err)
        })
    },
    routerTo (link) {
      this.$router.push(link)
    }
  },
  watch: {
    id () {
      this.getProduct()
    }
  },
  created () {
    this.$emitter.emit('hideHeader', false)
  },
  mounted () {
    this.getProduct()
    console.log(1)
    this.$emitter.emit('changeTop', true)
    this.$http
      .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/products`)
      .then((res) => {
        res.data.products.forEach((item, index) => {
          if (index <= 3) {
            this.products.push(item)
          }
        })
      })
      .catch((err) => {
        console.dir(err)
      })
  },
  unmounted () {
    this.$emitter.emit('hideHeader', true)
    this.$emitter.emit('changeTop', false)
  }
}
</script>

<style lang="scss">
  .oneProduct{
    .text-title{
      letter-spacing: 1.3px;
    }
    .pt-3{
      padding-top: 12px !important;
    }
    h3{
      letter-spacing: 1.3px;
    }
    &-content{
      border-bottom: 1px solid #ccc;
      @include pad{
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between;
        border: 0;
        margin-bottom: 0;
        padding: 0;
        height: 100%;
      }
      @include mobile{
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        h4{
          font-size: 24px;
        }
        .content-info{
          display: flex;
          justify-content: space-between;
          flex: 0 0 100%;
          margin-top: 10px;
        }
      }
    }
    .amount{
      position: relative;
      .add, .dec{
        position: absolute;
        height: 100%;
        width: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: white;
        background: $primary;
        top: 0;
        cursor: pointer;
      }
      .add{
        right: 0;
      }
    }
    input{
      width: 100%;
      line-height: 1.5;
      padding: 5px;
      outline: none;
      border: 1px solid #ccc;
      cursor: not-allowed;
      text-align: center;
      font-size: 24px;
    }
    button{
        width: 100%;
        font-size: 20px;
    }
    &-desc{
      hr{
        border: 1px solid #eee;
        margin: 12px 0;
      }
      p{
        line-height: 2;
      }
    }
    .refrence{
      overflow: auto;
      justify-content: space-between;
      @include pad{
        justify-content: flex-start;
      }
      &::-webkit-scrollbar{
        display: none;
      }
      .card-item{
        flex: 0 0 23%;
        @include pad{
          flex: 0 0 30%;
          margin-right: 1%;
        }
         @include mobile{
          flex: 0 0 40%;
        }
      }
    }
  }
</style>
