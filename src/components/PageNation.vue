<template>
  <ul class="pagination d-flex align-items-center jy-content-center" :style="{backgroundColor: style.bg}">
    <li v-show="pagination.has_pre" :style="styleObject" class="pagination__prev" @click="$emit('getProduct',pagination.current_page - 1)"><span><i class="fas fa-chevron-left"></i>Prev</span></li>
    <li class="pagination__item"
      v-for="page in pagination.total_pages"
      :key="page"
      :class="{'active': page === pagination.current_page}"
      :style="styleObject"
      @click="$emit('getProduct',page)">
      <span>{{ page }}</span>
    </li>
    <li v-show="pagination.has_next"  :style="styleObject" class="pagination__next" @click="$emit('getProduct',pagination.current_page + 1)"> <span>Next<i class="fas fa-chevron-right"></i></span></li>
  </ul>
</template>

<script>
export default {
  props: ['pagination', 'style'],
  emits: ['getProduct'],
  computed: {
    styleObject () {
      return {
        '--background': this.style.bg,
        '--background-hover': this.style.hoverBg
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .pagination{
    font-size: 20px;
    max-width: 300px;
    margin: 0 auto;
    color: #fff;
    font-weight: bold;
    border-radius: 50px;
    padding: 8px 0;
    cursor: pointer;
    &__prev, &__next{
        padding: 4px 16px;
        i{
            margin: 0 4px;
            font-size: 20px;
        }
        &:hover{
          background-color: var(--background-hover);
        }
    }
    &__prev{
        border-radius: 30px 0 0 30px;
    }
    &__next{
        border-radius: 0 30px 30px 0;
    }
    &__item{
        padding: 4px 16px;
        &.active{
            background-color: var(--background-hover);
        }
        &:hover{
          background-color: var(--background-hover);
        }
    }
  }
</style>
