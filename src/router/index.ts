import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'gallery',
    component: () => import('@/views/gallery/GalleryView.vue')
  },
  {
    path: '/sketch/:index?',
    name: 'sketch',
    component: () => import('@/views/sketch/SketchView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
