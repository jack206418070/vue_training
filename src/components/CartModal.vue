<template>
  <div class="cart-modal bg-secondary">
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
            <p class="price text-c-white">價錢</p>
            <p class="delete"></p>
          </li>
          <li class="user-content-inner d-flex align-items-center jy-content-between">
            <p class="name text-c-white">秋翠-綠無籽葡萄【五包】x1</p>
            <p class="price text-c-white">NT$ 1888</p>
            <a class="delete text-c-white" href="#">
              <XIcon></XIcon>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div @click="controlModal" class="cart-modal-btn bg-secondary p-3">
      <p class="text-c-white">已購 $199</p>
    </div>
  </div>
</template>

<script>
import { XIcon } from '@heroicons/vue/solid'

export default {
  data () {
    return {
      isShow: false
    }
  },
  components: {
    XIcon
  },
  methods: {
    controlModal () {
      this.isShow = !this.isShow
    }
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
          width: 60%;
        }
        .price{
          width: 30%;
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
