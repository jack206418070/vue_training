<template>
   <div class="header">
    <div class="container d-flex jy-content-between align-items-center">
      <div class="logo">
        <router-link to="/" class="logo-btn">Home</router-link>
        <img src="@/assets/images/home-logo.svg" alt="">
      </div>
      <ul class="menu d-flex">
        <div class="mobile-title d-none d-md-block">
          <h1 class="text-medium f-w-bold text-center">放心初蔬果網</h1>
        </div>
        <li class="menu-item pr-8">
          <router-link to="/product">全台宅配</router-link>
        </li>
        <li class="menu-item pr-8">
          <router-link to="/product">雙北隔日配</router-link>
        </li>
        <li class="menu-item pr-8">
          <router-link to="/about">關於我們</router-link>
        </li>
      </ul>
      <ul class="menu menu-user d-flex hash jy-content-end align-items-center">
        <li class="menu-icon mr-4">
          <HeartIcon style="width:24px;"></HeartIcon>
        </li>
        <li class="menu-icon p-relative">
          <router-link to="/cart">
            <div class="cart-amount">{{ cartLen }}</div>
            <ShoppingCartIcon style="width:24px;"></ShoppingCartIcon>
          </router-link>
        </li>
        <li class="menu-item sign-in text-right">
          <router-link to="/login">登入</router-link>
        </li>
      </ul>
      <div class="mobile-hambur" @click="is_show = !is_show">
      </div>
    </div>
  </div>
  <div class="mobile-menu" :class="{'show': is_show}">
    <ul class="mt-5">
      <li @click="is_show = false">
        <router-link to="/product">
          <p class="px-2 py-3 text-medium text-c-primary">雙北隔日配</p>
        </router-link>
      </li>
      <li @click="is_show = false">
        <router-link to="/product">
          <p class="px-2 py-3 text-medium text-c-forthary">全台宅配</p>
        </router-link>
      </li>
      <li @click="is_show = false">
        <router-link to="/">
          <p class="px-2 py-3 text-medium">部落格</p>
        </router-link>
      </li>
      <li @click="is_show = false">
        <router-link to="/about">
          <p class="px-2 py-3 text-medium">關於放心初</p>
        </router-link>
      </li>
    </ul>
  </div>
  <div class="back" :class="{'show': is_show}" @click="is_show = !is_show">
  </div>
</template>

<script>
import { HeartIcon, ShoppingCartIcon } from '@heroicons/vue/outline'

export default {
  data () {
    return {
      cart: [],
      is_show: false
    }
  },
  components: {
    HeartIcon,
    ShoppingCartIcon
  },
  methods: {
    getCart () {
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data.carts
        })
        .catch((err) => {
          console.dir(err)
        })
    }
  },
  computed: {
    cartLen () {
      const temp = 0
      const len = this.cart.reduce((pre, current) => pre + current.qty, temp)
      return len
    }
  },
  mounted () {
    this.getCart()
    this.$emitter.on('updateCart', (data) => {
      if (data === false) {
        this.getCart()
      } else {
        this.cart = data.carts
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .header {
    padding: 20px 0;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
    position: fixed;
    top:0;
    width: 100%;
    z-index:1000;
    background-color: white;
    @include mobile{
      padding: 10px 0;
    }
    .logo{
      position: relative;
      &-btn{
        position: absolute;
        @include absCenter();
        padding: 4px 12px;
        opacity: 0;
      }
      @include pad{
        flex: 0 0 5%;
      }
    }
    .mobile-hambur{
      height: 30px;
      cursor: pointer;
      display: none;
      position: relative;
      &::before{
        position: absolute;
        content: '';
        top: 30%;
        left: 0;
        width: 80%;
        height: 2px;
        background-color: #555;
      }
      &::after{
        position: absolute;
        content: '';
        top: 60%;
        left: 0;
        width: 50%;
        height: 2px;
        background-color: #555;
      }
      @include pad{
        display: block;
        flex: 0 0 5%;
      }
    }
    .menu{
      position: relative;
      flex: 0 0 60%;
      &-icon{
        width: 24px;
        height: 24px;
        cursor: pointer;
        color: #555555;
      }
      &-user{
        flex: 0 0 20%;
      }
      .sign-in{
        flex: 0 0 40%;
      }
      a{
        letter-spacing: 1.3px;
        font-weight: 500;
        font-size: 18px;
        &:hover{
          color: $primary;
        }
        &.active{
          color: $primary;
        }
      }
      @include pad{
        display: block;
        &.menu-user{
          display: none;
        }
        &-item{
          display: none;
        }
      }
    }
    .hash{
        &::after{
          position: absolute;
          content: '';
          top: 0;
          width: 3px;
          background-color: #ccc;
          left: 70%;
          height: 100%;
        }
    }
  }
  .mobile-menu{
    position: fixed;
    width: 30%;
    top: 70px;
    background-color: #fff;
    height: calc(100vh - 70px);
    z-index: 900;
    right: -100%;
    transition: .5s;
    display: none;
    li{
      border-bottom: 1px solid #e7e7e7;
    }
    &.show{
      right: 0;
    }
    @include pad{
      display: block;
    }
    @include mobile{
      width: 50%;
    }
  }
  .back{
    position: fixed;
    background: #999;
    opacity: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: -100;
    transition: .5s;
    &.show{
      z-index: 800;
      opacity: .7;
    }
  }
  .cart-amount{
    position: absolute;
    height: 18px;
    width: 18px;
    font-size: 12px;
    border-radius: 50%;
    line-height: 18px;
    text-align: center;
    background-color: red;
    color: white;
    top: -30%;
    right: -30%;
  }
</style>
