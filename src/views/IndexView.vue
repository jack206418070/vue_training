<template>
  <div class="header">
    <div class="container d-flex jy-content-between align-items-center">
      <div class="logo">
        <router-link to="/" class="logo-btn">Home</router-link>
        <img src="@/assets/images/home-logo.svg" alt="">
      </div>
      <ul class="menu d-flex">
        <li class="menu-item pr-8">
          <router-link to="/product" class="text-c-primary">全台宅配</router-link>
        </li>
        <li class="menu-item pr-8">
          <router-link to="/product" class="text-c-secondary">雙北隔日配</router-link>
        </li>
        <li class="menu-item pr-8">
          <router-link to="/about">關於我們</router-link>
        </li>
      </ul>
      <ul class="menu menu-user d-flex hash jy-content-end align-items-center">
        <li class="menu-icon mr-4">
          <HeartIcon style="width:24px;"></HeartIcon>
        </li>
        <li class="menu-icon">
          <ShoppingCartIcon style="width:24px;"></ShoppingCartIcon>
        </li>
        <li class="menu-item sign-in text-right">
          <router-link to="/login">登入</router-link>
        </li>
      </ul>
    </div>
  </div>
  <router-view></router-view>
  <footer>
    <div class="container">
      <main class="d-flex">
        <div class="info">
          <img class="mb-4" src="@/assets/images/logo-b.png" alt="">
          <p class="text-medium mb-4">
            水果禮盒｜高級水果<br>
            台灣本地Ｘ進口水果
          </p>
          <a class="d-block text-medium" href="tel:+886-2-23086299">(02)2308-6299</a>
          <a class="d-block text-medium" href="mailto:funthingtrue@gmail.com">funthingtrue@gmail.com</a>
        </div>
        <div class="right d-flex flex-dir-col jy-content-between">
          <nav>
            <ul class="menu d-flex jy-content-end">
              <li class="menu-item">
                <h3 class="text-medium">商品資訊</h3>
                <router-link class="text-medium mb-3" to="/product">全台宅配</router-link>
                <router-link class="text-medium" to="/product">雙北隔日配</router-link>
              </li>
              <li class="menu-item">
                <h3 class="text-medium">服務訊息</h3>
                <router-link class="text-medium mb-3" to="/">最新消息</router-link>
                <router-link class="text-medium mb-3" to="/">會員專區</router-link>
                <router-link class="text-medium" to="/">企業團購聯絡</router-link>
                <a class="d-block text-medium" href="mailto:funthingtrue@gmail.com">funthingtrue@gmail.com</a>
                <a class="d-block text-medium" href="tel:+886-2-23086299">(02)2308-6299</a>
              </li>
              <li class="menu-item">
                <h3 class="text-medium">放心初資訊</h3>
                <router-link class="text-medium mb-3" to="/">隱私權保護政策</router-link>
                <router-link class="text-medium mb-3" to="/">客戶權利與義務</router-link>
                <router-link class="text-medium mb-3" to="/">關於放心初</router-link>
              </li>
            </ul>
          </nav>
          <div class="community">
            <ul class="d-flex jy-content-end">
              <li class="ml-5"><a class="icon-fb" href="#"></a></li>
              <li class="ml-5"><a class="icon-line" href="#"></a></li>
              <li class="ml-5"><a class="icon-ig" href="#"></a></li>
            </ul>
          </div>
        </div>
      </main>
    </div>
    <div class="copyright bg-container py-2">
        <p class="text-c-white text-center">
            好初水果有限公司｜台灣本地 X 進口當季水果宅配 © Copyright funthingtrue 2020
        </p>
    </div>
  </footer>
</template>

<script>
import { HeartIcon, ShoppingCartIcon } from '@heroicons/vue/outline'

export default {
  data () {
    return {
    }
  },
  components: {
    HeartIcon,
    ShoppingCartIcon
  }
}
</script>

<style lang="scss" scoped>
  .header {
    padding: 10px 0;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
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
  footer{
    background-color: #f5f5f5;
    a{
      &:hover{
          color: $primary;
        }
    }
    main{
      padding: 50px 0;
    }
    .info{
      flex: 0 0 30%;
    }
    .right{
      flex: 0 0 70%;
    }
    .menu{
      a{
        display: block;
      }
      &-item{
        margin-right: 5vw;
      }
      h3{
        margin-bottom: 30px;
        color: $secondary;
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
  .icon-fb{
    background: url('https://www.funthingtrue.com.tw/img/fb.svg');
  }
  .icon-line{
    background: url('https://www.funthingtrue.com.tw/img/line.svg');
  }
  .icon-ig{
    background: url('https://www.funthingtrue.com.tw/img/ig.svg');
  }
  .copyright{
    background-color: #5d5d5d;
    font-size: 14px;
  }
  .community{
    a{
      display: block;
      width: 33px;
      height: 33px;
      background-repeat: no-repeat;
      transition: .7s;
      &:hover{
        opacity: 0.7;
      }
    }
  }
  .price{
    p{
      padding: 0;
    }
  }
</style>
