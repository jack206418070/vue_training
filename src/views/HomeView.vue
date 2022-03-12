<template>
  <BannerView></BannerView>
  <div class="home">
    <div class="container">
      <section class="py-18">
        <h2 class="text-title mb-7">主題賣場</h2>
        <div class="service d-flex jy-content-between">
          <div class="item">
            <router-link to="/product" :style="{ backgroundImage: `url( ${require('@/assets/images/bg_service1.jpeg')})`}">
              <img src="@/assets/images/icon_service1.svg" alt="">
              <h4 class="text-title text-c-white text-center">雙北隔日配</h4></router-link>
          </div>
          <div class="item">
            <router-link to="/product" :style="{ backgroundImage: `url( ${require('@/assets/images/bg_service2.jpeg')})`}">
              <img src="@/assets/images/icon_service2.svg" alt="">
              <h4 class="text-title text-c-white text-center">全台宅配</h4>
            </router-link>
          </div>
        </div>
      </section>
    </div>
    <section>
      <div class="hotblock">
        <div class="top"></div>
        <div class="container">
          <div class="title d-flex jy-content-between">
            <div class="title-left d-flex align-items-center pt-7">
              <img src="@/assets/images/icon_service1.svg" alt="" style="width:100px">
              <div>
                <h4 class="text-title text-c-white">雙北隔日快速到貨</h4>
                <p class="text-title-sm text-c-white">CURRENT DISTRIBUTION</p>
              </div>
            </div>
            <div class="title-right">
              <router-link to="/product" class=" d-flex align-items-center jy-content-end">
                <p>看更多</p>
                <ArrowCircleRightIcon></ArrowCircleRightIcon>
              </router-link>
            </div>
          </div>
          <div class="content">
            <div class="d-flex">
              <template v-for="item in products" :key="item.id">
                <CardView
                  :title-color="'white'"
                  :origin-color="'white'"
                  :product="item"
                ></CardView>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BannerView from '@/components/BannerView.vue'
import CardView from '@/components/CardView.vue'
import { ArrowCircleRightIcon } from '@heroicons/vue/solid'

export default {
  data () {
    return {
      products: []
    }
  },
  components: {
    BannerView,
    CardView,
    ArrowCircleRightIcon
  },
  mounted () {
    this.$emitter.emit('isLoading', true)
    this.$http
      .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/products`)
      .then((res) => {
        res.data.products.forEach((product, index) => {
          if (index <= 8) {
            this.products.push(product)
          }
        })
        this.$emitter.emit('isLoading', false)
      })
      .catch((err) => {
        console.dir(err)
      })
  }
}
</script>

<style lang="scss" scoped>
  .service {
    .item {
      flex: 0 0 49%;
      position: relative;
      a{
        display: block;
        padding: 12% 0;
        border-radius: 10px;
        box-shadow: 0 0 10px 3px rgba(0, 0, 0, 10%);
        transition: .7s;
        &:hover{
          opacity: 0.8;
        }
      }
      img{
        width: 33%;
        object-fit: cover;
        margin: 0 auto;
        display: block;
        margin-bottom: 20px;
      }
    }
  }
  .hotblock{
    background-image: url(@/assets/images/bg_hot.png);
    background-color: #bd9154;
    height: 600px;
    position: relative;
    .top{
      position: absolute;
      width: 55%;
      height: 90px;
      top:0;
      right: 0;
      background-color: #fff;
      &::after{
        position: absolute;
        content: '';
        top: 1px;
        left: -1px;
        width: 15%;
        height: 100%;
        transform: scaleY(1.03);
        background-color: #bd9154;
        clip-path: polygon(0 0, 0 100%, 100% 100%);
      }
    }
    .title-right{
      position: relative;
      z-index: 1;
      flex: 0 0 10%;
      a{
        color: #bd9154;
        line-height: 100px;
        svg{
          width: 24px;
          height: 24px;
        }
      }
      p{
        font-weight: 500;
        letter-spacing: 1.3px;
      }
    }
    .content{
      padding: 50px 0;
      overflow: auto;
    }
  }
  .card{
    flex: 0 0 19%;
    margin-right: 1.25%;
    @include pad {
      flex: 0 0 24%;
      margin-right: 1%;
    }
    @include mobile {
      flex: 0 0 32%;
      margin-right: 1.33%;
    }
  }
</style>
