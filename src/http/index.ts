import axios from 'axios'
import { ElMessage } from 'element-plus'

const http = axios.create({
  baseURL: '/api'
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  const { data: { code, message } } = response
  if (code !== 200 || code !== 201) ElMessage.error(message)
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default http