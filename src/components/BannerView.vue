<template>
  <div class="runHorse py-3">
    <p class="text-center text-c-white">自選蔬果，雙北隔日配到家</p>
  </div>
  <Swiper
    :modules="modules"
    :slides-per-view="1"
    :space-between="50"
    navigation
    loop
    :speed="1000"
    :autoplay="{ delay: 2000 }"
    :pagination="{ clickable: true }"
  >
    <SwiperSlide>
      <div
        class="bg-img mobile_1"
        :style="{ backgroundImage: `url( ${require('@/assets/images/banner1.jpeg')})`}"
      ></div>
    </SwiperSlide>
    <SwiperSlide>
      <div
        class="bg-img mobile_2"
        :style="{ backgroundImage: `url( ${require('@/assets/images/banner2.jpeg')})`}"
      ></div>
    </SwiperSlide>
    <SwiperSlide>
      <div
        class="bg-img mobile_3"
        :style="{ backgroundImage: `url( ${require('@/assets/images/banner3.jpeg')})`}"
      ></div>
    </SwiperSlide>
  </Swiper>
</template>

<script>
import { Pagination, A11y, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/pagination'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup () {
    return {
      modules: [Pagination, A11y, Autoplay]
    }
  }
}
</script>

<style lang="scss">
  .runHorse{
    letter-spacing: 0.125rem;
    background-color: #9F9086;
    color: white;
    margin-top: 80px;
    @include pad{
      margin-top: 75px;
    }
     @include mobile{
      margin-top: 70px;
    }
  }
  .swiper-slide{
    .bg-img{
      background-size: cover;
      background-position: center center;
      padding-bottom: 27%;
      @include mobile{
        padding-bottom: 60%;
        &.mobile_1{
          background-image: url('@/assets/images/mobile-banner-1.jpeg') !important;
        }
        &.mobile_2{
          background-image: url('@/assets/images/mobile-banner-2.jpeg') !important;
        }
        &.mobile_3{
          background-image: url('@/assets/images/mobile-banner-3.jpeg') !important;
        }
      }
    }
  }
  .swiper-pagination-bullet{
    background-color: #333;
    &-active{
      background-color: $primary;
    }
  }
</style>
