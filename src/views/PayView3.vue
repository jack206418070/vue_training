<template>
  <LoadingView :active="isLoading"></LoadingView>
  <h1>這是結帳完成頁面</h1>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  mounted () {
    this.$emitter.emit('changeBar', 3)
  }
}
</script>

<style lang="scss">

</style>
