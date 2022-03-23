import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/IndexView.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        meta: {
          title: '放心初蔬果網-首頁'
        }
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
        meta: {
          title: '放心初蔬果網-關於'
        }
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../views/OrderView.vue'),
        meta: {
          title: '放心初蔬果網-訂單查詢'
        }
      },
      {
        path: '/blog',
        name: 'blog',
        component: () => import('../views/BlogView.vue'),
        meta: {
          title: '放心初蔬果網-部落格'
        }
      },
      {
        path: '/blog/:id',
        component: () => import('../views/OneBlogView.vue'),
        meta: {
          title: '放心初蔬果網-部落格'
        },
        props: (route) => {
          return {
            id: route.params.id
          }
        }
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/CartView.vue'),
        children: [
          {
            path: '',
            name: '品項確認頁面',
            component: () => import('../views/PayView1.vue'),
            meta: {
              title: '放心初結帳-確認商品'
            }
          },
          {
            path: 'payment2',
            name: '資料輸入頁面',
            component: () => import('../views/PayView2.vue'),
            meta: {
              title: '放心初結帳-資料填寫'
            },
            props: (route) => {
              return {
                show: route.params.show
              }
            }
          },
          {
            path: 'payment3',
            name: '完成結帳頁面',
            component: () => import('../views/PayView3.vue'),
            meta: {
              title: '放心初結帳-結帳完成'
            },
            props: (route) => {
              return {
                show_complete: route.params.show_complete,
                id: route.params.id
              }
            }
          }
        ]
      },
      {
        path: '/product',
        name: '購物頁面',
        component: () => import('../views/ProductView.vue'),
        children: [
          {
            path: '',
            name: '全部商品',
            component: () => import('../views/CategoryView.vue'),
            meta: {
              title: '放心初蔬果網-雙北隔日送'
            }
          },
          {
            path: ':id',
            component: () => import('../views/OneProductView.vue'),
            meta: {
              title: '放心初蔬果網-雙北隔日送'
            },
            props: (route) => {
              return {
                id: route.params.id
              }
            }
          }
        ]
      },
      {
        path: '/login',
        name: '登入頁面',
        component: () => import('../views/LoginView.vue'),
        meta: {
          title: '放心初蔬果網-登入'
        }
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: {
          name: 'home'
        }
      }
    ]
  },
  {
    path: '/admin',
    name: '後台主頁',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: '',
        name: '首頁預設產品頁',
        component: () => import('../views/Dashboard/ProductView.vue')
      },
      {
        path: 'product',
        name: '產品列表',
        component: () => import('../views/Dashboard/ProductView.vue')
      },
      {
        path: 'order',
        name: '訂購清單',
        component: () => import('../views/Dashboard/OrderView.vue')
      },
      {
        path: 'coupon',
        name: '優惠卷頁面',
        component: () => import('../views/Dashboard/CouponView.vue')
      },
      {
        path: 'article',
        name: '文章頁面',
        component: () => import('../views/Dashboard/ArticleView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior (to, from, savePosition) {
    if (to.fullPath.indexOf('/') !== -1) {
      return {
        top: 0
      }
    }
  }
})

export default router
