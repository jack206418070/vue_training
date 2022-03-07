<template>
  <div class="orderModal" v-if="isShow">
    <h3 class="d-flex align-items-center jy-content-between">
      <p>訂單資訊</p>
      <span @click="closeModal"><i class="fa-solid fa-xmark"></i></span></h3>
    <div class="content">
      <p>訂購日期: <span>{{ order.create_at }}</span></p>
      <p>姓名: <span>{{ order.user.name }}</span></p>
      <p>電話: <span>{{ order.user.tel }}</span></p>
      <p>Email: <span>{{ order.user.email }}</span></p>
      <p>住址: <span>{{ order.user.address }}</span></p>
      <p>付款方式: <span>{{ order.payment }}</span></p>
      <p class="paid">付款狀態:
        <span v-if="order.is_paid" class="text-success">已付款</span>
        <span v-else class="text-danger">未付款</span>
        <button @click="$emit('updatePaid', order)" class="pointer" type="button">更新付款狀態</button>
      </p>
      <ul>
        <li class="mb-2" style="padding: 0">訂購內容:</li>
        <li v-for="product in order.products" :key="product.id">
          {{ product.product.title }} -
          {{ product.qty }}{{ product.product.unit }} x {{ product.product.price }}元 =
          {{ product.total }}元
        </li>
      </ul>
      <p>總金額: <span>${{ order.total }}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['order'],
  emits: ['updatePaid'],
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    openModal () {
      this.isShow = true
    },
    closeModal () {
      this.isShow = false
    }
  }
}
</script>

<style lang="scss">
  .orderModal {
    position: absolute;
    width: 30%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    background: #fff;
    border: 1px solid #000;
    h3{
      background: #1A535C;
      padding: 16px 0;
      p{
        flex: 1 1 auto;
        color: white;
        font-weight: bold;
        text-align: center;
      }
      span{
        flex: 0 0 10%;
        color: white;
        font-weight: bold;
        text-align: center;
        font-size: 24px;
        cursor: pointer;
      }
    }
    .content{
      margin: 0 auto;
      padding: 16px;
      overflow: auto;
      p{
        margin-bottom: 8px;
        span{
          font-weight: 500;
          color: #000;
          &.text-success{
            color: #1A535C;
          }
          &.text-danger{
            color: red;
          }
        }
      }
      .paid{
        display: flex;
        align-items: center;
      }
      li{
        margin-bottom: 4px;
        padding-left: 8px;
      }
    }
  }
  .pointer{
    cursor: pointer;
  }
</style>
