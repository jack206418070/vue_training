<template>
  <div v-if="back_show" class="back-lock" @click="closeAllModal()"></div>
  <div class="content">
    <div class="admin-container d-flex jy-content-center">
      <div class="search w-100">
        <div class="search__input w-30">
          <div class="search__btn" @click="filterProducts = 'search'">
            <i class="fas fa-search"></i>
          </div>
          <input @change=" filterProducts = 'search' " v-model.trim="searchText" type="text" class="py-2 px-2 w-100">
        </div>
      </div>
      <div class="total__product w-100 d-flex align-items-center jy-content-between">
        <p>目前有 {{ products.length }} 樣商品</p>
        <a @click.prevent="openProductModal(true)" class="btn btn--success w-10" href="#">建立產品</a>
      </div>
      <div class="product w-100 mb-3">
        <ul>
          <li class="product__title d-flex jy-content-between">
            <h3 class="text-c-white f-w-bold">產品名稱</h3>
            <div class="info__group w-80">
              <ul class="d-flex fw-bold">
                <li class="w-15 d-sm-none f-w-bold">原價</li>
                <li class="w-15 f-w-bold" style="cursor: pointer">售價</li>
                <li class="w-30 f-w-bold">是否啟用</li>
                <li class="w-20 f-w-bold">產品評價</li>
                <li class="w-20 f-w-bold">編輯</li>
              </ul>
            </div>
          </li>
          <li v-for="item in filterProducts" :key="item.id"
          class="product__item d-flex jy-content-between"
          :class="{'bg--dark--secondary': item.is_enabled == 1, 'bg--gray': item.is_enabled == 0}">
            <h3>{{ item.title }}</h3>
            <div class="info__group w-80">
              <ul class="d-flex fw-bold align-items-center">
                <li class="w-15 d-sm-none">${{ $filters.thColon(item.origin_price) }}</li>
                <li class="w-15">${{ $filters.thColon(item.price) }}</li>
                <li class="d-flex jy-content-center w-30 px-4">
                  <div
                    @click="item.is_enabled === 1 ? item.is_enabled = 0 : item.is_enabled = 1;
                    isNew = false; updateProduct(item)"
                    class="toggle"
                    :class="{ 'active': item.is_enabled == 1 }"
                  >
                  </div>
                  <p :class="{ 'active': item.is_enabled == 1 }">
                    {{ item.is_enabled == 1 ?'啟用' : '未啟用' }}
                  </p>
                </li>
                <li class="w-20">
                  <ul class="d-flex jy-content-center eval">
                    <li class="me" v-for="(key, index) in 5" :key="key + index">
                      <span
                        class="icon-star"
                        v-if="item.eval >= key"
                        @click="item.eval = key; isNew = false; updateProduct(item)"
                      >
                        <i class="fa-solid fa-star"></i>
                      </span>
                      <span
                        class="icon-star"
                        v-else
                        @click="item.eval = key; isNew = false; updateProduct(item)"
                      >
                        <i class="far fa-star"></i>
                      </span>
                    </li>
                  </ul>
                </li>
                <li class="w-20 d-flex jy-content-center flex-wrap">
                  <a @click.prevent="openProductModal(false, item)"
                      class="btn btn--success w-30 mx-2" href="#">
                    <i class="fas fa-edit"></i>
                  </a>
                  <a @click.prevent="openDelModal('商品', item)" class="btn btn--danger w-30 mx-2" href="#">
                    <i class="fas fa-trash-alt"></i>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <ModalView
      ref="productModal"
      :is-new="isNew"
      :product="tempProduct"
      @update-product="updateProduct"
      @close-back="closeAllModal"
    ></ModalView>
    <DelModal
      ref="delModal"
      @del-data="delProduct"
      :data="tempProduct"
      :back="back_show"
      @close-back="closeAllModal"
    ></DelModal>
    <PageView
      :pagination="pagination"
      @get-product="getProducts"
      :style="{bg: '#1A535C', hoverBg: '#FF6B6B'}"
    >
    </PageView>
  </div>
</template>

<script>
import PageView from '@/components/PageNation.vue'
import ModalView from '@/components/AdminPModal.vue'
import DelModal from '@/components/AdminDelModal.vue'
export default {
  data () {
    return {
      products: [],
      tempProducts: null,
      pagination: {},
      searchText: '',
      tempProduct: {},
      ascending: false,
      sideToggle: true,
      isNew: false,
      back_show: false
    }
  },
  components: {
    PageView,
    ModalView,
    DelModal
  },
  methods: {
    openProductModal (isNew, item) {
      this.back_show = true
      if (isNew) {
        this.tempProduct = {
          is_enabled: 0,
          eval: 1,
          category: '',
          imagesUrl: [],
          imageUrl: ''
        }
        this.isNew = true
      } else {
        this.tempProduct = { ...item }
        this.isNew = false
      }
      this.$refs.productModal.openModal()
    },
    getProducts (page = 1) {
      this.$emitter.emit('isAdminLoading', true)
      this.tempProducts = null
      this.searchText = ''
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.$emitter.emit('isAdminLoading', false)
        })
        .catch((err) => {
          this.$emitter.emit('isAdminLoading', false)
          this.$httpMessageState(err.response, '取得產品列表')
        })
    },
    updateProduct (item) {
      this.$emitter.emit('isAdminLoading', true)
      this.tempProduct = item
      let url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethods = 'post'
      let status = '新增產品'
      if (!this.isNew) {
        url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
        httpMethods = 'put'
        status = '更新產品'
      }
      this.$http[httpMethods](url, { data: this.tempProduct })
        .then((res) => {
          if (res.data.success) {
            this.back_show = false
            this.$refs.productModal.closeModal()
            this.$httpMessageState(res, status)
            this.getProducts(this.pagination.current_page)
          }
        })
        .catch(err => {
          this.$emitter.emit('isAdminLoading', false)
          this.$httpMessageState(err.response, status)
        })
    },
    searchHandler () {
      if (this.searchText === '') {
        this.getProducts()
      }
      const tempData = []
      this.products.forEach(product => {
        if (product.title.match(this.searchText)) {
          tempData.push(product)
        }
      })
      this.products = tempData
    },
    openDelModal (type, item) {
      this.back_show = true
      this.tempProduct = { ...item }
      this.$refs.delModal.openModal(type)
    },
    delProduct (id) {
      this.$emitter.emit('isAdminLoading', true)
      this.$http
        .delete(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`)
        .then((res) => {
          this.getProducts(this.pagination.current_page)
          this.$refs.delModal.closeModal()
          this.back_show = false
          this.$httpMessageState(res, '刪除產品')
        })
        .catch((err) => {
          this.$emitter.emit('isAdminLoading', false)
          this.$httpMessageState(err.response, '刪除產品')
        })
    },
    closeAllModal () {
      this.$refs.productModal.closeModal()
      this.$refs.delModal.closeModal()
      this.back_show = false
    }
  },
  computed: {
    filterProducts: {
      get () {
        return this.tempProducts || this.products
      },
      set (val) {
        if (val === 'search') {
          this.tempProducts = []
          this.products.forEach(product => {
            if (product.title.match(this.searchText)) {
              this.tempProducts.push(product)
            }
          })
          return this.tempProducts
        } else if (val === 'price') {
          this.tempProducts = this.tempProducts || JSON.parse(JSON.stringify(this.products))
          this.tempProducts.sort((a, b) => this.ascending ? a.price - b.price : b.price - a.price)
          return this.tempProducts
        }
      }
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
