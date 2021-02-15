import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const layout = () => import('pages/layout/index.vue')

export const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    redirect: { name: 'console' },
    meta: { title: '主页', icon: 'icon-shouye', hide: false },
    component: layout,
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
    path: '/edit',
    name: 'edit',
    meta: { title: '博客', icon: 'icon-boke-copy', hide: false },
    component: () => import('pages/edit/index.vue')
  },
  {
    path: '/account',
    name: 'account',
    redirect: { name: 'admin-account' },
    meta: { title: '账号管理', icon: 'icon-zhanghaoguanli', hide: false },
    component: layout,
    children: [
      {
        path: 'admin-account',
        name: 'admin-account',
        meta: { title: '后台系统账号', icon: 'icon-zhanghao-copy' },
        component: () => import('pages/account/admin-account.vue')
      },
      {
        path: 'role-list',
        name: 'role-list',
        meta: { title: '角色列表', icon: 'icon-jiaoseliebiao' },
        component: () => import('pages/account/role-list.vue')
      }
    ]
  },
  {
    path: '/me',
    name: 'me',
    redirect: { name: 'user-info' },
    meta: { title: '我的设置', icon: 'icon-yonghushezhi', hide: false },
    component: layout,
    children: [
      {
        path: 'user-info',
        name: 'user-info',
        meta: { title: '用户信息', icon: 'icon-yonghuxinxi' },
        component: () => import('pages/me/user-info.vue')
      },
      {
        path: 'change-pass',
        name: 'change-pass',
        meta: { title: '修改密码', icon: 'icon-xiugaimima01' },
        component: () => import('pages/me/change-pass.vue')
      }
    ]
  },
  {
    path: '/setup',
    name: 'setup',
    redirect: { name: 'web-setup' },
    meta: { title: '设置', icon: 'icon-shezhi' },
    component: layout,
    children: [
      {
        path: 'web-setup',
        name: 'web-setup',
        meta: { title: '网站设置', icon: 'icon-wangzhanshezhi' },
        component:  () => import('pages/setup/web-setup.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    redirect: { name: 'login' },
    meta: { title: '登录', hide: true },
    component: () => import('pages/user/index.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/user/login.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/user/register.vue')
      }
    ]
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
