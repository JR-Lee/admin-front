<template>
  <header class="ut_align-center">
    <h2>注册</h2>
    <div>基于 vue 的单页面博客管理后台</div>
  </header>
  <main>
    <!-- 注册表单 -->
    <el-form :model="form" :rules="rules" ref="formRef" class="register-form">
      <el-form-item prop="mail">
        <el-input v-model="form.mail" placeholder="邮箱">
          <template #prepend>
            <i class="iconfont icon-youxiang"></i>
          </template>
        </el-input>
      </el-form-item>
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
      <el-form-item prop="repeatPassword">
        <el-input v-model="form.repeatPassword" type="password" placeholder="重复密码">
          <template #prepend>
            <i class="iconfont icon-mima"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="verify" class="verify-form-item">
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
        <el-button @click="registerHandler" :loading="registerLoading" type="primary" style="width: 100%">注册</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, EmitsOptions, Ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getVerifyCode, register } from '@/api/user'
import { IElForm } from '@/types/index'
import { emit } from 'process'

export default defineComponent({
  emits: ['change-action'],
  setup (props, { emit }) {
    const formRef = ref() as unknown as Ref<IElForm>

    const form  = reactive({
      username: undefined,
      password: undefined,
      mail: undefined,
      repeatPassword: undefined,
      verify: undefined
    })

    const checkRepeatPassword = (rule: unknown, value: unknown) => {
      if (!value) return Promise.reject('请再次输入密码')
      else if (value !== form.password) return Promise.reject('两次输入密码不一致')
      else return Promise.resolve(true)
    }

    const rules = reactive({
      username: [
        { required: true, message: '请输入用户名', trigger: 'change' },
        { max: 20, message: '用户名应不超过 20 个字符', trigger: 'chagne' }
      ],
      mail: [
        { required: true, message: '请输入邮箱', trigger: 'change' },
        { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请输入正确格式的邮箱', trigger: 'change' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'change' },
        {
          pattern: /^.*(?=.{8,20})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/,
          message: '密码应由 8 - 20 位数字、大小写字母组成',
          trigger: 'change'
        }
      ],
      repeatPassword: [{ validator: checkRepeatPassword, trigger: 'change' }],
      verify: [
        { required: true, message: '请输入验证码', trigger: 'change' },
        { min: 6, max: 6, message: '验证码格式错误', trigger: 'change' }
      ]
    })

    // 获取验证码
    let timer: NodeJS.Timer
    const verifyLoading = ref(false)
    const verifyDisabled = ref(false)

    const verifyTextInit = '获取验证码'
    const verifyText = ref(verifyTextInit)

    const getVerify = async () => {
      try {
        // 校验已填
        await new Promise((resolve, reject) => {
          formRef.value.validateField('mail', err => {
            err ? reject('') : resolve('')
          })
        })

        verifyLoading.value = true
        await getVerifyCode(form.mail + '')
        ElMessage.success(`验证码已发送至 ${form.mail}，请查收`)

        let time = 60
        verifyText.value = `还剩 ${time} 秒`
        timer = setInterval(() => {
          if (--time <= 0) {
            clearInterval(timer)
            verifyDisabled.value = false
            verifyText.value = verifyTextInit
            return
          }

          verifyText.value = `还剩 ${time} 秒`
        }, 1000)
      } catch (err) {
        console.log(err)
      }

      verifyLoading.value = false
      verifyDisabled.value = true
    }

    const registerLoading = ref(false)

    // 提交注册
    const registerHandler = async () => {
      try {
        await formRef.value.validate()

        registerLoading.value = true
        const { username, password, mail, verify: code } = form as unknown as Record<string, string>
        await register({ username, password, mail, code })

        clearTimeout(timer)
        verifyLoading.value = false
        registerLoading.value = false

        ElMessage.success('注册成功，现在可以使用该账号登录')

        // 转到登录表单
        emit('change-action')
      } catch (err) {
        console.log(err)
        registerLoading.value = false
      }
    }

    return {
      formRef,
      form,
      rules,
      registerHandler,
      verifyLoading,
      verifyDisabled,
      verifyText,
      getVerify,
      registerLoading
    }
  }
})
</script>
