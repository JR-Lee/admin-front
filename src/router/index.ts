import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const seizeView = () => import('@/components/seize-view.vue')

export const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    redirect: { name: 'console' },
    meta: { title: '主页', icon: 'icon-shouye', hide: false },
    component: seizeView,
    children: [
      {
        path: 'console',
        name: 'console',
        meta: { title: '控制台', icon: 'icon-kongzhitai' },
        component: () => import('pages/home/console-board.vue')
      }
    ]
  },
  {
    path: '/setup',
    name: 'setup',
    redirect: { name: 'user-info' },
    meta: { title: '用户设置', icon: 'icon-shezhi', hide: false },
    component: seizeView,
    children: [
      {
        path: 'user-info',
        name: 'user-info',
        meta: { title: '用户信息', icon: 'icon-yonghuxinxi' },
        component: () => import('pages/setup/user-info.vue')
      },
      {
        path: 'change-pass',
        name: 'change-pass',
        meta: { title: '修改密码', icon: 'icon-xiugaimima01' },
        component: () => import('pages/setup/change-pass.vue')
      }
    ]
  },
  {
    path: '/edit',
    name: 'edit',
    meta: { title: '博客', icon: 'icon-boke-copy', hide: false },
    component: () => import('pages/edit/index.vue')
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
