<template>
  <div class="content">
    <div class="admin-container d-flex jy-content-center">
      <div class="total__product w-100 d-flex align-items-center jy-content-between">
        <p>目前有 1 個優惠卷</p>
        <a class="btn btn--success w-10" href="#">建立優惠卷</a>
      </div>
      <div class="product w-100 mb-3">
        <ul>
          <li class="product__title d-flex jy-content-between">
            <h3 class="text-c-white f-w-bold">建立日期</h3>
            <div class="info__group w-90">
              <ul class="d-flex fw-bold align-items-center">
                <li class="w-30 f-w-bold">優惠名稱</li>
                <li class="w-30 f-w-bold">優惠內容</li>
                <li class="w-15 f-w-bold">是否啟用</li>
                <li class="w-25 f-w-bold">編輯</li>
              </ul>
            </div>
          </li>
          <li class="product__item d-flex jy-content-between">
            <h3>123455</h3>
            <div class="info__group w-90">
              <ul class="d-flex fw-bold align-items-center">
                <li class="w-30 f-w-bold">超級特惠價格</li>
                <li class="w-30 f-w-bold">80%</li>
                <li class="w-15 f-w-bold d-flex jy-content-center px-4">
                  <div class="toggle active">
                  </div>
                  <p class="active">
                    啟用
                  </p>
                </li>
                <li class="w-25 f-w-bold d-flex jy-content-center flex-wrap">
                  <a class="btn btn--success w-30 mx-2" href="#">
                    <i class="fas fa-edit"></i>
                  </a>
                  <a class="btn btn--danger w-30 mx-2" href="#">
                    <i class="fas fa-trash-alt"></i>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <ModalView></ModalView>
  </div>
</template>

<script>
import ModalView from '@/components/AdminCModal.vue'
export default {
  components: {
    ModalView
  }
}
</script>

<style>

</style>
