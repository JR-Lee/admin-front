<template>
  <jr-block title="博客分类列表">
    <template #header-extra>
      <el-button type="primary" size="mini">添加类别</el-button>
    </template>
    <jr-table
      :data="categories"
      :on-edit="editHandler"
      :on-delete="deleteHandler"
      empty="暂无分类"
      action="both">
      <el-table-column prop="name" label="类别"></el-table-column>
    </jr-table>
  </jr-block>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

function useTable() {
  const categories = ref([
    { id: '001', name: 'javascript' },
    { id: '002', name: 'php' },
    { id: '003', name: 'python' },
    { id: '004', name: 'node' },
    { id: '005', name: 'linux' },
    { id: '006', name: 'java' },
    { id: '007', name: 'go' },
    { id: '008', name: '数据通信' },
    { id: '009', name: '云计算' },
    { id: '010', name: '服务器的运行与维护' }
  ])

  const editHandler = (index: number, row: unknown) => {
    console.log(index, row)
  }

  const deleteHandler = (index: number, row: unknown) => {
    
  }

  return { categories, editHandler, deleteHandler }
}

export default defineComponent({
  setup () {
    const { categories, editHandler, deleteHandler } = useTable()

    return {
      categories, editHandler, deleteHandler
    }
  }
})
</script>

<style scoped>

</style>