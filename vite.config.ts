import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  // 路径别名
  alias: {
    '@': path.resolve('src'),
    // components: path.resolve('src/components'),
    // styles: path.resolve('src/styles'),
    // utils: path.resolve('src/utils'),
    // router: path.resolve('src/router'),
    // store: path.resolve('src/store'),
    // assets: path.resolve('src/assets'),
    // http: path.resolve('src/http')
  },

  // 公共 scss 文件
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/styles/var.scss';`
      }
    }
  },

  // // 开发服务器
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://127.0.0.1:8000',
  //       changeOrigin: true,
  //       rewrite: path => path.replace('/api', '')
  //     }
  //   }
  // }
})
