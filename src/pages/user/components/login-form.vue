<template>
  <header class="ut_align-center">
    <h2>欢迎登录</h2>
    <div class="ut_color-info">基于 vue 的单页面博客管理后台</div>
  </header>
  <main>
    <el-form :model="form" :rules="rules" :ref="getRef" class="login-form">
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="用户名">
          <template #prepend>
            <i class="iconfont icon-yonghuming"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
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
        <el-button @click="loginHandler" :loading="loginLoading" type="primary" style="width: 100%">登录</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { login } from '@/http/api'
import { storage } from '@/utils'
import { Router, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ElFormItemContext } from 'element-plus/lib/el-form'

function useLoginForm(router: Router) {
  let formRef: ElFormItemContext

  const getRef = (target: ElFormItemContext) => formRef = target

  const form  = reactive({
    username: undefined,
    password: undefined,
    verify: undefined
  })
  const rules = reactive({
    username: [
      { required: true, message: '请输入用户名', trigger: 'change' },
      { max: 20,  message: '用户名不超过 20 个字符', trigger: 'change' }
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'change' }]
  })

  const loginLoading = ref(false)

  // 提交表单
  const loginHandler = async () => {
    try {
      await formRef.validate()

      loginLoading.value = true
      const { username, password } = form as unknown as Record<string, string>
      const { data: { token }} = await login({ username, password })
      storage.set('token', token)
      ElMessage.success('登录成功，即将跳转至首页')
      setTimeout(() => router.push({ name: 'home' }), 1000)
    } catch (err) {
      loginLoading.value = false
      console.log(err)
    }
  }

  return { form, rules, loginHandler, loginLoading, getRef }
}

export default defineComponent({
  emits: ['change-action'],
  setup () {
    const router = useRouter()

    return {
      ...useLoginForm(router)
    }
  }
})
</script>
