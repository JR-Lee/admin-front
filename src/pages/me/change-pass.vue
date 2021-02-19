<template>
  <jr-block title="重置密码">
    <el-form label-width="130px" class="app-form">
      <el-form-item label="当前密码">
        <el-input v-model="form.currentPassword" type="password" placeholder="请输入当前密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码"></el-input>
        <small>&nbsp; &nbsp; 输入6到16个字符（必须包含大小写字母及数字）</small>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.repeatPassword" type="password" placeholder="请再次输入新密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitHandler" type="primary">确认修改</el-button>
      </el-form-item>
    </el-form>
  </jr-block>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

function useForm() {
  const form = reactive({
    currentPassword: undefined,
    newPassword: undefined,
    repeatPassword: undefined
  })

  const submitHandler = () => {
    console.log(JSON.parse(JSON.stringify(form)))
  }

  return { form, submitHandler }
}

export default defineComponent({
  setup () {
    const { form, submitHandler } = useForm()

    return {
      form, submitHandler
    }
  }
})
</script>

<style scoped>

</style>