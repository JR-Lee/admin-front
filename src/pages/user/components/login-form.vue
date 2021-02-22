<template>
  <header class="ut_align-center">
    <h2>欢迎登录</h2>
    <div class="ut_color-info">基于 vue 的单页面博客管理后台</div>
  </header>
  <main>
    <el-form class="login-form">
      <el-form-item>
        <el-input v-model="form.username" placeholder="用户名">
          <template #prepend>
            <i class="iconfont icon-yonghuming"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" type="password" placeholder="密码">
          <template #prepend>
            <i class="iconfont icon-mima"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="ut_space-between">
          <a href="javascript:;" @click="$emit('change-action')">注册账号</a>
          <a href="javascript:;">忘记密码？</a>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="loginHandler" type="primary" style="width: 100%">登录</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { login } from '@/http/api'
import { storage } from '@/utils'
import { Router, useRouter } from 'vue-router'

function useLoginForm(router: Router) {
  const form  = reactive({
    username: undefined,
    password: undefined,
    verify: undefined
  })

  const loginLoading = ref(false)

  // 提交表单
  const loginHandler = () => {
    const data = JSON.parse(JSON.stringify(form))

    // 接口调用
    login({ username: data.username, password: data.password })
      .then(({ data: { token }}) => {
        storage.set('token', token)
        router.push({ name: 'home' })
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  return { form, loginHandler, loginLoading }
}

export default defineComponent({
  emits: ['change-action'],
  setup () {
    const router = useRouter()

    const { form, loginHandler, loginLoading } = useLoginForm(router)

    return {
      form, loginHandler, loginLoading,
    }
  }
})
</script>
