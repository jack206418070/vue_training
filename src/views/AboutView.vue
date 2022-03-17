<template>
  <div class="about">
    <div class="about-banner" :style="{ backgroundImage: `url( ${require('@/assets/images/about_bg.jpeg')})`}">
      <div class="container">
        <h3>關於放心初</h3>
      </div>
    </div>
    <div class="container">
      <div class="content">
        <div class="row jy-content-between">
          <div class="col-sm-3">
            <ul class="border-r-1">
              <li class="mb-3 active">
                <router-link :to="{ path: '/about', query: { sn: '1' } }">
                  關於放心初
                </router-link>
              </li>
              <!-- <li class="mb-3">
                <router-link :to="{ path: '/about', query: { sn: '2' } }">
                  隱私權保護政策
                </router-link>
              </li>
              <li class="mb-3">
                <router-link :to="{ path: '/about', query: { sn: '3' } }">
                  客戶與權利義務
                </router-link>
              </li> -->
            </ul>
          </div>
          <div class="col-sm-8">
            <div class="content-desc">
              <div class="about-bg mb-10" :style="{ backgroundImage: `url( ${require('@/assets/images/about-1.png')})`}"></div>
              <div class="about-bg" :style="{ backgroundImage: `url( ${require('@/assets/images/about-2.png')})`}"></div>
              <h4 class="my-3">牽起產地農民的手</h4>
              <p>
                <span class="pl-3"></span>
                【 放心初 】為好初水果有限公司創立的線上蔬果購物平台，不只是為了創新網路電商品牌，
                 更具有好初水果有限公司傳承而來的傳統蔬果市場專業背景，以及親切熟悉的人情味。
                 我們更與產地攜手合作，嚴格把關蔬果品質及產銷履歷，將新鮮嚴選的水果，直送府上。
              </p>
              <p class="d-flex jy-content-between">
                <span class="pr-10 pt-20 pt-md-5 pt-sm-10">
                  <span class="pl-3 align-self-start"></span>
                  【 放心初 】為好初水果有限公司創立的線上蔬果購物平台，不只是為了創新網路電商品牌，
                  更具有好初水果有限公司傳承而來的傳統蔬果市場專業背景，以及親切熟悉的人情味。
                  我們更與產地攜手合作，嚴格把關蔬果品質及產銷履歷，將新鮮嚴選的水果，直送府上。
                </span>
                <span class="text-ver-lr ver-text">
                  想吃，就吃得到。
                </span>
              </p>
              <div class="about-bg bg-h-50 mt-desc-20" :style="{ backgroundImage: `url( ${require('@/assets/images/about-3.png')})`}"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .about{
    .content{
      padding: 100px 0;
      @include mobile {
        padding: 50px 0;
      }
      li{
        @include mobile{
          text-align: center;
        }
        a{
          font-size: 1.125rem;
          letter-spacing: 2px;
          font-weight: lighter;
          border-left: 2px solid transparent;
          padding-left: 4px;
          display: block;
          @include mobile {
            text-align: center;
            border-bottom: 2px solid transparent;
            display: inline-block;
          }
        }
        &.active, &:hover{
          a{
            color: $primary;
            border-left: 2px solid $primary;
            @include mobile {
              border-left: 0;
              border-bottom: 2px solid $primary;
            }
          }
        }
      }
      &-desc{
        h4{
          font-size: 36px;
          font-weight: bold;
          padding-left: 24px;
          color: #000;
        }
        p{
          line-height: 2;
          color: #555;
          @include mobile {
            line-height: 1.5;
          }
        }
        .ver-text{
          font-size: 48px;
          font-weight: bold;
          color: #000;
        }
      }
      .border-r-1{
        border-right: 1px solid #000;
        @include mobile {
          border-right: 0px;
        }
      }
    }
  }
  .about-bg{
    height: 400px;
    background-size: cover;
    background-position: center center;
    @include mobile {
      height: 300px;
    }
    &.bg-h-50{
      height: 250px;
    }
  }
  .mt-desc-20{
    margin-top: -120px;
  }
  .about-banner{
    background-size: cover;
    background-position: center center;
    padding-top: 80px;
    height: 400px;
    @include mobile {
      height: 250px;
    }
    h3{
      padding-left: 10%;
      font-size: 2.25rem;
      letter-spacing:5px;
      margin-top: 10%;
    }
  }
</style>
