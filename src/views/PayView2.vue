<template>
  <LoadingView :active="isLoading"></LoadingView>
  <div class="userInfo mb-10">
    <h3 class="text-medium py-4 px-5 mb-10">訂購資料</h3>
    <FormView v-slot="{ errors }" @submit="onSubmit" class="px-5">
      <div class="row">
        <div class="col-lg-6">
          <div class="form-control mb-2">
            <label for="name" class="mb-1">
              訂購人
              <ErrorMessage name="name" class="invalid-feedback"></ErrorMessage>
            </label>
            <FieldView
              id="name"
              name="name"
              type="text"
              class="form-input"
              :class="{ 'is-invalid': errors['name'] }"
              placeholder="請輸入 姓名"
              rules="required"
              v-model="form.user.name"
            ></FieldView>
          </div>
          <div class="form-control mb-2">
            <label for="email" class="mb-1">
              信箱
              <ErrorMessage
                name="email"
                class="invalid-feedback"
              ></ErrorMessage>
            </label>
            <FieldView
              id="email"
              name="email"
              type="email"
              class="form-input"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
              rules="email|required"
              v-model="form.user.email"
            ></FieldView>
          </div>
          <div class="form-control mb-2">
            <label for="region" class="mb-1">
              地區選擇
              <ErrorMessage
                name="address"
                class="invalid-feedback"
              ></ErrorMessage>
            </label>
            <FieldView
              id="address"
              name="address"
              :class="{ 'is-invalid': errors['address'] }"
              placeholder="請輸入地區"
              rules="required"
              as="select"
              v-model="form.user.address"
            >
              <option value="">請選擇地區</option>
              <option value="台北市">台北市</option>
              <option value="高雄市">高雄市</option>
            </FieldView>
          </div>
          <div class="form-control mb-2">
            <label for="phone" class="mb-1">
              電話
              <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
            </label>
            <FieldView
              id="phone"
              name="電話"
              type="text"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話"
              :rules="isPhone"
              v-model="form.user.tel"
            ></FieldView>
          </div>
          <div class="form-control mb-2">
            <label for="message" class="mb-1">留言</label>
            <FieldView
              id="message"
              name="message"
              type="text"
              v-model="form.message"
              as="textarea"
            ></FieldView>
          </div>
        </div>
        <div class="col-lg-6 mt-7">
          <div class="row">
            <div class="col-lg-6">
              <div
                class="pay_credit"
                :class="{ active: is_credit == true }"
                @click="is_credit = true"
              >
                <span>信用卡付款</span>
                <span class="icon">
                  <CreditCardIcon></CreditCardIcon>
                </span>
              </div>
            </div>
            <div class="col-lg-6">
              <div
                class="pay_cash"
                :class="{ active: is_credit == false }"
                @click="is_credit = false"
              >
                <span>現金付款</span>
                <span class="icon">
                  <CashIcon></CashIcon>
                </span>
              </div>
            </div>
            <div class="col-lg-12">
              <button
                class="user-btn user-btn-primary w-100 py-4 mb-0 mt-auto f-size-xs"
                type="submit"
              >
                下一步：完成付款
              </button>
            </div>
          </div>
        </div>
      </div>
    </FormView>
  </div>
</template>

<script>
import { CreditCardIcon, CashIcon } from '@heroicons/vue/outline'
export default {
  data () {
    return {
      is_credit: false,
      isLoading: false,
      form: {
        user: {}
      }
    }
  },
  components: {
    CreditCardIcon,
    CashIcon
  },
  methods: {
    onSubmit () {
      this.isLoading = true
      const order = this.form
      this.$http
        .post(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/order`, { data: order })
        .then((res) => {
          if (this.is_credit) {
            this.payOrder(res.data.orderId)
            return
          }
          this.isLoading = false
          this.$emitter.emit('updateCart', false)
          this.$router.push('/cart/payment3')
        })
        .catch((err) => {
          console.dir(err)
          alert('結帳失敗, 請確認資料正確性')
        })
    },
    payOrder (orderId) {
      this.$http
        .post(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/pay/${orderId}`)
        .then((res) => {
          console.log(res)
          this.isLoading = false
          this.$router.push('/cart/payment3')
          this.$emitter.emit('updateCart', false)
        })
        .catch((err) => {
          console.dir(err)
        })
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    }
  },
  mounted () {
    this.$emitter.emit('changeBar', 2)
  }
}
</script>

<style lang="scss" scoped>
.userInfo {
  h3 {
    background-color: #f5f5f5;
    font-size: 20px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  form {
    label {
      display: block;
      font-weight: 400;
      letter-spacing: 1.3px;
    }
    input,
    select,
    textarea {
      padding: 4px 12px;
      font-size: 18px;
      width: 100%;
    }
    textarea {
      min-height: 200px;
    }
  }
  .is-invalid {
    border: 1px solid red;
  }
  .invalid-feedback {
    color: red;
    font-weight: 400;
  }
  .pay_credit,
  .pay_cash {
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 30px;
    transition: 0.7s;
    span {
      text-align: center;
      margin: 0 4px;
    }
    &:hover,
    &.active {
      border: 1px solid $primary;
      background-color: $primary;
      color: white;
    }
  }
  .icon {
    display: block;
    width: 40px;
    height: 40px;
  }
}
</style>
