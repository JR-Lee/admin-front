import { createApp } from 'vue'
import { router } from '@/router/index'
import store from '@/store/index'
import App from './App.vue'
import elementInstall from '@/element-install'
import 'element-plus/lib/theme-chalk/index.css'
import '@/styles/common.scss'
import '@/styles/utils.scss'

~ async function () {
  await store.dispatch('getUserInfo')

  const app = createApp(App)
  // app.config.globalProperties.$ELEMENT = { size: 'small' }

  app.use(router)
    .use(store)
    .use(elementInstall)
    .mount('#app')
}()
