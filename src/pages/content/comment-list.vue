<template>
  <jr-block title="评论列表" :action="actions">
    <jr-table :data-source="comments" :on-delete="() => {}" v-model:selected="selected">
      <el-table-column prop="username" label="作者" width="100"></el-table-column>
      <el-table-column prop="content" label="评论内容"></el-table-column>
      <el-table-column prop="create_time" label="评论时间" width="200">
        <template #default="{ row: { create_time } }">
          {{ formatDate(new Date(create_time), 'yyyy-MM-dd HH:mm:ss 周w') }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100"></el-table-column>
    </jr-table>
  </jr-block>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { comments } from '@/mock/index'
import { formatDate } from '@/utils/index'
import { ElMessage } from 'element-plus'

function useAction() {
  const selected = ref([]) // 选中项

  const actions = [
    {
      type: 'danger',
      text: '删除',
      handler: () => {
        if (!selected.value.length) ElMessage.warning('请选择数据')
        else console.log(selected.value)
      }
    }
  ]

  return { selected, actions }
}

export default defineComponent({
  setup () {
    const { selected, actions } = useAction()


    return {
      comments,
      formatDate,
      selected, actions
    }
  }
})
</script>

<style scoped>

</style>