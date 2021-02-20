<template>
  <jr-block
    title="博客管理"
    :action="[
      { type: 'primary', text: '新增', handler: addHandler },
      { type: 'danger', text: '删除', handler: deleteHandler }
    ]">
    <jr-table
      :data-source="blogs"
      v-model:selected="selected"
      empty="暂无博客，快去写一篇吧~">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column prop="create_time" label="创建时间">
        <template #="{ row: { create_time } }">
          {{ formatDate(new Date(create_time), 'yyyy-MM-dd HH:dd:ss') }}
        </template>
      </el-table-column>
      <el-table-column prop="modify_time" label="编辑时间">
        <template #="{ row: { modify_time } }">
          {{ formatDate(new Date(modify_time), 'yyyy-MM-dd HH:dd:ss') }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
    </jr-table>
  </jr-block>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { formatDate } from '@/utils/index'
import { blogs } from '@/mock/index'

function useAction() {
  // 选中列表
  const selected = ref<unknown[]>([])

  // 删除
  const deleteHandler = () => {}

  // 新增
  const addHandler = () => {}

  return { selected, deleteHandler, addHandler }
}

export default defineComponent({
  setup () {
    const { selected, deleteHandler, addHandler } = useAction()

    return {
      formatDate,
      blogs,
      selected, deleteHandler, addHandler
    }
  }
})
</script>

<style scoped>

</style>