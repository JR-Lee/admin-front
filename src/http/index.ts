import { router } from '@/router'
import { storage } from '@/utils'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const http = axios.create({
  baseURL: '/api',
  timeout: 3000
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = storage.get('token')
  if (token) config.headers.token = token

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  const { data: { code, message } } = response

  if (code === 200 || code === 201) return response.data
  else {

    ElMessage.warning(message)

    if (code === 401) {
      storage.remove('token')
      router.push({ name: 'user' })
    }
    return Promise.reject(new Error(message))
  }
}, function (error) {
  // 对响应错误做点什么
  ElMessage.error(error.message)
  return Promise.reject(error)
})

export default http