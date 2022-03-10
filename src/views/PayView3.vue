<template>
  <LoadingView :active="isLoading"></LoadingView>
  <div v-show="is_show" class="complete mb-10">
    <div class="row jy-content-center">
      <div class="col-lg-5">
        <p class="text-c-primary f-size-xl text-center">
          <i class="far fa-check-circle"></i>
        </p>
        <h3 class="text-center f-size-m mb-5">付款完成</h3>
        <p class="text-medium text-center lh-2 mb-5">
          感謝您，您已完成付款程序。<br>
          我們將在隔日為您出貨，請您注意取貨時間，以及電話通知。
        </p>
        <div class="btn-group d-flex jy-content-between">
          <button
            class="user-btn user-btn-primary py-3 px-5 hover-scale f-size-xs"
            type="button"
            @click="routerTo('/')"
          >回首頁</button>
          <button
            class="user-btn user-btn-thirdary py-3 px-5 hover-scale f-size-xs"
            type="button"
            @click="routerTo('/product')"
          >繼續採買</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['show_complete'],
  data () {
    return {
      isLoading: false,
      is_show: false
    }
  },
  methods: {
    routerTo (link) {
      this.$router.push(link)
    }
  },
  mounted () {
    console.log(this.show_complete)
    if (this.show_complete) {
      this.is_show = true
      this.$emitter.emit('changeBar', 3)
    } else {
      this.$router.push('/cart')
    }
  }
}
</script>

<style lang="scss">

</style>
