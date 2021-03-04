<template>
  <el-form
    v-bind="$attrs"
    ref="formRef"
    :disabled="disabled === undefined ? defaultDisabled : disabled"
    label-width="125px"
    class="app-form">
    <slot></slot>
    <template v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
    <template v-else>
      <el-form-item>
        <el-button @click="submitHandler" :loading="loading" type="primary">{{ submitText }}</el-button>
        <el-button @click="resetHandler" :disabled="loading">{{ resetText }}</el-button>
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang="ts">
import { IElForm } from '@/types'
import { ElMessage } from 'element-plus'
import { ElFormContext } from 'element-plus/lib/el-form'
import { defineComponent, ref, nextTick, Ref } from 'vue'

export default defineComponent({
  props: {
    onSubmit: {
      type: Function,
      default: () => undefined
    },
    onReset: {
      type: Function,
      default: () => undefined
    },
    submitText: {
      type: String,
      default: '提交'
    },
    resetText: {
      type: String,
      default: '重置'
    },
    successTip: {
      type: String,
      default: '提交成功'
    },
    // 是否不需要提交成功后的提示
    noSuccessTip: Boolean,
    // 表单是否禁用
    disabled: {
      type: Boolean,
      default: undefined
    },
    // 提交前 - 校验通过后
    beforeSubmit: {
      type: Function,
      default: () => undefined
    },
    // 提交后 - 无论提交是否成功
    afterSbumit: {
      type: Function,
      default: () => undefined
    }
  },
  setup (props, { emit }) {
    const formRef = ref(null) as unknown as Ref<IElForm>
  
    const loading = ref(false)

    const defaultDisabled = ref(false)

    const resetForm = () => {
      for (const key in formRef.value.model as Record<string, unknown>) (formRef.value.model as Record<string, unknown>)[key] = undefined
      nextTick().then(() => formRef.value.clearValidate())
    }

    const submitHandler = async () => {
      loading.value = true

      try {
        await formRef.value.validate()

        defaultDisabled.value = true
        emit('update:disabled', true)

        props.beforeSubmit()

        await props.onSubmit()

        resetForm()

        !props.noSuccessTip ? ElMessage.success(props.successMessage) : ''
      } catch (err) {
        console.log(err)
      }

      loading.value = false

      defaultDisabled.value = false
      emit('update:disabled', false)

      props.afterSbumit()
    }

    const resetHandler = () => {
      resetForm()
      props.onReset()
    }

    return {
      formRef,
      loading,
      defaultDisabled,
      submitHandler,
      resetHandler
    }
  }
})
</script>
