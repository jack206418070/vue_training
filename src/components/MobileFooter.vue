<template>
  <div class="mobile-footer">
    <ul class="mobile-footer-menu">
      <li>
        <router-link to="/product">
          <img src="https://www.funthingtrue.com.tw/img/icon/new/icon-home.svg" alt="">
          <span>賣場</span>
        </router-link>
      </li>
      <li>
        <router-link to="/cart">
          <img src="https://www.funthingtrue.com.tw/img/icon/new/icon-bag.svg" alt="">
          <span>購物車</span>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <img src="https://www.funthingtrue.com.tw/img/icon/icon-wish.png" alt="">
          <span>我的最愛</span>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <img src="https://www.funthingtrue.com.tw/img/icon/new/icon-twolist.svg" alt="">
          <span>訂單查詢</span>
        </router-link>
      </li>
      <li>
        <router-link to="/login">
          <img src="https://www.funthingtrue.com.tw/img/icon/new/icon-member.svg" alt="">
          <span>登入</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  .mobile-footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #f5f5f5;
    display: none;
    z-index: 1000;
    &-menu{
      display: flex;
      li{
        flex: 0 0 20%;
        padding: 8px;
        text-align: center;
        img{
          display: block;
          margin: 0 auto;
        }
        span{
          display: block;
          padding-top: 4px;
        }
      }
    }
    @include pad{
      display: block;
    }
  }
</style>
