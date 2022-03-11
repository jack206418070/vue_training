<template>
  <div v-if="isShow" class="productModal">
    <h2>
      <span v-if="isNew">新增商品</span>
      <span v-else>編輯商品</span>
    </h2>
    <form action="#">
      <div class="form-group">
        <div class="form-control w-50">
          <label for="title">產品名稱</label>
          <input id="title" class="w-100" type="text" v-model="tempProduct.title">
        </div>
        <div class="form-control w-50">
          <label for="category">產品分類</label>
          <select id="category" v-model="tempProduct.category">
            <option value="" disabled>請選擇一個分類</option>
            <template v-for="item in category" :key="item">
              <option :value="item" >{{ item }}</option>
            </template>
          </select>
        </div>
      </div>
      <div class="form-group">
        <div class="form-control w-50">
          <label for="originPrice">原始價格</label>
          <input id="originPrice" type="number" min=0 v-model.number="tempProduct.origin_price">
        </div>
        <div class="form-control w-50">
          <label for="price">販售價格</label>
          <input id="price" type="number" min=0 v-model.number="tempProduct.price">
        </div>
      </div>
      <div class="form-group">
        <div class="form-control w-50">
          <div class="input-checkbox">
            <p class="mb-2">是否啟用</p>
            <div class="toggle" @click="tempProduct.is_enabled == 0 ? tempProduct.is_enabled = 1 : tempProduct.is_enabled = 0" :class="{'active': tempProduct.is_enabled == 1}">
            </div>
          </div>
        </div>
        <div class="form-control w-50">
          <label for="unit">單位</label>
          <input class="w-100"  type="text" name="unit" id="unit" v-model="tempProduct.unit">
        </div>
      </div>
      <div class="form-control">
        <label for="content">產品內容</label>
        <input type="text" id="content" v-model="tempProduct.content">
      </div>
      <div class="form-control">
        <label for="desc">產品描述</label>
        <textarea name="desc" id="desc" cols="30" rows="10" v-model="tempProduct.description"></textarea>
      </div>
      <div class="form-control eval">
        <h3 class="mb-1">產品評價</h3>
        <ul class="d-flex">
          <li class="me-1">
            <a herf="#" @click.prevent="tempProduct.eval = 1">
              <span class="icon-star" v-if="tempProduct.eval >= 1">
                <i class="fa-solid fa-star"></i>
              </span>
              <span class="icon-star" v-else>
                <i class="far fa-star"></i>
              </span>
            </a>
          </li>
          <li class="me-1">
            <a herf="#" @click.prevent="tempProduct.eval = 2">
              <span class="icon-star" v-if="tempProduct.eval >= 2">
                <i class="fa-solid fa-star"></i>
              </span>
              <span class="icon-star" v-else>
                <i class="far fa-star"></i>
              </span>
            </a>
          </li>
          <li class="me-1">
            <a herf="#" @click.prevent="tempProduct.eval = 3">
              <span class="icon-star" v-if="tempProduct.eval >= 3">
                <i class="fa-solid fa-star"></i>
              </span>
              <span class="icon-star" v-else>
                <i class="far fa-star"></i>
              </span>
            </a>
          </li>
          <li class="me-1">
            <a herf="#" @click.prevent="tempProduct.eval = 4">
              <span class="icon-star" v-if="tempProduct.eval >= 4">
                <i class="fa-solid fa-star"></i>
              </span>
              <span class="icon-star" v-else>
                <i class="far fa-star"></i>
              </span>
            </a>
          </li>
          <li>
            <a herf="#" @click.prevent="tempProduct.eval = 5">
              <span class="icon-star" v-if="tempProduct.eval >= 5">
                <i class="fa-solid fa-star"></i>
              </span>
              <span class="icon-star" v-else>
                <i class="far fa-star"></i>
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div class="form-control">
        <label for="file">封面圖片</label>
        <input @change="upload('single')" type="file" class="bg--white" id="file" name="filename"  placeholder="請輸入圖片連結" >
        <template v-if="tempProduct.imageUrl">
          <div class="file__img mt-2">
            <div class="file__img__del" @click="tempProduct.imageUrl = '' ">刪除</div>
            <img style="height: 80px" :src="tempProduct.imageUrl">
          </div>
        </template>
      </div>
      <div class="form-control">
        <label for="file">多層圖片</label>
        <input @change="upload('mult')" type="file" class="bg--white" id="file2" name="filename"  placeholder="請輸入圖片連結">
        <template v-if="tempProduct.imagesUrl">
          <div class="file__img me-2 mt-2" v-for="image in tempProduct.imagesUrl" :key="image">
            <div class="file__img__del" @click="tempProduct.imagesUrl.splice(key, 1)">刪除</div>
            <img style="height:80px;" :src="image">
          </div>
        </template>
      </div>
    </form>
    <div class="btn-group bg--dark--secondary">
      <a @click.prevent="$emit('closeBack')"  class="btn btn--danger" href="#">取消</a>
      <a @click.prevent="$emit('updateProduct', tempProduct)"  class="btn btn--success" href="#">
        <span v-if="isNew">新增</span>
        <span v-else>修改</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['updateProduct', 'closeBack'],
  props: ['isNew', 'product'],
  data () {
    return {
      modalTitle: '',
      tempProduct: {},
      isShow: false,
      category: ['蔬菜', '海鮮', '肉品', '水果']
    }
  },
  methods: {
    upload (type) {
      let fileInput
      if (type === 'mult') {
        fileInput = document.querySelector('#file2')
      } else {
        fileInput = document.querySelector('#file')
      }
      const file = fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', file)
      this.$http
        .post(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/upload`, formData)
        .then((res) => {
          const temp = this.tempProduct
          if (res.data.success) {
            if (type === 'single') {
              this.tempProduct.imageUrl = res.data.imageUrl
            } else {
              this.tempProduct.imagesUrl === [] ? this.tempProduct.imagesUrl = [] : this.tempProduct = temp
              this.tempProduct.imagesUrl.push(res.data.imageUrl)
            }
          }
        })
        .catch(err => {
          console.dir(err)
        })
    },
    openModal () {
      this.isShow = true
    },
    closeModal () {
      this.isShow = false
    }
  },
  watch: {
    product () {
      this.tempProduct = { ...this.product }
    }
  }
}
</script>

<style lang="scss" scoped>
  .bg--dark--secondary{
    background-color: darken(#F7FFF7, 5%);
  }
  .btn{
    display: block;
    color:#fff;
    padding: 5px 10px;
    letter-spacing: 0.1rem;
    font-size: 16px;
    border-radius: 4px;
    transition: 0.3s;
    text-align: center;
    &:hover{
        color: black;
    }
    &--success{
        background-color: #1A535C;
        &:hover{
            background-color: lighten(#1A535C, 20%);
        }
    }
    &--danger{
        background-color: #FF6B6B;
        &:hover{
            background-color: darken(#FF6B6B, 10%);
        }
    }
  }
  .me-2{
    margin-right: 8px;
  }
  .mt-2{
    margin-top: 8px;
  }
  .w-50{
    width: 50%;
  }
  .productModal{
    position: absolute;
    width: 40%;
    background: #fff;
    z-index: 10;
    left: 50%;
    top: 80px;
    transform: translateX(-50%);
    transition: 0.3s;
    z-index: 100;
    opacity: 1;
    border: 1px solid gray;
    &.show{
        opacity: 1;
    }
    @include pad{
        width: 80% !important;
    }
    @media (max-width: 415px) {
        width: 100% !important;
    }
    h2{
        text-align: center;
        background: #FF6B6B;
        padding: 10px 0;
        color:white;
        font-weight: bold;
        font-size: 20px;
    }
    .form-control{
      padding: 10px 30px;
      @include mobile{
        padding: 5px 15px;
        .toggle{
            width: 40% !important;
        }
      }
      input, select{
        width: 100%;
        font-size: initial;
      }
      textarea{
        padding: 10px;
        font-size: 20px;
        outline: none;
        border: 1px solid gray;
        width: 100%;
        font-size: initial;
      }
    }
    .form-group{
      display: flex;
    }
    form{
      height: 600px;
      background: #F7FFF7;
      overflow-y: scroll;
      @include mobile{
        height: 500px;
      }
      label{
        margin-bottom: 5px;
        display: block;
      }
      select{
        -webkit-appearance:none !important;
      }
      input, select{
        display: block;
        padding: 10px 5px;
        outline: none;
        border: 1px solid gray;
        border-radius:4px;
        transition: 0.1s;
        &:focus{
          outline: 3px solid gray;
        }
      }
    }
    .delete__content{
      padding: 20px 0;
      p{
        text-align: center;
        font-weight: bold;
        color: red;
      }
    }
    .eval{
        i{
          font-size: 20px;
          cursor: pointer;
          &:hover{
            font-weight: bold;
            color: $primary;
          }
          &.active{
            font-weight: bold;
            color: $primary;
          }
        }
    }
  }
  .file__img{
    position: relative;
    width: 80px;
    height: 80px;
    display:inline-block;
    .file__img__del{
        position: absolute;
        width: 60px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: white;
        background-color: lighten(#000, 20%);
        opacity: 0;
        padding: 10px;
        transition: .3s;
        cursor: pointer;
        &:hover{
            opacity: 1;
        }
    }
  }
  .btn-group{
    display: flex;
    justify-content:space-between;
    padding: 10px 30px;
    @include mobile{
        padding: 5px 15px;
    }
  }
</style>
