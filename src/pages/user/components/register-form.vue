<template>
  <header class="ut_align-center">
    <h2>注册</h2>
    <div class="ut_color-info">基于 vue 的单页面博客管理后台</div>
  </header>
  <main>
    <!-- 注册表单 -->
    <el-form class="register-form">
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
        <el-input v-model="form.reapeatPassword" type="password" placeholder="重复密码">
          <template #prepend>
            <i class="iconfont icon-mima"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="verify-form-item">
        <el-input v-model="form.verify" placeholder="验证码" style="width: auto">
          <template #prepend>
            <i class="iconfont icon-zhanghaoguanli"></i>
          </template>
        </el-input>
        <el-button @click="getVerify" :loading="verifyLoading" :disabled="verifyDisabled" type="primary">
          {{ verifyText }}
        </el-button>
      </el-form-item>
      <el-form-item>
        <div class="ut_align-right">
          <a href="javascript:;" @click="$emit('change-action')">已有账号？登录</a>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="registerHandler" type="primary" style="width: 100%">注册</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'

// 注册表单
function useRegisterForm() {
  const form  = reactive({
    username: undefined,
    password: undefined,
    reapeatPassword: undefined,
    verify: undefined
  })

  const registerHandler = () => {}

  // 获取验证码
  const verifyLoading = ref(false)
  const verifyDisabled = ref(false)

  const verifyTextInit = '获取验证码'
  const verifyText = ref(verifyTextInit)

  const getVerify = async () => {
    verifyLoading.value = true
    try {
      // 调用验证码接口
      await new Promise(resolve => {
        setTimeout(() => {
          ElMessage.success('已发送，请前往绑定的邮箱查收。')
          resolve(true)
        }, 2000)
      })

      verifyLoading.value = false
      verifyDisabled.value = true

      let time = 60
      verifyText.value = `还剩 ${time} 秒`
      const timer = setInterval(() => {
        if (--time <= 0) {
          clearInterval(timer)
          verifyDisabled.value = false
          verifyText.value = verifyTextInit
          return
        }

        verifyText.value = `还剩 ${time} 秒`
      }, 1000)
    } catch (err) {
      err
    }
  }

  return { form, registerHandler, verifyLoading, verifyDisabled, verifyText, getVerify }
}

export default defineComponent({
  emits: ['change-action'],
  setup () {
    const { form, registerHandler, verifyLoading, verifyDisabled, verifyText, getVerify } = useRegisterForm()

    return {
      form, registerHandler, verifyLoading, verifyDisabled, verifyText, getVerify
    }
  }
})
</script>
