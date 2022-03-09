<template>
  <div class="content">
    <LoadingView :active="isLoading"></LoadingView>
    <div class="admin-container">
      <div class="total__product w-100 d-flex align-items-center jy-content-between">
        <p>目前有 1 篇文章</p>
        <a class="btn btn--success w-10" href="#" @click.prevent="openArtModal(true)">建立文章</a>
      </div>
      <div class="product w-100 mb-3">
        <ul>
          <li class="product__title d-flex jy-content-between">
            <h3 class="text-c-white f-w-bold text-center w-10">建立時間</h3>
            <div class="info__group w-90">
              <ul class="d-flex fw-bold align-items-center">
                <li class="w-15 f-w-bold">文章名稱</li>
                <li class="w-10 f-w-bold">文章作者</li>
                <li class="w-35 f-w-bold">文章描述</li>
                <li class="w-15 f-w-bold">是否公開</li>
                <li class="w-25 f-w-bold">編輯</li>
              </ul>
            </div>
          </li>
          <li v-for="item in articles" :key="item.id" class="product__item d-flex jy-content-between">
            <h3 class="f-w-bold text-center w-10">{{ item.create_at }}</h3>
            <div class="info__group w-90">
              <ul class="d-flex fw-bold align-items-center">
                <li class="w-15 f-w-bold">{{ item.title }}</li>
                <li class="w-10 f-w-bold">{{ item.author }}</li>
                <li class="w-35 f-w-bold">{{ item.description }}</li>
                <li class="w-15 f-w-bold d-flex jy-content-center">
                  <p v-if="item.isPublic === true" class="active">
                    公開
                  </p>
                  <p v-else style="color: red">未公開</p>
                </li>
                <li class="w-25 f-w-bold d-flex jy-content-center">
                  <a
                    class="btn btn--success w-30 mx-2"
                    href="#"
                    @click.prevent="getArticle(item.id)"
                  >
                    <i class="fas fa-edit"></i>
                  </a>
                  <a
                    class="btn btn--danger w-30 mx-2"
                    href="#"
                    @click.prevent=""
                  >
                    <i class="fas fa-trash-alt"></i>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <PageView
      :pagination="pagination"
      @get-product="getArticles"
      :style="{bg: '#1A535C', hoverBg: '#FF6B6B'}"
    ></PageView>
  </div>
  <ArticleModal
    :is-new="isNew"
    :article="tempArticle"
    ref="articleModal"
    @update-article="updateArticle"
  >
  </ArticleModal>
  <DelModal
    ref="delModal"
  >
  </DelModal>
</template>

<script>
import ArticleModal from '@/components/AdminAModal.vue'
import DelModal from '@/components/AdminDelModal.vue'
import PageView from '@/components/PageNation.vue'
export default {
  data () {
    return {
      tempArticle: {},
      isNew: false,
      isLoading: false,
      articles: [],
      pagination: {}
    }
  },
  components: {
    ArticleModal,
    DelModal,
    PageView
  },
  methods: {
    openArtModal (isNew, item) {
      if (isNew) {
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: []
        }
        this.isNew = true
      } else {
        this.tempArticle = { ...item }
        this.isNew = false
      }
      this.$refs.articleModal.openModal()
    },
    openDelModal (type, item) {
      this.tempArticle = { ...item }
      this.$refs.delModal.openModal(type)
    },
    getArticles (page = 1) {
      this.isLoading = true
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`)
        .then((res) => {
          this.articles = res.data.articles
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((err) => {
          console.dir(err)
        })
    },
    updateArticle (item) {
      this.tempArticle = item
      let url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/article`
      let httpMethods = 'post'
      this.isLoading = true
      if (!this.isNew) {
        url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`
        httpMethods = 'put'
      }
      this.$http[httpMethods](url, { data: this.tempArticle })
        .then((res) => {
          this.getArticles(this.pagination.current_page)
          this.$refs.articleModal.closeModal()
        })
        .catch((err) => {
          console.dir(err)
        })
    },
    getArticle (id) {
      this.isLoading = true
      this.$http
        .get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/article/${id}`)
        .then((res) => {
          this.openArtModal(false, res.data.article)
          this.isLoading = false
        })
        .catch((err) => {
          console.dir(err)
        })
    }
  },
  mounted () {
    this.getArticles()
  }
}
</script>

<style>
  .text-center{
    text-align: center
  }
</style>
