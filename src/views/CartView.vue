<template>
<div class="container">
  <div class="cart">
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
            <div class="step-item active">
              <h3 class="text-medium">
                <span class="active">1</span>
                明細消費
              </h3>
              <div class="hide-bar active"></div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="step-item">
              <h3 class="text-medium">
                <span>2</span>
                填寫資料
              </h3>
              <div class="hide-bar"></div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="step-item">
              <h3 class="text-medium">
                <span>3</span>
                購買完成
              </h3>
              <div class="hide-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ul class="mb-10">
      <li class="row py-4 bg-secondary">
        <div class="col-lg-4">
          <p class="text-center text-c-white">商品</p>
        </div>
        <div class="col-lg-2">
          <p class="text-center text-c-white">數量</p>
        </div>
        <div class="col-lg-2">
          <p class="text-center text-c-white">售價</p>
        </div>
        <div class="col-lg-2">
          <p class="text-center text-c-white">小計</p>
        </div>
        <div class="col-lg-2">
          <p class="text-center text-c-white">操作</p>
        </div>
      </li>
      <li class="row py-4 bg-white align-items-center border-b-1">
        <div class="col-lg-4 d-flex jy-content-center">
          <div class="img-bg px-1" style="background-image: url(https://www.funthingtrue.com.tw/upload/product/20220210113009_p1.jpg)"></div>
          <div class="content px-3">
            <h3 class="text-medium">嘎啦脆爆米花心滿意足12件組</h3>
            <p>
              規格：12包<br>
              重量：0.72 kg ±10%
            </p>
          </div>
        </div>
        <div class="col-lg-2">
          <select class="py-2" name="qty" id="qty">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div class="col-lg-2">
          <p class="text-medium text-center text-c-primary">NT $990</p>
        </div>
        <div class="col-lg-2">
          <p class="text-medium text-center text-c-primary">NT $990</p>
        </div>
        <div class="col-lg-2">
          <button class="user-btn user-btn-primary m-auto py-1 px-2">
            <span class="text-c-white">
              X
            </span>
          </button>
        </div>
      </li>
      <li class="row py-4 bg-white align-items-center border-b-1">
        <div class="col-lg-4 d-flex jy-content-center">
          <div class="img-bg px-1" style="background-image: url(https://www.funthingtrue.com.tw/upload/product/20220210113009_p1.jpg)"></div>
          <div class="content px-3">
            <h3 class="text-medium">嘎啦脆爆米花心滿意足12件組</h3>
            <p>
              規格：12包<br>
              重量：0.72 kg ±10%
            </p>
          </div>
        </div>
        <div class="col-lg-2">
          <select class="py-2" name="qty" id="qty">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div class="col-lg-2">
          <p class="text-medium text-center text-c-primary">NT $990</p>
        </div>
        <div class="col-lg-2">
          <p class="text-medium text-center text-c-primary">NT $990</p>
        </div>
        <div class="col-lg-2">
          <button class="user-btn user-btn-primary m-auto py-1 px-2">
            <span class="text-c-white">
              X
            </span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .cart{
    padding-top: 60px;
    &-title{
      padding: 5% 0;
    }
    .step-item{
      min-height: 60px;
      background-color: #C1C1C1;
      position: relative;
      .hide-bar{
        width: 0;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        transform: translateX(100%);
        border-style: solid;
        border-width: 30px 0 30px 14px;
        border-color: transparent transparent transparent #C1C1C1;
        &.active{
          border-color: transparent transparent transparent $secondary;
        }
      }
      h3{
        color: white;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 60px;
        span{
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
          color: #C1C1C1;
          &.active{
            color: $secondary;
          }
        }
      }
      &.active{
        background-color: $secondary;
      }
    }
    .img-bg{
      background-size: cover;
      background-position: center center;
      flex: 0 0 30%;
    }
    select{
      width: 100%;
      text-align: center;
      &:focus{
        outline: none;
      }
    }
  }
</style>
