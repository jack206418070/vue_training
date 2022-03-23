<template>
  <div v-if="show.bool">
    <div class="newsModal">
    </div>
    <div class="newsModal-content">
      <h3>
        <p>放心初好康優惠卷</p>
        <span @click="closeModal">Ｘ</span>
      </h3>
      <div class="bg-img"></div>
      <div class="coupon-text">
        <p class="coupon">{{ coupon }}</p>
        <button class="user-btn" type="button" @click="copyCoupon">複製優惠碼</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      coupon: 'welcome0958',
      show: {
        bool: false,
        active: false
      }
    }
  },
  methods: {
    copyCoupon () {
      localStorage.setItem('couponText', this.coupon)
      this.$swal('複製成功!', '將在購物車自動填入', 'success')
    },
    closeModal () {
      this.show = false
    }
  },
  watch: {
    $route (to) {
      if (to.fullPath === '/' && this.show.active === false) {
        this.show.bool = true
        this.show.active = true
      }
    }
  },
  mounted () {
    localStorage.setItem('couponText', '')
  }
}
</script>

<style lang="scss">
  .newsModal {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #555;
    height: 100vh;
    opacity: .8;
    z-index: 1001;
  }
  .newsModal-content{
    position: fixed;
    @include absCenter();
    width: 30%;
    background: #000;
    z-index: 1002;
    opacity: 0.7;
    @include pad {
      width: 50%;
    }
    @include mobile {
      width: 90%;
    }
    h3{
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p, span{
        color: white;
        text-align: center;
        font-size: 18px;
      }
      p{
        flex: 1 0 auto;
        padding-left: 50px;
      }
      span{
        flex-basis: 50px;
        cursor: pointer;
        font-weight: bold;
        &:hover{
          color: $primary;
        }
      }
    }
    .bg-img{
      background-image: url('https://www.funthingtrue.com.tw/upload/banner2/20220225163829_pic-mobile.jpg');
      background-position: center center;
      background-size: cover;
      height: 180px;
    }
    .coupon-text{
      padding: 20px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      p{
        color: white;
        font-size: 24px;
        letter-spacing: 1.5px
      }
      button{
        padding: 8px;
        margin-left: 10px;
      }
    }
  }
</style>
