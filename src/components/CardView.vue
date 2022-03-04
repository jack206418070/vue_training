<template>
    <div class="card">
        <div class="card-title bg-primary">
            <h3 class="text-medium text-c-white">{{ title }}</h3>
        </div>
        <div class="card-body">
        </div>
        <div class="card-footer">
            <h4 class="text-medium text-left" :style="{'color': originColor}">嘎啦脆爆米花心滿意足12件組</h4>
            <p class="text-c-primary text-left mb-2">12包 / 0.72 kg ±10%</p>
            <div class="price d-flex align-items-center jy-content-between">
              <p class="price-origin" :style="{'color': originColor}">$1290</p>
              <p class="price-discount">$900</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['titleColor', 'originColor'],
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
            background-image: url(https://www.funthingtrue.com.tw/upload/product/20220210113009_p1.jpg);
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
