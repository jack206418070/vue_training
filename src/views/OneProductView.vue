<template>
  <h1>{{ product.title }}</h1>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      product: {}
    }
  },
  mounted () {
    this.$http
      .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/product/${this.id}`)
      .then((res) => {
        this.product = res.data.product
      })
      .catch((err) => {
        console.dir(err)
      })
  }
}
</script>
