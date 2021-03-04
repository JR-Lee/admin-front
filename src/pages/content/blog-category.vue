<template>
  <div class="router-view_content">
    <jr-block
      :action="{ type: 'primary', text: '添加类别', handler: () => { currentId = undefined; visible = true } }"
      title="博客分类列表">
      <jr-table
        :loading="tableLoading"
        :data-source="categories"
        :on-edit="editHandler"
        :on-delete="deleteHandler"
        empty="暂无分类">
        <el-table-column prop="name" label="类别" width="140"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </jr-table>
      <el-dialog v-model="visible">
        <jr-form :model="form" :rules="rules" :on-submit="submitHandler">
          <el-form-item label="类别名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入类别名称"></el-input>
          </el-form-item>
          <el-form-item label="类别备注" prop="remark">
            <el-input
              v-model="form.remark"
              type="textarea"
              placeholder="请输入 200 字符以内的备注"
              :rows="4"
              :maxlength="200"
              show-word-limit>
            </el-input>
          </el-form-item>
        </jr-form>
      </el-dialog>
    </jr-block>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref } from 'vue'
import { ICategory, getCategory, deleteCategory, setCategory } from '@/api/category'
import { IElForm } from '@/types'

export default defineComponent({
  setup () {
    const categories = ref<ICategory[]>([])

    const form = reactive<Partial<ICategory>>({
      name: undefined,
      remark: undefined
    })

    const rules = reactive({
      name: [
        { required: true, message: '请输入类别名称' },
        { max: 20, message: '类别名称应小于 20 个字符' }
      ],
      remark: { max: 200, message: '类别备注应小于 200 个字符' }
    })

    const currentId = ref('')

    const tableLoading = ref(false)

    const visible = ref(false)

    // 清空表单
    const emptyForm = () => {
      for (const key in form) form[key] = undefined
    }

    // 获取数据
    const getData = async () => {
      tableLoading.value = true

      try {
        categories.value = (await getCategory()).data
      } catch (err) {
        console.log(err)
      }

      tableLoading.value = false
    }

    // 编辑类别
    const editHandler = (index: number, row: ICategory) => {
      visible.value = true
      for (const key in form) form[key] = row[key]
      currentId.value = row._id as string
    }

    // 删除类别
    const deleteHandler = async (index: number, row: ICategory) => {
      await deleteCategory(row._id as string)

      getData()
    }

    // 提交
    const submitHandler = async (formRef: IElForm) => {
      await setCategory(form as ICategory, currentId.value)
      visible.value = false
      getData()
    }

    getData()

    return {
      form,
      rules,
      currentId,
      tableLoading,
      visible,
      categories,
      emptyForm,
      editHandler,
      deleteHandler,
      submitHandler
    }
  }
})
</script>
