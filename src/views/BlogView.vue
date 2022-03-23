<template>
  <div class="container">
    <div class="blog">
      <h1 class="text-title text-center text-c-forthary">部落格</h1>
      <div class="blog_tag">
        <ul class="d-flex">
          <li
            v-for="tag in category"
            :key="tag" class="tag_item"
            :class="{'active': filterCategory === tag}"
            @click="filterCategory = tag"
          >{{ tag }}</li>
        </ul>
      </div>
      <div class="blog_content">
        <div class="row">
          <div v-for="blog in filterBlogs" :key="blog.id" class="col-sm-6 col-md-4 mb-8">
            <router-link :to="{ path: '/blog/' +  blog.id }" class="d-flex flex-dir-col">
              <div class="over-hidden">
                <div class="content_img" :style="{backgroundImage: `url(${blog.imageUrl})`}"></div>
                <div class="content_info">
                  <h4 class="text-medium">{{ blog.title }}</h4>
                  <p>{{ blog.description }}</p>
                </div>
              </div>
            </router-link>
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
      blogs: [],
      category: [],
      filterCategory: '全部'
    }
  },
  methods: {
    getAllBlog () {
      this.$emitter.emit('isLoading', true)
      this.$http.get(`${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/articles`)
        .then((res) => {
          this.$emitter.emit('isLoading', false)
          this.blogs = res.data.articles
          let tempCategory = [...this.category] || []
          this.blogs.forEach(item => { tempCategory = [...tempCategory, ...item.tag] })
          this.category = [...new Set(tempCategory)]
          this.filterCategory = '全部'
        })
        .catch((err) => {
          console.dir(err)
        })
    }
  },
  computed: {
    filterBlogs () {
      if (this.filterCategory === '全部') {
        return this.blogs
      } else {
        let filterData = []
        filterData = this.blogs.filter(item => {
          return item.tag.includes(this.filterCategory)
        })
        return filterData
      }
    }
  },
  mounted () {
    this.getAllBlog()
  }
}
</script>

<style lang="scss">
  .blog{
    padding-top: 150px;
    h1{
      padding: 10px 0;
      letter-spacing: 0.25rem;
      font-size: 32px;
      border-bottom: 1px solid $secondary;
    }
    &_tag{
      padding: 20px 0;
      ul{
        overflow: scroll;
        &::-webkit-scrollbar{
          display: none;
        }
      }
      .tag_item{
        padding: 6px 20px;
        text-align: center;
        margin-right: 1%;
        flex: 0 0 18%;
        background-color: #CB8E68;
        opacity: .5;
        color: #fff;
        cursor: pointer;
        transition: .5s;
        letter-spacing: 0.125rem;
        border-radius: 20px;
        white-space: nowrap;
        &.active, &:hover{
          opacity: 1;
        }
      }
    }
    .blog_content{
      margin-bottom: 40px;
      .over-hidden{
        overflow: hidden;
      }
      .content_img{
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        cursor: pointer;
        padding-bottom: 60%;
        transition: .5s;
        &:hover{
          transform: scale(1.2, 1.1);
        }
      }
      .content_info{
        padding: 8px;
        border: 1px solid #ddd;
        height: 100%;
        flex: 0 1 auto;
        cursor: pointer;
        h4{
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 8px;
        }
        p{
          font-size: 14px;
        }
      }
    }
  }
</style>
