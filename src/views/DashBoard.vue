<template>
  <LoadingView :active="isLoading"></LoadingView>
  <header class="admin-header d-flex jy-content-between align-items-center">
    <div class="logo">
      <h1>LOGO</h1>
    </div>
    <div class="menu">
      <ul class="d-flex d-sm-none">
        <li>
          <a href="#">
            <span class="icon">
              <i class="fas fa-user-shield"></i>
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon">
              <i class="fas fa-bell"></i>
            </span>
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="logout">
            <span class="icon">
              <i class="fas fa-sign-out-alt"></i>
            </span>
          </a>
        </li>
      </ul>
      <div class="menu-btn"></div>
    </div>
  </header>
  <section class="d-flex bg--gray--300 overflow-x-h">
    <div class="side-menu d-sm-none small">
      <div class="admin-info d-flex align-items-center jy-content-center">
        <img src="@/assets/images/user-13.jpeg" alt="" />
        <div class="admin-profile small">
          <h3>GinJack</h3>
          <p>Front end developer</p>
        </div>
      </div>
      <ul>
        <li>
          <router-link to="/admin/product">
            <span class="icon small">
              <i class="fab fa-product-hunt"></i>
            </span>
            <span class="small">Products</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/order">
            <span class="icon small">
              <i class="fas fa-border-all"></i>
            </span>
            <span class="small">Orders</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/coupon">
            <span class="icon small">
              <i class="fas fa-ticket-alt"></i>
            </span>
            <span class="small">Coupon</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/article">
            <span class="icon small">
              <i class="fa-solid fa-newspaper"></i>
            </span>
            <span class="small">Article</span>
          </router-link>
        </li>
      </ul>
      <div class="side-toggle">
        <span class="icon">
          <i class="fas fa-arrow-alt-circle-left"></i>
        </span>
        <span class="icon" style="display: none">
          <i class="fas fa-arrow-alt-circle-right"></i>
        </span>
      </div>
    </div>
    <div class="side-menu d-none d-sm-block">
      <div class="admin-info d-flex align-items-center jy-content-center">
        <img src="@/assets/images/user-13.jpeg" alt="" />
        <div class="admin-profile">
          <h3>GinJack</h3>
          <p>Front end developer</p>
        </div>
      </div>
      <ul>
        <li>
          <a href="#">
            <i class="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="./products.html">
            <i class="fab fa-product-hunt"></i>
            <span>Products</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fas fa-border-all"></i>
            <span>Orders</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fas fa-ticket-alt"></i>
            <span>Coupon</span>
          </a>
        </li>
      </ul>
      <div class="side-toggle">
        <span class="icon">
          <i class="fas fa-arrow-alt-circle-left"></i>
        </span>
        <span class="icon" style="dispaly: none">
          <i class="fas fa-arrow-alt-circle-right"></i>
        </span>
      </div>
    </div>
    <router-view v-if="isCheck"></router-view>
  </section>
</template>

<script>
export default {
  name: 'DashBoard',
  data () {
    return {
      isCheck: false,
      isLoading: false
    }
  },
  methods: {
    checkLogin () {
      this.isLoading = true
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      if (token) {
        this.$http.defaults.headers.common.Authorization = token
        this.$http.post(`${process.env.VUE_APP_APIURL}/api/user/check`, { api_token: this.token })
          .then(() => {
            this.isCheck = true
            this.isLoading = false
          })
          .catch((err) => {
            console.dir(err)
            this.$router.push('/login')
          })
      } else {
        alert('您尚未登入')
        this.$router.push('/login')
      }
    },
    logout () {
      this.$http.post(`${process.env.VUE_APP_APIURL}/logout`)
        .then(() => {
          alert('登出成功')
          document.cookie = 'hexToken=;expires=;'
          this.$router.push('/login')
        })
        .catch(err => {
          console.dir(err)
        })
    }
  },
  mounted () {
    this.checkLogin()
    this.$emitter.on('isAdminLoading', (status) => {
      this.isLoading = status
    })
  },
  unmounted () {
    this.$emitter.off('isAdminLoading')
  }
}
</script>

<style lang="scss">
@import "@/assets/sass/page/product.scss";
</style>
