<template>
  <div class="article-modal">
    <h1>這是元件視窗</h1>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .article-modal{
    position: absolute;
    @include absCenter();
    padding-bottom: 300px;
    background-color: #000;
    h1{
      text-align: center;
      color: white;
      font-weight: bold;
    }
  }
</style>
