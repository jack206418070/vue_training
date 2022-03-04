<template>
  <section class="py-20">
    <div class="container">
      <div class="login d-flex align-items-center">
        <div class="login-left p-12">
          <h3 class="text-title-sm f-w-bold text-center mb-5">會員登入 | SIGN IN</h3>
          <p class="text-center text-medium f-w-normal mb-5">嗨Hi！歡迎回來請直接輸入您的放心初帳號、密碼。</p>
          <FormView v-slot="{ errors }" @submit="login" class="form-block">
            <div class="form-control mb-4">
              <label class="text-medium" for="email">輸入電子郵件*</label>
              <FieldView class="my-2 p-2" id="email" name="email" type="email" :class="{ 'is_invalid': errors['email'] }"
                placeholder="輸入電子郵件" rules="email|required" v-model="user.email"
              >
              </FieldView>
              <ErrorMessage style="color:red" name="email" class="invalid-feeback"></ErrorMessage>
            </div>
            <div class="form-control mb-4">
              <label class="text-medium" for="password">輸入密碼*</label>
              <FieldView class="my-2 p-2" id="password" name="password" type="password" :class="{ 'is_invalid': errors['password'] }"
                placeholder="輸入密碼" rules="required" v-model="user.password" suggested="current-password" autocomplete="on"
              >
              </FieldView>
              <ErrorMessage style="color:red" name="password" class="invalid-feeback"></ErrorMessage>
            </div>
            <div class="btn-group">
              <button class="btn btn-gray py-3" type="button">加入會員</button>
              <button class="btn btn-danger py-3" type="button">快速註冊</button>
              <button class="btn btn-thirdary py-3" type="submit">登入</button>
            </div>
          </FormView>
        </div>
        <div class="login-right p-10">
          <h3 class="text-title-sm f-w-bold text-center mb-5">直接購買</h3>
          <p class="text-center text-medium f-w-normal mb-5">
            因為天天吃，所以更在意。 將為你挑選新鮮優質的蔬果提供大家挑選。
          </p>
          <ul class="icon d-flex mb-2">
            <li class="icon-item">
              <img src="@/assets/images/login-01.png" alt="">
              <p class="text-medium text-center">全館消費累積紅利</p>
            </li>
            <li class="icon-item">
              <img src="@/assets/images/login-02.png" alt="">
              <p class="text-medium text-center">紅利點數折現金</p>
            </li>
            <li class="icon-item">
              <img src="@/assets/images/login-03.png" alt="">
              <p class="text-medium text-center">不定期紅利加倍送</p>
            </li>
          </ul>
          <router-link to="/product" class="btn btn-thirdary py-3">現在就挑選新鮮水果！</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const user = {
        username: this.user.email,
        password: this.user.password
      }
      this.$http.post(`${process.env.VUE_APP_APIURL}/admin/signin`, user)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          this.$router.push({ path: '/admin' })
        })
        .catch((err) => {
          console.log(err)
          alert('帳號或密碼輸入錯誤')
        })
    }
  }
}
</script>

<style lang="scss">
  .login {
    border: 1px solid #a8a8a8;
    position: relative;
    &::after{
      position: absolute;
      content: '';
      height: 80%;
      width: 1px;
      background-color: #eee;
      @include absCenter();
    }
    &-left{
      flex: 0 0 50%;
      .btn{
        flex: 0 0 33.3333%;
      }
    }
    &-right{
      flex: 0 0 50%;
      .btn{
        width: 60%;
        margin: 0 auto;
      }
    }
    .text-title-sm{
      font-size: 22px;
    }
    label{
      display: block;
    }
    input{
      width: 100%;
      border: 1px solid #a8a8a8;
      font-size: 16px;
      &:focus{
        outline: none;
      }
    }
    .btn{
      font-size: 18px;
      transition: .7s;
      &:hover{
        transform: scale(1.05);
      }
    }
    .icon-item{
      flex: 0 0 33.333%;
      padding: 10px;
      img{
        margin: 0 auto;
        display: block;
      }
    }
  }
</style>
