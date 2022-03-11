<template>
  <div class="about">
    <div class="about-banner" :style="{ backgroundImage: `url( ${require('@/assets/images/about_bg.jpeg')})`}">
      <div class="container">
        <h3>關於放心初</h3>
      </div>
    </div>
    <div class="container">
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  .card{
    flex: 0 0 19%;
    margin-right: 1%;
  }
  .about-banner{
    background-size: cover;
    background-position: center center;
    padding-top: 60px;
    height: 300px;
    h3{
      padding-left: 10%;
      font-size: 2.25rem;
      letter-spacing:5px;
      margin-top: 10%;
    }
  }
</style>
