<template>
  <div v-if="is_show" class="article-modal bg--white">
    <h3 class="bg--primary py-3 text-c-white f-w-bold f-size-s text-center">
      <span v-if="isNew">新增文章</span>
      <span v-else>編輯文章</span>
    </h3>
    <FormView v-slot="{ errors }" class="form-block d-flex jy-content-between">
      <div class="form-left">
        <div class="form-control mb-4">
          <label class="text-medium" for="title">文章標題*</label>
          <FieldView
            class="my-2 p-2" id="title" name="title" type="text"
            :class="{'is_invalid': errors['title'] }"
            placeholder="請輸入標題" rules="required" v-model="tempArticle.title"
          ></FieldView>
          <ErrorMessage style="color:red" name="title" class="invalid-feeback"></ErrorMessage>
        </div>
        <div class="form-control mb-4">
          <label class="text-medium" for="date">文章日期*</label>
          <FieldView
            class="my-2 p-2" id="date" name="date" type="date"
            :class="{ 'is_invalid': errors['date'] }"
            rules="required"
            v-model="create_at"
          ></FieldView>
          <ErrorMessage style="color:red" name="date" class="invalid-feeback"></ErrorMessage>
        </div>
        <div class="form-control mb-4">
          <label class="text-medium" for="author">文章作者*</label>
          <FieldView
            class="my-2 p-2" id="author" name="author" type="text"
            :class="{'is_invalid': errors['author'] }"
            placeholder="請輸入作者姓名" rules="required" v-model="tempArticle.author"
          ></FieldView>
          <ErrorMessage style="color:red" name="author" class="invalid-feeback"></ErrorMessage>
        </div>
        <div class="form-control mb-4">
          <label class="text-medium mb-1" for="public">是否公開</label>
          <div
            class="toggle" :class="{'active': tempArticle.isPublic === true}"
            @click="tempArticle.isPublic = !tempArticle.isPublic"
          ></div>
        </div>
        <div class="form-control">
          <label class="text-medium mb-1" for="file">圖片上傳</label>
          <input @change="upload()" type="file" class="bg--white d-block" id="file" name="filename">
          <template v-if="tempArticle.imageUrl">
            <div class="file__img mt-2 w-80" :style="{ backgroundImage: 'url('+tempArticle.imageUrl+')' }">
              <div class="file__img__del" @click="tempArticle.imageUrl = '' ">刪除</div>
            </div>
          </template>
        </div>
      </div>
      <div class="form-right">
        <div class="form-control mb-4">
          <label class="text-medium mb-1" for="tag">標籤</label>
          <div class="d-flex align-items-center">
            <template v-for="(item, key) in tempArticle.tag" :key="key">
              <input
                class="w-15 py-1"
                type="text"
                v-model="tempArticle.tag[key]"
                placeholder="請輸入標籤"
                style="margin-right:0px"
              >
              <div class="btn-del mr-1">
                <a
                  class="btn btn--danger"
                  herf="#"
                  @click.prevent="tempArticle.tag.splice(key, 1)"
                >X</a>
              </div>
            </template>
            <div
              class="add-btn"
              v-if="tempArticle.tag[tempArticle.tag.length - 1] || !tempArticle.tag.length"
            >
              <a
                class="btn btn--success"
                herf="#"
                @click.prevent="tempArticle.tag.push('')"
              >新增標籤</a>
            </div>
          </div>
        </div>
        <div class="form-control mb-4">
          <label class="text-medium" for="desc">文章描述
            <ErrorMessage style="color:red" name="desc" class="invalid-feeback"></ErrorMessage>
          </label>
          <FieldView class="my-2 p-2 w-90" id="desc" name="desc" type="text"
            :class="{'is_invalid': errors['desc'] }"
            rules="required"
            v-model="tempArticle.description"
            as="textarea"
          ></FieldView>
        </div>
        <div class="from-control mb-4">
          <ckeditor
            :editor="editor"
            :config="editorConfig"
            v-model="tempArticle.content"
          ></ckeditor>
        </div>
      </div>
    </FormView>
    <div class="btn-group bg--secondary jy-content-between">
      <a class="btn btn--danger py-2 w-15 pointer" herf="#" @click.prevent="$emit('closeBack')">取消</a>
      <a class="btn btn--success py-2 w-15 pointer" herf="#" @click.prevent="$emit('updateArticle',tempArticle)">送出</a>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import MyUploadAdapter from '@/utils/myUploadAdapter'

function MyCustomUploadAdapterPlugin (editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader)
  }
}

export default {
  props: ['isNew', 'article'],
  emits: ['updateArticle', 'closeBack'],
  data () {
    return {
      is_show: false,
      type: '',
      tempArticle: {
        tag: []
      },
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'bold', 'italic', '|', 'link', 'undo', 'redo', 'numberedList', 'bulletedList'],
        extraPlugins: [MyCustomUploadAdapterPlugin]
      },
      create_at: ''
    }
  },
  methods: {
    openModal () {
      this.is_show = true
    },
    closeModal () {
      this.is_show = false
    },
    upload () {
      const fileInput = document.querySelector('#file')
      const file = fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', file)
      // this.$emit('loading')
      this.$http
        .post(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/upload`, formData)
        .then((res) => {
          this.tempArticle.imageUrl = res.data.imageUrl
        })
        .catch(err => {
          console.dir(err)
        })
    }
  },
  watch: {
    article () {
      console.log(this.isNew)
      if (!this.isNew) {
        this.tempArticle = {
          ...this.article
        }
      } else {
        this.tempArticle = {
          ...this.article,
          tag: []
        }
      }
      this.create_at = new Date(this.tempArticle.create_at * 1000).toISOString().split('T')[0]
    },
    create_at () {
      this.tempArticle.create_at = Math.floor(new Date(this.create_at) / 1000)
    }
  }
}
</script>

<style lang="scss">
  .article-modal{
    position: absolute;
    @include absCenter();
    border: 1px solid #000;
    width: 80%;
    z-index: 100;
    top: 100%;
    .btn{
      border-radius: 0;
      padding: 4px 8px;
      cursor: pointer;
    }
    form{
      padding: 20px;
      label{
        display: block;
      }
      input{
        margin-right: 10px;
        border-radius: 0;
        border: 1px solid #ccc;
        outline: none;
        font-size: 16px;
      }
      .form-left{
        flex: 0 0 40%;
      }
      .form-right{
        flex: 0 0 60%;
      }
      .file__img{
        height: 150px;
        background-size: cover;
        background-position: center center;
      }
    }
  }
  .ck-editor__editable_inline {
    min-height: 300px;
  }
</style>
