<template>
  <header class="block-title">设置我的资料</header>
  <div class="block-content">
    <el-form label-width="125px" class="user-info_form">
      <el-form-item label="我的角色">
        <el-select v-model="form.role" :style="{ width: '100%' }" placeholder="请选择角色">
          <el-option
            v-for="role in roles"
            :label="role.name"
            :value="role.id"
            :key="role.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio
            border
            v-for="(gender, index) in $store.state.genderMap"
            :label="gender[1]"
            :value="gender[0]"
            :key="index">
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="头像">
        <el-input v-model="form.avatar" placeholder="请输入头像URL或上传头像">
          <template #prepend>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-success="avatarSuccessHandler"
              :show-file-list="false">
              <el-tooltip content="点击上传头像" placement="top">
                <el-button size="small"><i class="iconfont icon-shangchuan"></i></el-button>
              </el-tooltip>
            </el-upload>
          </template>
        </el-input>&nbsp;
        <el-tooltip content="点击查看头像" placement="top">
          <el-button :disabled="!form.avatar" @click="previewHandler" type="primary" circle>
            <i class="iconfont icon-chakanxiangqing"></i>
          </el-button>
        </el-tooltip>
        <el-dialog v-model="avatarVisible" width="200px" center>
          <img style="display: block; max-width: 100%; margin: auto" :src="form.avatar" alt="头像">
        </el-dialog>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.phone" placeholder="请输入手机"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.mail" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.remark"
          type="textarea"
          placeholder="请输入备注"
          :autosize="{ minRows: 3, maxRows: 7}">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">确认修改</el-button>
        <el-button>重新填写</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { roles } from '@/mock/index'
import { toBase64 } from '@/utils'

interface FormI { [key: string]: string | undefined; }

function useForm() {
  const form  = reactive<FormI>({
    role: undefined,
    username: undefined,
    nickname: undefined,
    gender: undefined,
    avatar: undefined,
    phone: undefined,
    mail: undefined,
    remark: undefined
  })

  const avatarSuccessHandler = async (res: { id: string }, { raw }: { raw: File }) => {
    const dataURL = await toBase64(raw)
    form.avatar = dataURL
  }

  return { form, avatarSuccessHandler }
}

function usePreviewAvatar() {
  const avatarVisible = ref(false)
  const previewHandler = () => avatarVisible.value = true

  return { avatarVisible, previewHandler }
}

export default defineComponent({
  setup () {
    const { form, avatarSuccessHandler } = useForm()
    const { avatarVisible, previewHandler } = usePreviewAvatar()

    return {
      form, avatarSuccessHandler,
      avatarVisible, previewHandler,
      roles
    }
  }
})
</script>

<style lang="scss" scoped>
  .user-info_form:deep() {
    .el-input, .el-select {
      max-width: 250px;
    }

    .el-textarea {
      max-width: 400px;
    }
  }
</style>
