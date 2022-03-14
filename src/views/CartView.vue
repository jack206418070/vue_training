<template>
<div class="container">
  <div class="cart pt-20">
    <StepView></StepView>
    <router-view/>
  </div>
</div>
</template>

<script>
import StepView from '@/components/StepView.vue'
export default {
  components: {
    StepView
  },
  mounted () {
    this.$emitter.emit('hideFooter', false)
  },
  unmounted () {
    this.$emitter.emit('hideFooter', true)
  }
}
</script>
