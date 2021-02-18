<template>
  <el-table v-bind="$attrs" class="app-table">
    <el-table-column type="index" label="序号" width="88"></el-table-column>
    <slot></slot>
    <slot name="action">
        <el-table-column v-if="action === 'edit'" label="操作" align="center" width="75">
          <template #default="scope">
            <el-button size="mini" @click="editHandler(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column v-else-if="action === 'delete'" label="操作" align="center" width="75">
          <template #default="scope">
            <el-button type="danger" size="mini" @click="deleteHandler(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column v-else-if="action === 'both'" label="操作" align="center" width="150">
          <template #default="scope">
            <el-button size="mini" @click="editHandler(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteHandler(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </slot>
    <template #empty>
      <el-empty :description="empty"></el-empty>
    </template>
  </el-table>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import { defineComponent, PropType } from 'vue'

export type Action = 'edit' | 'delete' | 'both'
export type ActionHandler = (index: number, row: unknown) => void | Promise<void>

function useAction(onEdit: ActionHandler, onDelete: ActionHandler) {
  const editHandler = async (index: number, row: unknown) => {
    try {
      await onEdit(index, row)
      ElMessage.success('操作成功')
    } catch(err) {
      console.log(err)
    }
  }

  const deleteHandler = async (index: number, row: unknown) => {
    try {
      await onDelete(index, row)
      ElMessage.success('操作成功')
    } catch(err) {
      console.log(err)
    }
  }

  return { editHandler, deleteHandler }
}

export default defineComponent({
  props: {
    empty: {
      type: String as PropType<string>,
      default: '暂无数据哦~'
    },
    action: {
      type: String as PropType<Action>
    },
    onEdit: {
      type: Function as PropType<ActionHandler>,
      default: () => {}
    },
    onDelete: {
      type: Function as PropType<ActionHandler>,
      default: () => {}
    }
  },
  setup (props) {
    const { editHandler, deleteHandler } = useAction(props.onEdit, props.onDelete)

    return {
      editHandler, deleteHandler
    }
  }
})
</script>

<style lang="scss" scoped>
  .app-table {
    display: block;
    width: calc(100% - 20px);
    margin: auto;
  }
</style>
