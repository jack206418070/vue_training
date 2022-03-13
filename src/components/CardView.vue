<template>
    <div class="card" @click="routerTo(product.id)">
        <div class="card-title bg-primary">
            <h3 class="text-medium text-c-white">{{ title }}</h3>
        </div>
        <div class="card-body" :style="{backgroundImage: `url(${product.imageUrl})`}">
          <div
            class="addToCart d-none d-sm-block"
            :class="{'z-index-bottom': titleColor === 'white'}"
          >
            <button
              @click.stop="$emit('addCart',1,product.id)"
              type="button"
              class="user-btn user-btn-thirdary py-3"
              :disabled="isBtnLoading === product.id"
            >
              <span v-if="isBtnLoading === product.id">
                <i class="fas fa-pulse fa-spinner"></i>
              </span>
              <span v-else>加入購物車</span>
            </button>
          </div>
        </div>
        <div class="card-footer">
            <h4 class="text-medium text-left" :style="{'color': originColor}">{{ product.title }}</h4>
            <p class="text-c-primary text-left mb-2">{{ product.unit }} / {{ product.content }}</p>
            <div class="user-price d-flex align-items-center jy-content-between">
              <p class="user-price-origin" :style="{'color': originColor}">${{ product.origin_price }}</p>
              <p class="user-price-discount">${{ product.price }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['titleColor', 'originColor', 'product', 'isLoading'],
  emits: ['addCart'],
  data () {
    return {
      title: '雙北隔日配',
      content: '這是內容',
      footer: '這是結尾',
      isBtnLoading: ''
    }
  },
  methods: {
    routerTo (id) {
      this.$router.push(`/product/${id}`)
    }
  },
  watch: {
    isLoading () {
      this.isBtnLoading = this.isLoading
    }
  }
}
</script>

<style lang="scss">
    .card {
        text-align: center;
        overflow: hidden;
        border-radius: 10px;
        cursor: pointer;
        &-title {
            padding: 10px 0;
        }
        &-body {
            padding-bottom: 100%;
            background-position: center center;
            background-size: contain;
            position: relative;
            vertical-align:top;
        }
        &-footer {
          padding: 10px 0;
          .user-price{
            .user-price-origin{
              color:#8e8e8e;
              text-decoration: line-through;
            }
            .user-price-discount{
              font-weight: bold;
              font-size: 18px;
              color: $primary;
            }
          }
        }
        .addToCart{
          position: absolute;
          bottom: -2px;
          z-index: 100;
          transition: .5s;
          width: 100%;
          button{
            width: 100%;
            @include mobile{
              font-size: 16px;
            }
          }
          &:hover{
            button{
              background-color: $primary;
            }
          }
        }
        .z-index-bottom{
          z-index: -10000;
        }
    }
</style>
