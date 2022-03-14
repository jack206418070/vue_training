<template>
  <div
    class="mobile-search d-none d-md-block"
    :class="{'status': status}"
  >
    <div class="container">
      <div class="mobile-search-content">
        <div class="search d-flex jy-content-between">
          <input type="text" placeholder="請輸入商品名稱">
          <button class="user-btn user-btn-gary" type="button">查詢</button>
        </div>
        <div class="category-bar">
          <ul class="d-flex">
            <li class="text-medium" @click="getCategory('test')">放心初精選</li>
            <li class="text-medium" @click="getCategory('test2')">檔期精選</li>
            <li class="text-medium">水果</li>
            <li class="text-medium">蔬菜</li>
            <li class="text-medium">大魚大肉</li>
            <li class="text-medium">火鍋專區</li>
            <li class="text-medium">快速上桌</li>
            <li class="text-medium">傳統小吃</li>
          </ul>
        </div>
        <div v-if="category.length > 0" class="category">
          <ul class="d-flex">
            <li v-for="item in category" :key="item" class="text-medium text-c-white">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      category_bar: {
        test: {
          category: ['新品上市', '每週精選', '檔期精選', '加1元多1件'],
          step: 0
        },
        test2: {
          category: ['新品上市2', '每週精選2', '檔期精選2', '加1元多1件2'],
          step: 0
        }
      },
      category: [],
      step: 0,
      status: false
    }
  },
  methods: {
    getCategory (category) {
      for (const item in this.category_bar) {
        if (item !== category) {
          this.category_bar[item].step = 0
        }
      }
      if (this.category_bar[category].step === 0) {
        this.category_bar[category].step = 1
        this.category = this.category_bar[category].category
      } else {
        this.category_bar[category].step = 0
        this.category = []
      }
    }
  },
  mounted () {
    this.$emitter.on('changeTop', (status) => {
      this.status = status
    })
  }
}
</script>

<style lang="scss">
  .mobile-search{
    position: sticky;
    top: 70px;
    margin-bottom: 100px;
    z-index: 800;
    padding: 20px 0;
    padding-bottom: 0;
    background-color: #fff;
    &.status{
      top: 0 !important;
    }
    @include pad{
      margin-bottom: 60px;
    }
    @include mobile{
      top: 50px;
      margin-bottom: 60px;
    }
    .mobile-search-content{
      position: relative;
    }
    .search{
      margin-bottom: 15px;
      @include mobile{
        margin-bottom: 12px;
      }
      input, button{
        border-radius: 4px;
        padding: 8px 0;
      }
      input{
        flex: 0 0 80%;
        padding-left: 4px;
      }
      button{
        flex: 0 0 15%;
      }
    }
    .category-bar{
      overflow-y: scroll;
      border-bottom: 1px solid #ccc;
      &::-webkit-scrollbar {
        display: none;
      }
      li{
        white-space: nowrap;
        margin-right: 8%;
        padding: 8px 0;
        cursor: pointer;
        &.active{
          color: $primary;
        }
      }
    }
    .category{
      position: absolute;
      top: 80px;
      background-color: #fff;
      z-index: 800;
      padding: 16px 0;
      width: 100%;
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      li{
        padding: 8px 20px;
        text-align: center;
        background: $primary;
        border-radius: 20px;
        margin-right: 5%;
        white-space: nowrap;
        flex: 0 0 27%;
        @include mobile{
          padding: 6px;
        }
      }
    }
  }
</style>
