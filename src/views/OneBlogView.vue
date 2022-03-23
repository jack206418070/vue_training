<template>
  <div class="container">
    <div class="article mt-25 mt-sm-15">
      <div class="bg-img" :style="{backgroundImage: `url(${blog.imageUrl})`}"></div>
      <p class="text-medium mt-10 date_author">
        <span>文章日期：{{ $filters.date(blog.create_at) }}</span>
        <span class="ml-10">文章作者：{{ blog.author }}</span>
      </p>
      <div class="article-content mb-10" v-html="blog.content">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      blog: {}
    }
  },
  methods: {
    getBlog (id) {
      this.$emitter.emit('isLoading', true)
      this.$http.get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/article/${id}`)
        .then((res) => {
          this.$emitter.emit('isLoading', false)
          this.blog = res.data.article
          console.log(this.blog)
        })
        .catch((err) => {
          console.dir(err)
        })
    }
  },
  watch: {
    id () {
      this.getBlog(this.id)
    }
  },
  mounted () {
    this.getBlog(this.id)
  }
}
</script>

<style lang="scss" scoped>
  :deep(.article-content) {
    ol {
      list-style-type: decimal;
      list-style: decimal;
      padding-left: 15px;
    }
    h2 {
      position: relative;
      font-size: 24px;
      font-weight: bold;
      padding: 10px 0 20px 0;
      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        height: 2px;
        width: 100%;
        background-color: #C59854;
      }
    }
  }

  .article{
    .date_author{
      display: flex;
    }
  }

  .bg-img{
    height: 500px;
    background-position: center center;
    background-repeat:no-repeat;
    background-size: cover;
    @include mobile {
      height: 300px;
    }
  }
</style>
