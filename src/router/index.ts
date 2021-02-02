import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    meta: { title: '首页', icon: 'icon-shouye', hide: false },
    component: () => import('pages/home/index.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    meta: { title: '博客', icon: 'icon-boke-copy', hide: false },
    component: () => import('pages/edit/index.vue')
  },
  {
    path: '/setup',
    name: 'setup',
    meta: { title: '设置', icon: 'icon-shezhi', hide: false },
    component: () => import('pages/setup/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录', icon: '', hide: true },
    component: () => import('pages/login/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' },
    meta: { hide: true },
    name: 'notFount'
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
