<template>
  <div class="order_search">
    <div class="order-banner" :style="{ backgroundImage: `url( ${require('@/assets/images/about_bg.jpeg')})`}">
      <div class="container">
        <h3>客戶訂單查詢</h3>
      </div>
    </div>
    <div class="container py-10">
      <div class="row jy-content-center">
        <div class="col-md-10 col-lg-4">
          <h3 class="text-title py-5 text-center f-size-m">訂單查詢</h3>
          <div class="form-control mb-10">
            <label class="mb-2" for="order_id">訂單編號</label>
            <div class="p-relative">
              <input type="text" id="order_id" v-model.trim="order_id" placeholder="請輸入訂單編號">
              <div class="search" @click="searchHandler">
                <p>查詢</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="searchOrder.id !== undefined" class="row jy-content-center">
        <div class="col-md-10 col-lg-6">
          <div class="order-info">
            <h5 class="text-medium mb-2">
              <span class="title">訂單編號：</span>
              <span class="content">{{ searchOrder.id }}</span>
            </h5>
            <p class="text-medium mb-2">
              <span class="title">訂購人：</span>
              <span class="content">{{ searchOrder.user.name }}</span>
            </p>
            <p class="text-medium mb-2">
              <span class="title">訂單日期：</span>
              <span class="content">{{ $filters.date(searchOrder.create_at) }}</span>
            </p>
            <p class="text-medium mb-2">
              <span class="title">付款狀態：</span>
              <span
                class="content is_paid"
                :class="{'is_paid_none': searchOrder.is_paid === false}"
              >{{ searchOrder.is_paid ? '已付款' : '未付款' }}</span>
            </p>
            <p class="text-medium mb-2">
              <span class="title">訂購品項：</span>
              <ul class="content">
                  <li v-for="item in searchOrder.products" :key="item.id">
                    {{ item.product.title }} {{ item.product.unit }} X {{ item.qty }}
                  </li>
              </ul>
            </p>
            <p class="text-medium mb-2">
              <span class="title">總金額：</span>
              <span class="content">${{ $filters.thColon(searchOrder.total) }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orders: [],
      current_page: 1,
      order_id: '',
      searchOrder: {}
    }
  },
  methods: {
    getOrders (page = 1) {
      this.$emitter.emit('isLoading', true)
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/orders?page=${page}`)
        .then((res) => {
          this.orders = [...this.orders, ...res.data.orders]
          const pagination = res.data.pagination
          if (this.current_page < pagination.total_pages) {
            this.getOrders(this.current_page + 1)
            this.current_page += 1
          } else {
            this.$emitter.emit('isLoading', false)
            console.log(this.orders)
          }
        })
        .catch((err) => {
          this.$emitter.emit('isLoading', false)
          console.dir(err)
        })
    },
    searchHandler () {
      this.$emitter.emit('isLoading', true)
      setTimeout(() => {
        this.searchOrder = this.orders.filter(order => order.id === this.order_id)
        this.searchOrder = { ...this.searchOrder[0] }
        this.order_id = ''
        this.$emitter.emit('isLoading', false)
      }, 1500)
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>

<style lang="scss">
  .order-banner{
    background-size: cover;
    background-position: center center;
    padding-top: 80px;
    height: 400px;
    @include mobile {
      height: 250px;
    }
    h3{
      padding-left: 10%;
      font-size: 2.25rem;
      letter-spacing:5px;
      margin-top: 10%;
    }
  }
  .order_search{
    .order-info{
      background-color: #eee;
      padding: 12px;
      h5, p {
        display: flex;
        justify-content: space-between;
      }
      .title{
        text-align: justify;
        text-align-last: justify;
        flex: 1 0 auto;
      }
      .content{
        flex: 0 0 80%;
        padding-left: 10px;
        &.is_paid{
          color: #198754 !important;
        }
        &.is_paid_none{
          color: red !important;
        }
      }
    }
    h3{
      letter-spacing: 5px;
      margin-bottom: 20px;
    }
    .form-control{
      text-align: center;
      label{
        display: block;
        text-align: left;
      }
      input{
        width: 100%;
        padding: 8px 12px;
      }
      .search{
        position: absolute;
        top: 0;
        right: 0;
        background-color: #555;
        height: 100%;
        padding: 0 10px;
        cursor: pointer;
        p{
          color: white;
          font-weight: bold;
          line-height: 40.5px;
        }
      }
    }
  }
</style>
