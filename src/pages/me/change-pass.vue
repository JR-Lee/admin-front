<template>
  <div class="router-view_content">
    <jr-block title="重置密码">
      <jr-form :model="form" :rules="rules" :on-submit="submitHandler" no-success-tip>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入新密码"></el-input>
          <small>&nbsp; &nbsp; 输入 8 到 32 个字符（必须包含大小写字母及数字）</small>
        </el-form-item>
        <el-form-item label="确认密码" prop="repeatPassword">
          <el-input v-model="form.repeatPassword" type="password" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </jr-form>
    </jr-block>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { password, required, storage } from '@/utils'
import { RuleItem } from '@/types/validate'
import { ValidateFieldCallback } from 'element-plus/lib/el-form'
import { changePassword } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const router = useRouter()

    const form = reactive<{ [key: string]: string | undefined }>({
      password: undefined,
      repeatPassword: undefined
    })

    const checkRepeat: RuleItem["validator"] = (rule, value, callback) => {
      if (value !== form.password) callback('两次输入不一致')
      callback()
    }

    const rules = reactive<{ [key: string]: RuleItem[] | RuleItem }>({
      password: [ required('密码'), password() ],
      repeatPassword: [ required('重复密码'), { validator: checkRepeat } ]
    })

    const submitHandler = async () => {
      await changePassword(form.password as string)
      storage.remove('token')
      ElMessage.success('密码修改成功，请重新登录')
      router.push({ name: 'user' })
    }

    return {
      form,
      rules,
      submitHandler
    }
  }
})
</script>
