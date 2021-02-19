<template>
  <jr-block
    :action="{ type: 'primary', text: '添加类别', handler: addHandler }"
    title="博客分类列表">
    <jr-table
      :data-source="categories"
      :on-edit="editHandler"
      :on-delete="deleteHandler"
      empty="暂无分类">
      <el-table-column prop="name" label="类别"></el-table-column>
    </jr-table>
  </jr-block>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus'
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

  const addHandler = () => {
    ElMessageBox.prompt('', '新增类别')
      .then(({ value }) => {
        if (!value) return
        // 这里提交数据
        console.log(value)
      })
      .catch(err => console.log(err))
  }

  return { categories, editHandler, deleteHandler, addHandler }
}

export default defineComponent({
  setup () {
    const { categories, editHandler, deleteHandler, addHandler } = useTable()

    return {
      categories, editHandler, deleteHandler, addHandler
    }
  }
})
</script>

<style scoped>

</style>