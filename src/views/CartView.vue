<template>
<div class="container">
  <LoadingView :active="isLoading"></LoadingView>
  <div class="cart">
    <StepView></StepView>
    <ul class="mb-10">
      <li class="row py-4 bg-secondary">
        <div class="col-lg-4">
          <p class="text-center text-c-white">商品</p>
        </div>
        <div class="col-lg-2">
          <p class="text-center text-c-white">數量</p>
        </div>
        <div class="col-lg-2">
          <p class="text-center text-c-white">售價</p>
        </div>
        <div class="col-lg-2">
          <p class="text-center text-c-white">小計</p>
        </div>
        <div class="col-lg-2">
          <p class="text-center text-c-white">操作</p>
        </div>
      </li>
      <li
        class="row py-4 bg-white align-items-center border-b-1"
        v-for="item in carts.carts"
        :key="item.id"
      >
        <div class="col-lg-4 d-flex jy-content-center">
          <div
            class="img-bg px-1"
            :style="{backgroundImage: 'url('+item.product.imageUrl+')'}"
          ></div>
          <div class="content px-3">
            <h3 class="text-medium">{{ item.product.title }}</h3>
            <p>
              規格：{{ item.product.unit }}<br>
              重量：{{ item.product.content }}
            </p>
          </div>
        </div>
        <div class="col-lg-2">
          <select
            class="py-2" name="qty" id="qty"
            v-model="item.qty"
            @change="updateCart(item, item.qty)"
          >
            <option
              v-for="(qty, key) in 20"
              :key="qty + key"
              :value="qty"
            >{{ qty }}</option>
          </select>
        </div>
        <div class="col-lg-2">
          <p class="text-medium text-center text-c-primary">NT ${{ item.product.price }}</p>
        </div>
        <div class="col-lg-2">
          <p class="text-medium text-center text-c-primary">NT ${{ item.total }}</p>
        </div>
        <div class="col-lg-2">
          <button class="user-btn user-btn-primary m-auto py-1 px-2">
            <span class="text-c-white">
              X
            </span>
          </button>
        </div>
      </li>
      <li class="row py-4 bg-white align-items-center border-b-1 jy-content-end">
        <div class="col-lg-2">
          <p class="text-medium text-center text-c-primary">總計</p>
        </div>
        <div class="col-lg-2">
          <p class="text-medium text-center text-c-primary f-size-s">NT ${{ carts.final_total }}</p>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import StepView from '@/components/StepView.vue'
export default {
  data () {
    return {
      isLoading: false,
      carts: []
    }
  },
  components: {
    StepView
  },
  methods: {
    getCarts () {
      this.isLoading = true
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.isLoading = false
          this.carts = res.data.data
          this.$emitter.emit('updateCart', res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateCart (item, qty) {
      this.isLoading = true
      const data = {
        product_id: item.product_id,
        qty: qty
      }
      this.$http
        .put(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, { data })
        .then((res) => {
          this.getCarts()
        })
        .catch((err) => {
          console.dir(err)
        })
    }
  },
  mounted () {
    this.getCarts()
  }
}
</script>

<style lang="scss" scoped>
  .cart{
    padding-top: 60px;
    &-title{
      padding: 5% 0;
    }
    .img-bg{
      background-size: cover;
      background-position: center center;
      flex: 0 0 30%;
    }
    select{
      width: 100%;
      text-align: center;
      &:focus{
        outline: none;
      }
    }
  }
</style>
