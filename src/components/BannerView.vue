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
      <img src="@/assets/images/banner1.jpeg" alt="">
    </SwiperSlide>
    <SwiperSlide>
      <img src="@/assets/images/banner2.jpeg" alt="">
    </SwiperSlide>
    <SwiperSlide>
      <img src="@/assets/images/banner3.jpeg" alt="">
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
  }
  .swiper-pagination-bullet{
    background-color: #333;
    &-active{
      background-color: $primary;
    }
  }
</style>
