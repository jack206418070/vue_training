<template>
   <div class="header">
    <div class="container d-flex jy-content-between align-items-center">
      <div class="logo">
        <router-link to="/" class="logo-btn">Home</router-link>
        <img src="@/assets/images/home-logo.svg" alt="">
      </div>
      <ul class="menu d-flex">
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
    </div>
  </div>
</template>

<script>
import { HeartIcon, ShoppingCartIcon } from '@heroicons/vue/outline'

export default {
  data () {
    return {
      cart: []
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
    padding: 10px 0;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
    position: fixed;
    top:0;
    width: 100%;
    z-index:1000;
    background-color: white;
    .logo{
      position: relative;
      &-btn{
        position: absolute;
        @include absCenter();
        padding: 4px 12px;
        opacity: 0;
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
