<template>
  <div class="content">
    <LoadingView :active="isLoading"></LoadingView>
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
        <a @click.prevent="modalControl.is_add = true;" class="btn btn--success w-10" href="#">建立產品</a>
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
                <li class="w-15 d-sm-none">${{ item.origin_price }}</li>
                <li class="w-15">${{ item.price }}</li>
                <li class="d-flex jy-content-center w-30 px-4">
                  <div @click="editTempProduct = item;
                    editProduct()" class="toggle"
                      :class="{ 'active': item.is_enabled == 1 }">
                  </div>
                  <p :class="{ 'active': item.is_enabled == 1 }">
                    {{ item.is_enabled == 1 ?'啟用' : '未啟用' }}
                  </p>
                </li>
                <li class="w-20">
                  <ul class="d-flex jy-content-center eval">
                    <li class="me" v-for="(key, index) in 5" :key="key + index">
                      <span class="icon-star" v-if="item.eval >= key">
                        <i class="fa-solid fa-star"></i>
                      </span>
                      <span class="icon-star" v-else>
                        <i class="far fa-star"></i>
                      </span>
                    </li>
                  </ul>
                </li>
                <li class="w-20 d-flex jy-content-center flex-wrap">
                  <a @click.prevent="editTempProduct = {...item}; modalControl.is_edit= true;"
                      class="btn btn--success w-30 mx-2" href="#">
                    <i class="fas fa-edit"></i>
                  </a>
                  <a @click.prevent="editTempProduct = {...item}; modalControl.is_delete= true"   class="btn btn--danger w-30 mx-2" href="#">
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
      :modaltype="modalControl"
      :product="editTempProduct"
      :category="categoryArr"
      @close-modal="closeModal"
      @get-products="getProducts"
      v-if="modalControl.is_add || modalControl.is_edit || modalControl.is_delete"
    >
    </ModalView>
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

export default {
  data () {
    return {
      products: [],
      tempProducts: null,
      pagination: {},
      categoryArr: ['蔬菜', '海鮮', '肉品', '水果'],
      searchText: '',
      modalControl: {
        is_add: false,
        is_edit: false,
        is_sideMenu: true,
        is_delete: false
      },
      isLoading: false,
      ascending: false,
      sideToggle: true,
      editTempProduct: {
        imagesUrl: []
      }
    }
  },
  components: {
    PageView,
    ModalView
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      this.tempProducts = null
      this.searchText = ''
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((err) => {
          console.dir(err)
        })
    },
    closeModal () {
      this.modalControl.is_add = false
      this.modalControl.is_edit = false
      this.modalControl.is_delete = false
    },
    editProduct () {
      this.editTempProduct.is_enabled = !this.editTempProduct.is_enabled
      const data = { data: { ...this.editTempProduct } }
      this.modalControl.is_add = false
      this.$http
        .put(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/product/${this.editTempProduct.id}`, data)
        .then((res) => {
          if (res.data.success) {
            this.getProducts()
            this.editTempProduct = {}
          }
        })
        .catch(err => {
          console.dir(err)
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
