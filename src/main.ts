import { createApp } from 'vue'
import { router } from '@/router/index'
import App from './App.vue'
import 'element-plus/lib/theme-chalk/index.css'
import elementInstall from '@/element-install'
import '@/styles/common.scss'

createApp(App)
  .use(router)
  .use(elementInstall)
  .mount('#app')
