<template>
  <NewsModal></NewsModal>
  <AlertMessages></AlertMessages>
  <LoadingView :active="isLoading">
    <div class="loadingio-spinner-pulse-glqepjl9sp">
      <div class="ldio-wiw3itsk6ko">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </LoadingView>
  <router-view/>
</template>

<script>
import AlertMessages from '@/components/AlertModal.vue'
import NewsModal from '@/components/NewsModal.vue'
export default {
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    AlertMessages,
    NewsModal
  },
  mounted () {
    this.$emitter.on('isLoading', (status) => {
      this.isLoading = status
    })
  }
}
</script>

<style lang="scss">
  body{
    margin: 0 !important;
  }
</style>
