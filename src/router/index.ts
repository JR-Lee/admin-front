import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../pages/home/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' },
    name: 'notFount'
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
