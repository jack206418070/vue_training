<template>
<div class="container">
  <div class="cart pt-15">
    <StepView></StepView>
    <router-view/>
  </div>
</div>
</template>

<script>
import StepView from '@/components/StepView.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    StepView
  }
}
</script>
