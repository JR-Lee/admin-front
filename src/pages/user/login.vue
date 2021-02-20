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
        <div class="ut_space-between">
          <router-link :to="{ name: 'register' }">注册一个</router-link>
          <a href="javascript:;">忘记密码？</a>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitHandler" type="primary" style="width: 100%">登录</el-button>
      </el-form-item>
    </el-form>
  </main>
  <footer class="ut_align-center ut_color-info">
    <small>©2021 版权归 JR·Lee 所有</small>
  </footer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Router, useRouter } from 'vue-router'

function useForm(router: Router) {
  const form  = reactive({
    username: undefined,
    password: undefined,
    verify: undefined
  })

  const verifyLoading = ref(false)
  const submitLoading = ref(false)

  const verifyDisabled = ref(false)

  const verifyTextInit = '获取验证码'
  const verifyText = ref(verifyTextInit)

  // 获取验证码
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

  // 提交表单
  const submitHandler = () => {
    console.log(JSON.parse(JSON.stringify(form)))
    // 验证账号密码

    // 成功，存储 token

    // 跳转至控制台
    router.push({ name: 'home' })
  }

  return { form, submitHandler, verifyLoading, submitLoading, verifyDisabled, verifyText, getVerify }
}

export default defineComponent({
  name: 'login',
  setup () {
    const router = useRouter()
    const { form, submitHandler, verifyLoading, submitLoading, verifyDisabled, verifyText, getVerify } = useForm(router)

    return {
      form, submitHandler, verifyLoading, submitLoading, verifyDisabled, verifyText, getVerify
    }
  }
})
</script>

<style lang="scss" scoped>
  .login-form:deep() {
    width: 300px;
    margin-top: 35px;

    .el-form-item__content {
      line-height: normal;
    }

    .el-input-group__prepend {
      padding: 0px 17px;

      i.iconfont {
        font-size: 17px;
      }
    }

    .verify-form-item {
      .el-form-item__content {
        display: flex;

        .el-input__inner {
          border: {
            top-right-radius: 0px;
            bottom-right-radius: 0px;
          }
        }

        .el-button {
          width: 140px;
          padding: {
            left: 0px;
            right: 0px;
          };
          text-align: center;
          box-sizing: border-box;
          border: {
            width: 0px;
            top-left-radius: 0px;
            bottom-left-radius: 0px;
          }
        }
      }
    }
  }
</style>
