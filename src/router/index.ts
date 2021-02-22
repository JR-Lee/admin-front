import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const layout = () => import('pages/layout/index.vue')

export const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    redirect: { name: 'index' },
    meta: { title: '主页', icon: 'icon-shouye', hide: false, single: true },
    component: layout,
    children: [
      {
        path: 'index',
        name: 'index',
        meta: { title: '控制台', icon: 'icon-kongzhitai' },
        component: () => import('pages/home/index.vue')
      }
    ]
  },
  {
    path: '/content',
    name: 'content',
    meta: { title: '内容管理', icon: 'icon-neirongguanli', hide: false },
    component: layout,
    children: [
      {
        path: 'blog-list',
        name: 'blog-list',
        meta: { title: '博客管理', icon: 'icon-boke' },
        component: () => import('pages/content/blog-list.vue')
      },
      {
        path: 'blog-category',
        name: 'blog-category',
        meta: { title: '分类管理', icon: 'icon-more-copy' },
        component: () => import('pages/content/blog-category.vue')
      },
      {
        path: 'comment-list',
        name: 'comment-list',
        meta: { title: '评论管理', icon: 'icon-pinglunliebiao' },
        component: () => import('pages/content/comment-list.vue')
      }
    ]
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
    meta: { title: '登录', hide: true },
    component: () => import('pages/user/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' },
    meta: { hide: true },
    name: 'notFount'
  }
]

export const staticMenus = routes.filter(route => route.meta && !route.meta.hide)

export const router = createRouter({
  history: createWebHistory(),
  routes
})

// 进度条
let progressEl: HTMLElement

router.beforeEach((to, from, next) => {
  if (!progressEl) progressEl = document.querySelector('.app-progress') as HTMLElement
  if (progressEl) progressEl.classList.add('app-progress_ready')
  next()
})

router.afterEach(() => {
  if (progressEl) {
    progressEl.classList.add('app-progress_complete')
    setTimeout(() => progressEl.className = 'app-progress', 800)
  }
})
