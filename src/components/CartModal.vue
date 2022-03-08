<template>
  <div class="cart-modal bg-secondary">
    <LoadingView :active="isLoading"></LoadingView>
    <div v-show="isShow" class="cart-modal-content p-3">
      <div class="title d-flex jy-content-between align-items-center">
        <h4 class="text-medium text-c-white f-size-xs">已選購清單</h4>
        <a @click.prevent="controlModal" class="close text-c-white" href="#">
          <XIcon></XIcon>
        </a>
      </div>
      <div class="user-content">
        <ul>
          <li class="user-content-title d-flex jy-content-between">
            <p class="name text-c-white">商品名稱</p>
            <p class="qty text-c-white">數量</p>
            <p class="onePrice text-c-white">單價</p>
            <p class="totalprice text-c-white">總價</p>
            <p class="delete"></p>
          </li>
          <li v-for="item in cart.carts"
              :key="item.id"
              class="user-content-inner d-flex align-items-center jy-content-between"
          >
            <p class="name text-c-white">{{ item.product.title }}</p>
            <p class="qty text-c-white">{{ item.qty }}</p>
            <p class="onePrice text-c-white">${{ item.product.price }}</p>
            <p class="totalprice text-c-white">${{ item.total }}</p>
            <a @click.prevent="delCartProducts(item.id)" class="delete text-c-white" href="#">
              <XIcon></XIcon>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div @click="controlModal" class="cart-modal-btn bg-secondary p-3">
      <p class="text-c-white">已購 ${{ cart.final_total }}</p>
    </div>
  </div>
</template>

<script>
import { XIcon } from '@heroicons/vue/solid'

export default {
  props: ['cartData'],
  emits: ['getCart'],
  data () {
    return {
      isShow: false,
      cart: [],
      isLoading: false
    }
  },
  components: {
    XIcon
  },
  methods: {
    controlModal () {
      this.isShow = !this.isShow
    },
    delCartProducts (id) {
      this.isLoading = true
      this.$http
        .delete(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then(() => {
          this.$emit('getCart')
          this.isLoading = false
        })
        .catch((err) => {
          console.dir(err)
        })
    }
  },
  watch: {
    cartData () {
      this.cart = this.cartData
    }
  },
  mounted () {
    this.cart = this.cartData
  }
}
</script>

<style lang="scss">
  .cart-modal{
    position: fixed;
    width: 30%;
    bottom: 100px;
    right: 70px;
    z-index: 30;
    .title{
      margin-bottom: 5px;
    }
    &-content{
      width: 100%;
      margin-bottom: 10px;
      height: 400px;
      background-color: $secondary;
      overflow: auto;
      .close{
        width: 24px;
        height: 24px;
      }
      .user-content{
        &-title{
          padding: 5px 0;
          border-bottom: 2px solid #fff;
        }
        &-inner{
          padding: 5px 0;
          border-bottom: 1px solid #fff;
        }
        .name{
          width: 30%;
        }
        .qty{
          width: 20%;
          text-align:center;
        }
        .onePrice{
          width: 20%;
          text-align:center;
        }
        .totalprice{
          width: 20%;
          text-align: right;
        }
        .delete{
          width: 24px;
          height: 24px;
          &:hover{
            color: $primary;
          }
        }
      }
    }
    &-btn{
      width: 120px;
      text-align: center;
      position:absolute;
      bottom: -55px;
      right: 0;
      cursor: pointer;
      &:hover{
        background-color: $primary;
      }
    }
  }
</style>
