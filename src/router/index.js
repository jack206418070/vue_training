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
        component: () => import('../views/HomeView.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../views/OrderView.vue')
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/CartView.vue'),
        children: [
          {
            path: '',
            name: '品項確認頁面',
            component: () => import('../views/PayView1.vue')
          },
          {
            path: 'payment2',
            name: '資料輸入頁面',
            component: () => import('../views/PayView2.vue'),
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
            component: () => import('../views/CategoryView.vue')
          },
          {
            path: ':id',
            component: () => import('../views/OneProductView.vue'),
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
        component: () => import('../views/LoginView.vue')
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
    if (to.fullPath.match('cart') || to.fullPath.match('about') || to.fullPath.match('product')) {
      return {
        top: 0
      }
    }
  }
})

export default router
