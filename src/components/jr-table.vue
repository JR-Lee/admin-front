<template>
  <section class="app-table_filter"></section>
  <section class="app-table_body">
    <el-table
      v-bind="$attrs"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, .4)"
      :data="dataCurrent"
      :height="tableHeight"
      @selection-change="selectHandler"
      show-overflow-tooltip
      border>
      <el-table-column v-if="selected" type="selection" align="center"></el-table-column>
      <el-table-column v-if="showIndex" type="index" label="序号" width="60"></el-table-column>
      <slot></slot>
      <slot name="action">
          <el-table-column v-if="onEdit && !onDelete" label="操作" align="center" width="100">
            <template #default="scope">
              <el-button size="mini" @click="editHandler(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column v-else-if="onDelete && !onEdit" label="操作" align="center" width="100">
            <template #default="scope">
              <el-button type="danger" size="mini" @click="deleteHandler(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column v-else-if="onDelete && onEdit" label="操作" align="center" width="160">
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
  </section>
  <section class="app-table_pagination">
    <el-pagination
      :disabled="loading"
      v-bind="pagination"
      @size-change="sizeHandler"
      @current-change="currentHandler">
    </el-pagination>
  </section>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import { computed, defineComponent, onMounted, PropType, reactive, Ref, ref, nextTick } from 'vue'

export type ActionHandler = (index: number, row: unknown) => void | Promise<void>
export interface Pagination {
  currentPage?: number;
  pageSizes?: number;
  pageSize?: number;
  total?: number;
}

function useAction(
  emit: (event: string, ...args: any[]) => void,
  onEdit: ActionHandler = () => undefined,
  onDelete: ActionHandler = () => undefined
) {
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

  const selectHandler = (value: unknown) => {
    emit('update:selected', JSON.parse(JSON.stringify(value)))
  }

  return { editHandler, deleteHandler, selectHandler }
}

/**
 * 筛选
 * @param { dataSource: unknown[] } - 数据源
 */
function useFilter(dataSource: unknown[]){
  const dataTarget = ref<unknown[]>([])

  // 这里进行筛选
  dataTarget.value = dataSource

  return { dataTarget }
}

/**
 * 分页器
 * @param { dataTarget : Ref<unknown[]> } - 经过筛选的数据源
 */
function usePagination(dataTarget: Ref<unknown[]>) {
  const pagination = reactive({
    currentPage: 1,
    pageSizes: [5, 10, 20, 50, 100],
    pageSize: 10,
    total: dataTarget.value.length,
    background: true,
    layout: "total, sizes, prev, pager, next, jumper"
  })

  const sizeHandler = (val: number) => pagination.pageSize = val

  const currentHandler = (val: number) => pagination.currentPage = val

  // 当前页的数据
  const dataCurrent = computed(() => {
    const { currentPage: current, pageSize: size } = pagination
    return dataTarget.value.slice((current - 1) * size, current * size)
  })

  return { pagination, sizeHandler, currentHandler, dataCurrent }
}

export default defineComponent({
  props: {
    empty: {
      type: String as PropType<string>,
      default: '暂无数据哦~'
    },
    loading: Boolean,
    showIndex: Boolean,
    onEdit: Function as PropType<ActionHandler>,
    onDelete: Function as PropType<ActionHandler>,
    dataSource: {
      type: Array,
      default: []
    },
    pagination: {
      type: Object as PropType<Pagination>,
      default: {}
    },
    selected: Array
  },
  setup (props, { emit }) {
    const { dataTarget } = useFilter(props.dataSource)
    const { pagination, sizeHandler, currentHandler, dataCurrent } = usePagination(dataTarget)
    const { editHandler, deleteHandler, selectHandler } = useAction(emit, props.onEdit, props.onDelete)

    const tableHeight = ref('auto')
    onMounted(() => {
      const top = document.querySelector('.el-table__body-wrapper')?.getBoundingClientRect().top
      nextTick().then(() => {
        tableHeight.value = `calc(100vh - ${top as number + 88}px)`
        console.log(tableHeight.value)
      })
    })

    return {
      pagination, sizeHandler, currentHandler, dataCurrent,
      editHandler, deleteHandler, selectHandler,
      tableHeight
    }
  }
})
</script>

<style lang="scss" scoped>
  .app-table_body:deep() {
    width: 100%;
    overflow-x: hidden;

    > .el-table {
      display: block;
      width: calc(100% - 40px);
      margin: auto;
    }

    .el-table__header {
      &, th, tr {
        background: #f5f7fa;
      }
    }
  }

  .app-table_pagination {
    padding: $spacing 0px;
    text-align: center;
  }
</style>
