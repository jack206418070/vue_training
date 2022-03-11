<template>
  <div class="coupon-modal bg--white" v-if="is_show">
    <h3 class="bg--primary py-3 text-c-white f-w-bold f-size-s text-center">
      <span v-if="isNew">新增優惠卷</span>
      <span v-else>修改優惠卷</span>
    </h3>
    <FormView v-slot="{ errors }" class="form-block">
      <div class="form-control mb-4">
        <label class="text-medium" for="name">優惠卷名稱*</label>
        <FieldView class="my-2 p-2" id="name" name="name" type="text" :class="{ 'is_invalid': errors['name'] }"
                placeholder="輸入優惠卷名稱" rules="required" v-model="tempCoupon.title"
        >
        </FieldView>
        <ErrorMessage style="color:red" name="name" class="invalid-feeback"></ErrorMessage>
      </div>
      <div class="form-control mb-4">
        <label class="text-medium" for="percent">優惠折數(%)*</label>
        <FieldView class="my-2 p-2" id="percent" name="percent" type="number"
          :class="{'is_invalid': errors['percent'] }"
          placeholder="輸入打折數(%)" rules="required" v-model.number="tempCoupon.percent"
        >
        </FieldView>
        <ErrorMessage style="color:red" name="percent" class="invalid-feeback"></ErrorMessage>
      </div>
      <div class="form-control mb-4">
        <label class="text-medium" for="due_date">優惠到期日*</label>
        <FieldView class="my-2 p-2" id="due_date" name="due_date" type="date"
          :class="{'is_invalid': errors['due_date'] }"
          rules="required" v-model="due_date"
        >
        </FieldView>
        <ErrorMessage style="color:red" name="due_date" class="invalid-feeback"></ErrorMessage>
      </div>
      <div class="form-control mb-4">
        <label class="text-medium mb-1" for="percent">是否啟用</label>
        <div
          class="toggle" :class="{'active': tempCoupon.is_enabled === 1}"
          @click="tempCoupon.is_enabled == 0 ? tempCoupon.is_enabled = 1 : tempCoupon.is_enabled = 0"
        ></div>
      </div>
      <div class="form-control mb-4">
        <label class="text-medium" for="code">優惠卷CODE*</label>
        <FieldView class="my-2 p-2" id="code" name="code" type="text"
          :class="{'is_invalid': errors['code'] }"
          rules="required" v-model="tempCoupon.code"
        >
        </FieldView>
        <ErrorMessage style="color:red" name="code" class="invalid-feeback"></ErrorMessage>
      </div>
    </FormView>
    <div class="btn-group bg--secondary jy-content-between">
      <a class="btn btn--danger py-2 w-30 pointer" herf="#" @click.prevent="$emit('closeBack')">取消</a>
      <a class="btn btn--success py-2 w-30 pointer" herf="#" @click.prevent="$emit('updateCoupon', tempCoupon)">送出</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['coupon', 'isNew'],
  emits: ['updateCoupon', 'closeBack'],
  data () {
    return {
      tempCoupon: {
        is_enabled: 0
      },
      due_date: '',
      is_show: false
    }
  },
  methods: {
    openModal () {
      this.is_show = true
    },
    closeModal () {
      this.is_show = false
    }
  },
  watch: {
    coupon () {
      if (this.isNew) {
        this.tempCoupon = {
          ...this.coupon,
          is_enabled: 0
        }
      } else {
        this.tempCoupon = this.coupon
      }
      const dateToStamp = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T')
      this.due_date = dateToStamp[0]
    },
    due_date () {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  }
}
</script>

<style lang="scss">
  .coupon-modal{
    position: absolute;
    @include absCenter();
    z-index: 100;
    width: 30%;
    border: 1px solid #000;
    form{
      padding: 10px 10px;
    }
    label{
      display: block;
    }
    input{
      margin-right: 10px;
    }
    a{
      border-radius: 0 !important;
    }
  }
</style>
