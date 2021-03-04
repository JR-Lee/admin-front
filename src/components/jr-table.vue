<template>
  <jr-filter v-bind="$attrs"></jr-filter>
  <section class="app-table_body">
    <el-table
      v-bind="$attrs"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, .7)"
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
          <el-table-column v-else-if="onDelete && onEdit" label="操作" align="center" width="170">
            <template #default="scope">
              <el-button size="mini" @click="editHandler(scope.$index, scope.row)" :disabled="scope.row.$deleteLoading">编辑</el-button>
              <el-button type="danger" size="mini" @click="deleteHandler(scope.$index, scope.row)" :loading="scope.row.$deleteLoading">删除</el-button>
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, defineComponent, onMounted, PropType, reactive, Ref, ref, nextTick, watch } from 'vue'
import JrFilter from '@/components/jr-filter.vue'

export type ActionHandler = (index: number, row: unknown) => void | Promise<void>
export interface IPagination {
  currentPage?: number;
  pageSizes?: number;
  pageSize?: number;
  total?: number;
}

export default defineComponent({
  components: { JrFilter },
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
      type: Array as PropType<unknown[]>,
      default: []
    },
    pagination: {
      type: Object as PropType<IPagination>,
      default: {}
    },
    selected: Array,
    deleteConfirm: Boolean // 删除时弹窗提示
  },
  setup (props, { emit }) {
    const dataSource = computed(() => props.dataSource)

    const pagination = reactive({
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 10,
      total: computed(() => dataSource.value.length),
      background: true,
      layout: "total, sizes, prev, pager, next, jumper"
    })

    const sizeHandler = (val: number) => pagination.pageSize = val

    const currentHandler = (val: number) => pagination.currentPage = val

    // 当前页的数据
    const dataCurrent = computed(() => {
      const { currentPage: current, pageSize: size } = pagination
      return dataSource.value.slice((current - 1) * size, current * size)
    })

    const editHandler = (index: number, row: any) => {
      props.onEdit && props.onEdit(index, row)
    }

    const deleteHandler = (index: number, row: any) => {
      const deleteFunc = async () => {
        row.$deleteLoading = true

        try {
          props.onDelete && await props.onDelete(index, row)
          ElMessage.success('操作成功')
        } catch(err) {
          console.log(err)
        }

        row.$deleteLoading = false
      }

      if (props.deleteConfirm) {
        ElMessageBox.confirm('此操作将永久删除该数据，是否继续？', '提示', { type: 'warning' })
          .then(() => deleteFunc())
          .catch(err => console.log(err))
      } else deleteFunc()
    }

    const selectHandler = (value: unknown) => {
      emit('update:selected', JSON.parse(JSON.stringify(value)))
    }

    const tableHeight = ref('auto')

    onMounted(() => {
      const top = document.querySelector('.el-table__body-wrapper')?.getBoundingClientRect().top
      nextTick().then(() => {
        tableHeight.value = `calc(100vh - ${top as number + 88}px)`
        console.log(tableHeight.value)
      })
    })

    return {
      pagination,
      sizeHandler,
      currentHandler,
      dataCurrent,
      editHandler,
      deleteHandler,
      selectHandler,
      tableHeight,
    }
  }
})
</script>

<style lang="scss" scoped>
  .app-table_filter, .el-table {
    display: block;
    width: calc(100% - 40px);
    margin-left: auto;
    margin-right: auto;
  }

  .app-table_body:deep() {
    width: 100%;
    overflow-x: hidden;

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
