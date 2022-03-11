<template>
  <div v-if="back_show" class="back-lock" @click="closeAllModal()"></div>
  <div class="content">
    <LoadingView :active="isLoading"></LoadingView>
    <div class="admin-container d-flex jy-content-center">
      <div class="total__product w-100 d-flex align-items-center jy-content-between">
        <p>目前有 {{ coupons.length }} 個優惠卷</p>
        <a class="btn btn--success w-10" href="#" @click.prevent="openCouponModal(true)">建立優惠卷</a>
      </div>
      <div class="product w-100 mb-3">
        <ul>
          <li class="product__title d-flex jy-content-between">
            <h3 class="text-c-white f-w-bold">到期日</h3>
            <div class="info__group w-90">
              <ul class="d-flex fw-bold align-items-center">
                <li class="w-30 f-w-bold">優惠名稱</li>
                <li class="w-30 f-w-bold">優惠內容</li>
                <li class="w-15 f-w-bold">是否啟用</li>
                <li class="w-25 f-w-bold">編輯</li>
              </ul>
            </div>
          </li>
          <li v-for="item in coupons" :key="item.id" class="product__item d-flex jy-content-between">
            <h3>{{ $filters.date(item.due_date) }}</h3>
            <div class="info__group w-90">
              <ul class="d-flex fw-bold align-items-center">
                <li class="w-30 f-w-bold">{{ item.title }}</li>
                <li class="w-30 f-w-bold">{{ item.percent }}</li>
                <li class="w-15 f-w-bold d-flex jy-content-center px-4">
                  <div  class="toggle"
                        :class="{'active': item.is_enabled === 1}"
                        @click="item.is_enabled === 1 ? item.is_enabled = 0 : item.is_enabled = 1;
                        isNew = false;
                        updateCoupon(item);"
                  >
                  </div>
                  <p v-if="item.is_enabled === 1" class="active">
                    啟用
                  </p>
                  <p v-else style="color: red">未啟用</p>
                </li>
                <li class="w-25 f-w-bold d-flex jy-content-center flex-wrap">
                  <a class="btn btn--success w-30 mx-2" href="#" @click.prevent="openCouponModal(false, item)">
                    <i class="fas fa-edit"></i>
                  </a>
                  <a class="btn btn--danger w-30 mx-2" href="#" @click.prevent="openDelModal('優惠卷', item)">
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
      @get-product="getCoupon"
      :style="{bg: '#1A535C', hoverBg: '#FF6B6B'}"
    ></PageView>
    <ModalView
      :coupon="tempCoupon"
      :is-new="isNew"
      @update-coupon="updateCoupon"
      ref="couponModal"
      @close-back="closeAllModal"
    ></ModalView>
    <DelModal
      :data="tempCoupon"
      @del-data="delCoupon"
      ref="delModal"
      @close-back="closeAllModal"
    >
    </DelModal>
  </div>
</template>

<script>
import ModalView from '@/components/AdminCModal.vue'
import DelModal from '@/components/AdminDelModal.vue'
import PageView from '@/components/PageNation.vue'
export default {
  data () {
    return {
      isLoading: false,
      isNew: false,
      coupons: [],
      tempCoupon: {},
      pagination: {},
      back_show: false
    }
  },
  components: {
    ModalView,
    DelModal,
    PageView
  },
  methods: {
    updateCoupon (tempCoupon, type = '') {
      this.isLoading = true
      let url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/coupon`
      let httpMethods = 'post'
      let status = '增加優惠卷'
      this.tempCoupon = tempCoupon

      if (!this.isNew) {
        httpMethods = 'put'
        url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
        status = '更新優惠卷'
      }
      this.$http[httpMethods](url, { data: this.tempCoupon })
        .then((res) => {
          this.$refs.couponModal.closeModal()
          this.getCoupon(this.pagination.current_page)
          this.back_show = false
          this.$httpMessageState(res, status)
        })
        .catch((err) => {
          this.$httpMessageState(err.response, status)
        })
    },
    getCoupon (page = 1) {
      this.isLoading = true
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`)
        .then((res) => {
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '獲取優惠卷列表')
        })
    },
    delCoupon (id) {
      this.isLoading = true
      this.$http
        .delete(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`)
        .then((res) => {
          this.$refs.delModal.closeModal()
          this.getCoupon(this.pagination.current_page)
          this.back_show = false
          this.$httpMessageState(res, '刪除優惠卷')
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '刪除優惠卷')
        })
    },
    openDelModal (type, item) {
      this.back_show = true
      this.tempCoupon = { ...item }
      this.$refs.delModal.openModal(type)
    },
    openCouponModal (isNew, item) {
      this.back_show = true
      this.isNew = isNew
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupon = { ...item }
      }
      this.$refs.couponModal.openModal()
    },
    closeAllModal () {
      this.$refs.couponModal.closeModal()
      this.$refs.delModal.closeModal()
      this.back_show = false
    }
  },
  mounted () {
    this.getCoupon()
  }
}
</script>
