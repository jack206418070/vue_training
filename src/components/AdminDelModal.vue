<template>
  <div class="productModal" v-if="isShow">
    <h2>刪除{{ type }}</h2>
    <div class="delete__content">
      <p v-if="type === '訂單'">確定要刪除 {{ data.user.name }} {{ data.create_at }} 的訂單嗎？</p>
      <p v-else-if="type === '優惠卷'">確定要刪除 {{ data.title }} 的優惠卷嗎？</p>
    </div>
    <div class="d-flex jy-content-between bg--dark--secondary py-1">
      <a @click.prevent="closeModal()"  class="btn btn--danger mx-3" href="#">取消</a>
      <a @click.prevent="$emit('delData', data.id)"  class="btn btn--success mx-3" href="#">
        刪除{{ type }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  emits: ['delData'],
  data () {
    return {
      isShow: false,
      type: ''
    }
  },
  methods: {
    openModal (type) {
      this.isShow = true
      this.type = type
    },
    closeModal () {
      this.isShow = false
      this.type = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn{
    display: block;
    color:#fff;
    padding: 5px 10px;
    letter-spacing: 0.1rem;
    font-size: 16px;
    border-radius: 4px;
    transition: 0.3s;
    text-align: center;
    &:hover{
        color: black;
    }
    &--success{
        background-color: #1A535C;
        &:hover{
            background-color: lighten(#1A535C, 20%);
        }
    }
    &--danger{
        background-color: #FF6B6B;
        &:hover{
            background-color: darken(#FF6B6B, 10%);
        }
    }
  }
  .productModal{
    position: absolute;
    width: 40%;
    background: #fff;
    z-index: 10;
    left: 50%;
    top: 80px;
    transform: translateX(-50%);
    transition: 0.3s;
    z-index: 100;
    opacity: 1;
    border: 1px solid gray;
    @include pad{
        width: 80% !important;
    }
    @media (max-width: 415px) {
        width: 100% !important;
    }
    h2{
        text-align: center;
        background: #FF6B6B;
        padding: 10px 0;
        color:white;
        font-weight: bold;
        font-size: 20px;
    }
    .delete__content{
      padding: 20px 0;
      p{
        text-align: center;
        font-weight: bold;
        color: red;
      }
    }
  }
</style>
