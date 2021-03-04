import { createApp } from 'vue'
import { router } from '@/router/index'
import store from '@/store/index'
import App from './App.vue'
import elementInstall from '@/element-install'
import 'element-plus/lib/theme-chalk/index.css'
import '@/styles/common.scss'
import '@/styles/utils.scss'

// 自定义组件
import JrTable from '@/components/jr-table.vue'
import JrBlock from '@/components/jr-block.vue'
import JrEditor from '@/components/jr-editor.vue'
import JrForm from '@/components/jr-form.vue'

~ async function () {
  await store.dispatch('getUserInfo')

  const app = createApp(App)
  // app.config.globalProperties.$ELEMENT = { size: 'small' }

  app.use(router)
    .use(store)
    .use(elementInstall)
    .component('jr-table', JrTable)
    .component('jr-block', JrBlock)
    .component('jr-editor', JrEditor)
    .component('jr-form', JrForm)
    .mount('#app')
}()
