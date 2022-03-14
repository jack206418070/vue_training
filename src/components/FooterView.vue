<template>
  <footer :class="{'d-sm-none': isFooter_show}">
    <div class="container">
      <main>
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
            <div class="community-menu">
              <h3 class="text-medium text-center mb-4">企業團購 / 聯絡方式</h3>
              <div class="mb-1">
                <a class="text-medium text-center d-block w-60 mx-auto" href="tel:+886-2-23086299">(02)2308-6299</a>
              </div>
              <div class="mb-4">
                <a class="text-medium text-center d-block w-60 mx-auto" href="mailto:funthingtrue@gmail.com">funthingtrue@gmail.com</a>
              </div>
            </div>
            <ul class="d-flex jy-content-end">
              <li class="mx-2"><a class="icon-fb icon" href="#"></a></li>
              <li class="mx-2"><a class="icon-line icon" href="#"></a></li>
              <li class="mx-2"><a class="icon-ig icon" href="#"></a></li>
            </ul>
          </div>
        </div>
      </main>
    </div>
    <div class="copyright bg-container py-2">
        <p class="text-c-white text-center">
            好初水果有限公司｜台灣本地 X 進口當季水果宅配 © 僅供學習用無任何商業用途
        </p>
    </div>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      isFooter_show: false
    }
  },
  watch: {
    $route (to, from) {
      if (to.fullPath.indexOf('/cart') !== -1) {
        this.isFooter_show = true
      } else {
        this.isFooter_show = false
      }
    }
  },
  mounted () {
    if (this.$route.fullPath.indexOf('/cart') !== -1) {
      this.isFooter_show = true
    } else {
      this.isFooter_show = false
    }
  }
}
</script>

<style lang="scss">
  footer{
    background-color: #f5f5f5;
    a{
      &:hover{
          color: $primary;
        }
    }
    main{
      padding: 50px 0;
      display: flex;
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
      .icon{
        display: block;
        width: 33px;
        height: 33px;
        background-repeat: no-repeat;
        transition: .7s;
        &:hover{
          opacity: 0.7;
        }
      }
      &-menu{
        display: none;
      }
    }
    @media screen and (max-width: 996px) {
      .right{
        flex: 0 0 100%;
        nav{
          display: none;
        }
        .community{
          ul{
            justify-content: center;
          }
          &-menu{
            display: block;
          }
        }
      }
      .info{
        display: none;
      }
      .copyright{
        display: none;
      }
      main{
        display: block;
        padding-bottom: 100px;
      }
    }
  }
</style>
