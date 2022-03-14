<template>
  <ul v-if="carts?.carts?.length" class="mb-10">
    <li class="row py-4 bg-secondary d-sm-none">
      <div class="col-sm-4">
        <p class="text-center text-c-white">商品</p>
      </div>
      <div class="col-sm-2">
        <p class="text-center text-c-white">數量</p>
      </div>
      <div class="col-sm-2">
        <p class="text-center text-c-white">售價</p>
      </div>
      <div class="col-sm-2">
        <p class="text-center text-c-white">小計</p>
      </div>
      <div class="col-sm-2">
        <p class="text-center text-c-white">操作</p>
      </div>
    </li>
    <li
      class="row py-4 bg-white align-items-center border-b-1"
      v-for="item in carts.carts"
      :key="item.id"
    >
      <div class="col-sm-4 d-flex jy-content-center jy-content-sm-start mb-sm-2">
        <div
          class="img-bg px-1"
          :style="{ backgroundImage: 'url(' + item.product.imageUrl + ')' }"
        ></div>
        <div class="content px-3">
          <h3 class="text-medium">{{ item.product.title }}</h3>
          <p>
            規格：{{ item.product.unit }}<br/>
            <span class="d-md-none d-sm-block">重量：{{ item.product.content }}</span>
          </p>
        </div>
      </div>
      <div class="col-xs-6 col-sm-2">
        <select
          class="py-2"
          name="qty"
          id="qty"
          v-model="item.qty"
          @change="updateCart(item, item.qty)"
        >
          <option v-for="(qty, key) in 20" :key="qty + key" :value="qty">
            {{ qty }}
          </option>
        </select>
      </div>
      <div class="col-2 d-sm-none">
        <p class="text-medium text-center text-c-primary">
          NT ${{ item.product.price }}
        </p>
      </div>
      <div class="col-xs-4 col-sm-2">
        <p class="text-medium text-center text-c-primary">
          NT ${{ item.total }}
        </p>
      </div>
      <div class="col-2">
        <button
          type="button"
          class="user-btn user-btn-primary m-auto py-1 px-2"
          @click="deleteCart(item.id)"
        >
          <span class="text-c-white"> X </span>
        </button>
      </div>
    </li>
    <li class="row py-4 bg-white align-items-center border-b-1 jy-content-end">
      <div class="col-5 col-sm-2">
        <p class="text-medium text-center text-c-primary text-sm-right">總計</p>
      </div>
      <div class="col-5 col-sm-2">
        <p class="text-medium text-center text-c-primary f-size-s text-sm-right">
          NT ${{ carts.total }}
        </p>
      </div>
    </li>
    <li class="row py-6 bg-white jy-content-between">
      <div class="col-sm-6 col-md-4 d-flex flex-dir-col jy-content-between">
        <div class="coupon d-flex mb-sm-4">
          <input
            class="w-60 p-2 f-size-xs" type="text" id="coupon"
            v-model="coupon"
            :readonly="carts.total !== carts.final_total"
          >
          <button
            class="user-btn user-btn-primary py-2 flex-auto"
            type="button"
            @click="useCoupon"
            :disabled="carts.total !== carts.final_total"
          >
            <span v-if="carts.total == carts.final_total">使用優惠卷</span>
            <span v-else>已使用過優惠卷</span>
          </button>
        </div>
        <p class="text-medium d-flex jy-content-between mb-sm-2">
          <span>商品小計</span>
          <span class="text-c-primary f-w-bold">NT$ {{ carts.total }}</span>
        </p>
        <p class="text-medium d-flex jy-content-between mb-sm-2">
          <span>優惠折扣</span>
          <span class="text-c-primary f-w-bold">
            NT$ {{ Math.round(carts.total - carts.final_total) }}
          </span>
        </p>
      </div>
      <div class="col-sm-6 col-md-4">
        <p class="text-sm-right">
          結帳金額<br>
          <span class="text-c-primary f-size-s f-w-bold my-2 d-block">
            NT$ {{ Math.round(carts.final_total) }}
          </span>
        </p>
        <button
          class="user-btn user-btn-primary w-100 py-3 f-size-xs d-sm-none" type="button"
          @click="routerTo"
        >下一步：填寫資料</button>
      </div>
    </li>
  </ul>
  <button
    v-if="carts?.carts?.length"
    class="cart-check-btn user-btn user-btn-primary w-100 py-3 f-size-xs" type="button"
    @click="routerTo"
  >下一步：填寫資料</button>
  <div v-show="carts?.carts?.length === 0" class="empty-cart mb-20 mt-sm-20">
    <h3 class="text-title text-c-forthary text-center mb-4">購物車是空的</h3>
    <router-link to="/product">
      <button class="user-btn user-btn-primary mx-auto py-4 px-10 f-size-s">前往選購商品</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      carts: [],
      coupon: ''
    }
  },
  methods: {
    getCarts () {
      this.$emitter.emit('isLoading', true)
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.$emitter.emit('isLoading', false)
          this.carts = res.data.data
          if (this.carts.carts.length === 0) {
            this.$emitter.emit('changeBar', 0)
            this.$emitter.emit('updateCart', res.data.data)
            this.$emitter.emit('isLoading', false)
            return
          }
          this.$emitter.emit('changeBar', 1)
          this.$emitter.emit('isLoading', false)
        })
        .catch((err) => {
          console.log(err)
          this.$emitter.emit('isLoading', false)
        })
    },
    updateCart (item, qty) {
      this.$emitter.emit('isLoading', true)
      const data = {
        product_id: item.product_id,
        qty: qty
      }
      this.$http
        .put(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, { data })
        .then(() => {
          this.getCarts()
        })
        .catch((err) => {
          this.$emitter.emit('isLoading', false)
          console.dir(err)
        })
    },
    deleteCart (id) {
      this.$emitter.emit('isLoading', true)
      this.$http
        .delete(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then(() => {
          this.getCarts()
        })
        .catch((err) => {
          this.$emitter.emit('isLoading', false)
          console.dir(err)
        })
    },
    useCoupon () {
      if (this.coupon === '') {
        alert('欄位不可為空')
        return
      }
      this.$emitter.emit('isLoading', true)
      const data = {
        code: this.coupon
      }
      this.$http
        .post(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/coupon`, { data })
        .then((res) => {
          this.getCarts()
        })
        .catch((err) => {
          this.$emitter.emit('isLoading', false)
          this.$httpMessageState(err.response, '優惠卷使用')
        })
    },
    routerTo () {
      this.$router.push({ name: '資料輸入頁面', params: { show: true } })
    }
  },
  mounted () {
    this.getCarts()
  }
}
</script>

<style lang="scss" scoped>
  .cart{
    &-title{
      padding: 5% 0;
    }
    .img-bg{
      background-size: cover;
      background-position: center center;
      flex: 0 0 30%;
      @include pad{
        flex: 0 0 50%;
        height: 100px;
      }
      @include mobile{
        flex: 0 0 30%;
        height: 150px;
      }
      @media screen and (max-width: 440px) {
        flex: 0 0 40%;
      }
    }
    select{
      width: 100%;
      text-align: center;
      &:focus{
        outline: none;
      }
    }
    @include pad{
      .content{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
    .text-sm-right{
      @include mobile{
        text-align: right;
      }
    }
  }
  .cart-check-btn{
    display: none;
    @include mobile{
      display: block;
      position: fixed;
      margin-left: -15px;
      padding-bottom: 20px;
      width: 100%;
      bottom: 0;
    }
  }
</style>
