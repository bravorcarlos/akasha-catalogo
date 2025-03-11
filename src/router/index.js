import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductDetail from '@/views/ProductDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/product/:slug',
      name: 'ProductDetail',
      component: ProductDetail,
    },
    {
      path: "/products/:brandSlug?",
      name: "product-list",
      component: () => import("@/views/ProductList.vue"),
      props: (route) => ({ brandSlug: route.params.brandSlug, search: route.query.search })
    }, 
  ],
})

export default router
