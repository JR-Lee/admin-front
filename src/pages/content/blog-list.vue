<template>
  <div class="router-view_content">
    <jr-block
      title="博客管理"
      :action="[
        { type: 'primary', text: '新增', handler: addHandler },
        { type: 'danger', text: '删除', handler: deleteHandler }
      ]">
      <jr-table
        :data-source="articles"
        :loading="getLoading"
        :on-edit="() => editing = true"
        v-model:selected="selected"
        empty="暂无文章，快去写一篇吧~">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="authorName" label="作者"></el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template #="{ row: { createTime } }">
            {{ formatDate(new Date(createTime), 'yyyy-MM-dd HH:dd:ss') }}
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="编辑时间">
          <template #="{ row: { updateTime } }">
            {{ formatDate(new Date(updateTime), 'yyyy-MM-dd HH:dd:ss') }}
          </template>
        </el-table-column>
        <el-table-column prop="hidden" label="状态" width="88" align="center">
          <template #="{ row: { hidden } }">
            <el-tag v-if="hidden" type="danger">隐藏</el-tag>
            <el-tag v-else type="success">显示</el-tag>
          </template>
        </el-table-column>
      </jr-table>
    </jr-block>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { formatDate } from '@/utils/index'
import { getArticle } from '@/api/article'

function useAction() {
  // 选中列表
  const selected = ref<unknown[]>([])

  // 删除
  const deleteHandler = () => {}

  // 新增
  const addHandler = () => {}

  return { selected, deleteHandler, addHandler }
}

function useTable() {
  const [ articles, getLoading, editing ] = [ ref([]), ref(false), ref(false) ]

  const getHandler = async () => {
    getLoading.value = true

    try {
      const { data } = await getArticle()
      articles.value = data
    } catch (err) {
      console.log(err)
    }

    getLoading.value = false
  }

  getHandler()

  return { articles, getLoading, editing }
}

export default defineComponent({
  setup () {
    const { selected, deleteHandler, addHandler } = useAction()

    const { articles, getLoading } = useTable()

    return {
      formatDate,
      articles, getLoading,
      selected, deleteHandler, addHandler
    }
  }
})
</script>
