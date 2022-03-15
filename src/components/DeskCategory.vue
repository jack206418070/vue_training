<template>
  <div class="user-side-menu mt-10">
    <div class="search">
      <h3 class="text-title mb-2">輸入關鍵字</h3>
      <input type="text my-2" placeholder="請輸入商品名稱" name="name" />
      <button class="user-btn user-btn-gray my-4 py-2" type="button">
        查詢
      </button>
    </div>
    <ul class="user-menu">
      <li class="menu-item mt-10">
        <h3 class="text-medium text-c-thirdary f-size-xs mb-5">放心初精選</h3>
        <ul class="mt-1">
          <li class="text-medium f-w-bold mb-3" @click="is_active = '全部商品'" :class="{'active': is_active === '全部商品'}">
            <router-link :to="{name: '全部商品', query: {category: '全部商品'}}">
              全部商品
            </router-link>
          </li>
          <template v-for="item in category" :key="item">
            <li class="text-medium f-w-bold mb-3" @click="is_active = item" :class="{'active': is_active === item}">
              <router-link :to="{name: '全部商品', query: {category: item}}">
                {{ item }}
              </router-link>
            </li>
          </template>
        </ul>
      </li>
      <!-- <li class="menu-item mt-8">
        <h3 class="text-medium text-c-thirdary f-size-xs">放心初精選</h3>
        <ul class="mt-1">
          <li class="text-medium mt-2">
            <a href="#">新品上市</a>
          </li>
          <li class="text-medium mt-2">
            <a href="#">每週精選</a>
          </li>
          <li class="text-medium mt-2">
            <a href="#">檔期精選</a>
          </li>
          <li class="text-medium mt-2">
            <a href="#">加1元多1件</a>
          </li>
        </ul>
      </li>
      <li class="menu-item mt-10">
        <h3 class="text-medium text-c-thirdary f-size-xs">放心初精選</h3>
        <ul class="mt-1">
          <li class="text-medium mt-2">
            <a href="#">新品上市</a>
          </li>
          <li class="text-medium mt-2">
            <a href="#">每週精選</a>
          </li>
          <li class="text-medium mt-2">
            <a href="#">檔期精選</a>
          </li>
          <li class="text-medium mt-2">
            <a href="#">加1元多1件</a>
          </li>
        </ul>
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      is_active: false,
      category: []
    }
  },
  watch: {
    $route (to, from) {
      if (to.fullPath.indexOf('/product/') !== -1) {
        this.is_active = ''
      }
    }
  },
  mounted () {
    this.$http
      .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/products/all`)
      .then((res) => {
        const tempCategory = []
        res.data.products.forEach((product) => {
          tempCategory.push(product.category)
        })
        this.category = [...new Set(tempCategory)]
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style lang="scss">
.user-side-menu {
  padding-bottom: 12px;
  input {
    width: 100%;
    border: 1px solid #8e8e8e;
    padding: 8px 8px;
    background-color: #faf9f8;
    font-size: 18px;
    box-shadow: none;
    transition: 0.5s;
    display: block;
    &:focus {
      outline: none;
      border: 1px solid $primary;
    }
    &::placeholder {
      color: #ccc;
    }
  }
  .user-btn {
    width: 100%;
    font-size: 18px;
  }
}
.user-menu {
  a {
    &:hover {
      color: $primary;
    }
  }
  .menu-item{
    li{
      &.active, &:hover {
        a{
          color: $primary;
          border-left: 2px solid $primary;
        }
      }
      a{
        border-left: 2px solid transparent;
        padding-left: 5px;
        font-size: 18px;
        padding-top: 5px;
        padding-bottom: 5px;
        display: block;
      }
    }
  }
}
</style>
