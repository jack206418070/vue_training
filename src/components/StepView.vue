<template>
  <div class="row jy-content-between align-items-center py-18 mb-10">
    <div class="col-lg-3">
      <h3 class="text-title">
        <span class="text-c-forthary">全台宅配</span>
        <span class="mx-2">|</span>
        <span>購物車</span>
      </h3>
    </div>
    <div class="col-lg-6">
      <div class="row">
        <div class="col-lg-4">
          <div class="step-item" :class="{'active': step > 0}">
            <h3 class="text-medium">
              <span :class="{'active': step > 0}">1</span>
              明細消費
            </h3>
            <div class="hide-bar" :class="{'active': step > 0}"></div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="step-item" :class="{'active': step > 1}">
            <h3 class="text-medium">
              <span :class="{'active': step > 1}">2</span>
              填寫資料
            </h3>
            <div class="hide-bar" :class="{'active': step > 1}"></div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="step-item" :class="{'active': step > 2}">
            <h3 class="text-medium">
              <span :class="{'active': step > 2}">3</span>
              購買完成
            </h3>
            <div class="hide-bar" :class="{'active': step > 2}"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      step: 1
    }
  },
  mounted () {
    this.$emitter.on('changeBar', (data) => {
      this.step = data
    })
  }
}
</script>

<style lang="scss">
.step-item {
  min-height: 60px;
  background-color: #c1c1c1;
  position: relative;
  .hide-bar {
    width: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    transform: translateX(100%);
    border-style: solid;
    border-width: 30px 0 30px 14px;
    border-color: transparent transparent transparent #c1c1c1;
    &.active {
      border-color: transparent transparent transparent $secondary;
    }
  }
  h3 {
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 60px;
    span {
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 20px;
      margin-right: 4px;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      color: #c1c1c1;
      &.active {
        color: $secondary;
      }
    }
  }
  &.active {
    background-color: $secondary;
  }
}
</style>
