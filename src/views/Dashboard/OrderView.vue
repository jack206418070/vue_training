<template>
  <div v-if="back_show" class="back-lock" @click="closeAllModal()"></div>
  <div class="content">
    <LoadingView :active="isLoading"></LoadingView>
    <div class="admin-container d-flex jy-content-center">
      <div class="total__product w-100 d-flex align-items-center jy-content-between">
        <p>目前有 {{ orders.length }} 筆訂單</p>
        <a @click.prevent="deleteOrder('all')" class="btn btn--danger w-10" href="#">刪除全部訂單</a>
      </div>
      <div class="product w-100 mb-3">
        <ul>
          <li class="product__title d-flex jy-content-between">
            <h3 class="text-c-white f-w-bold">訂購日期</h3>
            <div class="info__group w-90">
              <ul class="d-flex fw-bold">
                <li class="w-15 f-w-bold">訂購人</li>
                <li class="w-35 f-w-bold">訂購內容</li>
                <li class="w-15 f-w-bold">電話</li>
                <li class="w-10 f-w-bold">總金額</li>
                <li class="w-15 f-w-bold">是否付款</li>
                <li class="w-10 f-w-bold">編輯</li>
              </ul>
            </div>
          </li>
          <li v-for="item in orders" :key="item.id" class="product__item d-flex jy-content-between">
            <h3>{{ $filters.date(item.create_at) }}</h3>
            <div class="info__group w-90">
              <ul class="d-flex fw-bold align-items-center">
                <li class="w-15">{{ item.user.name }}</li>
                <li class="w-35">
                  <p v-for="product in item.products" :key="product.id" class="text-left w-100">
                    <span>{{ product.product.title }} -
                          {{ product.qty }}份 x {{ $filters.thColon(product.product.price) }}元 =
                          {{ $filters.thColon(product.total) }}元
                    </span>
                  </p>
                </li>
                <li class="w-15">{{ item.user.tel }}</li>
                <li class="w-10">${{ $filters.thColon(item.total) }}</li>
                <li class="w-15 d-flex jy-content-around align-items-center">
                  <span v-if="item.is_paid === false" class="text-left">未付款</span>
                  <span v-else class="text-left">已付款</span>
                  <button @click="updatePaid(item)" class="pointer" type="button">更新付款狀態</button>
                </li>
                <li class="w-10 d-flex align-items-center jy-content-center">
                  <a @click.prevent="openModal(item)" class="btn btn--success mr-1" href="#">
                    <i class="fa-regular fa-eye"></i>
                  </a>
                  <a @click.prevent="openDelModal('訂單',item)" class="btn btn--danger ml-1" href="#">
                    <i class="fas fa-trash-alt"></i>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <PageView
      :pagination="pagination"
      @get-product="getOrders"
      :style="{bg: '#1A535C', hoverBg: '#FF6B6B'}"
    ></PageView>
    <DelModal :data="tempOrder" @del-data="deleteOrder" ref="delModal" @close-back="closeAllModal">
    </DelModal>
    <OrderModal
      :order="tempOrder"
      @update-paid="updatePaid"
      ref="orderModal"
    ></OrderModal>
  </div>
</template>

<script>
import DelModal from '@/components/AdminDelModal.vue'
import OrderModal from '@/components/AdminOModal.vue'
import PageView from '@/components/PageNation.vue'
export default {
  data () {
    return {
      orders: [],
      tempOrder: {},
      isLoading: false,
      pagination: {},
      back_show: false
    }
  },
  components: {
    DelModal,
    OrderModal,
    PageView
  },
  methods: {
    getOrders (page = 1) {
      this.isLoading = true
      this.orders = []
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`)
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '獲取訂單列表')
        })
    },
    deleteOrder (id) {
      this.isLoading = true
      let url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/order/${id}`
      if (id === 'all') {
        url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/orders/all`
      }
      this.$http
        .delete(url)
        .then((res) => {
          this.$refs.delModal.closeModal()
          this.back_show = false
          this.getOrders(this.pagination.current_page)
          this.$httpMessageState(res, '刪除訂單')
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '刪除訂單')
        })
    },
    openDelModal (type, item) {
      this.back_show = true
      this.$refs.delModal.openModal(type)
      this.tempOrder = item
    },
    openModal (item) {
      this.$refs.orderModal.openModal()
      this.tempOrder = item
    },
    updatePaid (item) {
      this.isLoading = true
      const data = {
        data: {
          ...item,
          is_paid: !item.is_paid
        }
      }
      this.$http
        .put(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`, data)
        .then((res) => {
          const component = this.$refs.orderModal
          component.closeModal()
          this.getOrders(this.pagination.current_page)
          this.$httpMessageState(res, '更新付款資訊')
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '更新付款資訊')
        })
    },
    closeAllModal () {
      this.$refs.orderModal.closeModal()
      this.$refs.delModal.closeModal()
      this.back_show = false
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
