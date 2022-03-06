<template>
  <div class="content">
    <div class="admin-container d-flex jy-content-center">
      <div class="total__product w-100 d-flex align-items-center jy-content-between">
        <p>目前有 {{ orders.length }} 筆訂單</p>
        <a class="btn btn--danger w-10" href="#">刪除全部訂單</a>
      </div>
      <div class="product w-100 mb-3">
        <ul>
          <li class="product__title d-flex jy-content-between">
            <h3 class="text-c-white f-w-bold">訂購日期</h3>
            <div class="info__group w-90">
              <ul class="d-flex fw-bold">
                <li class="w-10 f-w-bold">訂購人</li>
                <li class="w-35 f-w-bold">訂購內容</li>
                <li class="w-20 f-w-bold">地址</li>
                <li class="w-15 f-w-bold">電話</li>
                <li class="w-10 f-w-bold">總金額</li>
                <li class="w-10 f-w-bold">是否付款</li>
              </ul>
            </div>
          </li>
          <li v-for="item in orders" :key="item.id" class="product__item d-flex jy-content-between">
            <h3>{{ item.create_at }}</h3>
            <div class="info__group w-90">
              <ul class="d-flex fw-bold align-items-center">
                <li class="w-10">{{ item.user.name }}</li>
                <li class="w-35">
                  <p v-for="product in item.products" :key="product.id" class="text-left w-100">
                    <span>{{ product.product.title }} -
                          {{ product.qty }}{{ product.product.unit }} x {{ product.product.price }}元 =
                          {{ product.total }}元
                    </span>
                  </p>
                </li>
                <li class="w-20">{{ item.user.address }}</li>
                <li class="w-15">{{ item.user.tel }}</li>
                <li class="w-10">${{ item.total }}</li>
                <li class="w-10 d-flex align-items-center jy-content-between">
                  <span v-if="item.is_paid === false" class="text-left">未付款</span>
                  <span v-else class="text-left">已付款</span>
                  <a @click.prevent="deleteOrder(item.id)" class="btn btn--danger" href="#">
                    <i class="fas fa-trash-alt"></i>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orders: []
    }
  },
  methods: {
    getOrders () {
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/orders`)
        .then((res) => {
          this.orders = res.data.orders
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteOrder (id) {
      this.$http
        .delete(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/order/${id}`)
        .then(() => {
          alert('刪除成功')
          this.getOrders()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
