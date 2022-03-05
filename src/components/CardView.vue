<template>
    <div class="card">
        <div class="card-title bg-primary">
            <h3 class="text-medium text-c-white">{{ title }}</h3>
        </div>
        <div class="card-body" :style="{backgroundImage: `url(${product.imageUrl})`}">
        </div>
        <div class="card-footer">
            <h4 class="text-medium text-left" :style="{'color': originColor}">{{ product.title }}</h4>
            <p class="text-c-primary text-left mb-2">{{ product.content }}</p>
            <div class="price d-flex align-items-center jy-content-between">
              <p class="price-origin" :style="{'color': originColor}">${{ product.origin_price }}</p>
              <p class="price-discount">${{ product.price }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['titleColor', 'originColor', 'product'],
  data () {
    return {
      title: '雙北隔日配',
      content: '這是內容',
      footer: '這是結尾'
    }
  }
}
</script>

<style lang="scss">
    .card {
        text-align: center;
        overflow: hidden;
        border-radius: 10px;
        &-title {
            padding: 10px 0;
        }
        &-body {
            padding-bottom: 100%;
            background-position: center center;
            background-size: contain;
        }
        &-footer {
            padding: 10px 0;
            .price-origin{
              color:#8e8e8e;
              text-decoration: line-through;
            }
            .price-discount{
              font-weight: bold;
              font-size: 18px;
              color: $primary;
            }
        }
    }
</style>
