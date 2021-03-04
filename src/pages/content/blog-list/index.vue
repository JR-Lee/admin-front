<template>
  <div class="router-view_content">
    <jr-block
      title="博客管理"
      :action="[ { type: 'primary', text: '新增', handler: () => dialogVisible = true } ]">
      <jr-table
        :data-source="articles"
        :loading="getLoading"
        :on-edit="(index, article) => currentArticle = article"
        :on-delete="deleteHandler"
        :on-search="getHandler"
        :filter-config="filterConfig"
        empty="暂无文章，快去写一篇吧~"
        delete-confirm>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="categoryId" label="类别">
          <template #="{ row: { categoryId } }">
            {{ (categories.find(item => item._id === categoryId) || {}).name }}
          </template>
        </el-table-column>
        <el-table-column prop="authorName" label="作者"></el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template #="{ row: { createTime } }">
            {{ formatDate(new Date(createTime), 'yyyy-MM-dd HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="编辑时间">
          <template #="{ row: { updateTime } }">
            {{ formatDate(new Date(updateTime), 'yyyy-MM-dd HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column prop="like" label="喜欢" width="70" align="center">
          <template #="{ row: { like } }">
            <span :class="like > 99 ? 'ut_color-danger' : 'ut_color-info'">{{ like }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="read" label="阅读" width="70" align="center">
          <template #="{ row: { read } }">
            <span :class="read > 99 ? 'ut_color-danger' : 'ut_color-info'">{{ read }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="hidden" label="状态" width="88" align="center">
          <template #="{ row: { hidden } }">
            <el-tag v-if="hidden" type="danger">隐藏</el-tag>
            <el-tag v-else type="success">显示</el-tag>
          </template>
        </el-table-column>
      </jr-table>
      <writing-form v-model="dialogVisible" :article="currentArticle" top="20px" width="70%"></writing-form>
    </jr-block>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { formatDate } from '@/utils/index'
import { deleteArticle, getArticle, IArticle, IFilter } from '@/api/article'
import { useCategory } from '@/composables'
import { useStore } from 'vuex'
import WritingForm from './components/writing-form.vue'

interface IFilterModel {
  timeRange: string[];
  categoryId: string;
  hidden?: number;
}

export default defineComponent({
  components: { WritingForm },
  setup () {
    const store = useStore()

    const { categories } = useCategory()
    const articles = ref([])
    const getLoading = ref(false)
    const editing = ref(false)

    const dialogVisible = ref(false)

    const currentArticle = ref(null)

    const getHandler = async (filter?: IFilter) => {
      getLoading.value = true

      try {
        const { data } = await getArticle(filter as IFilter)
        articles.value = data
      } catch (err) {
        console.log(err)
      }

      getLoading.value = false
    }

    // 删除
    const deleteHandler = (index: number, row: IArticle) => deleteArticle(row._id).then(() => getHandler())

    const filterConfig = reactive({
      handler: (value: IFilterModel) => {
        let { timeRange } = value
        const { categoryId, hidden } = value

        !timeRange && (timeRange = [])

        const startTime = timeRange[0] ? new Date(timeRange[0]).getTime() : undefined
        const endTime = timeRange[1] ? new Date(timeRange[1]).getTime() : undefined

        return getHandler({ startTime, endTime, categoryId, hidden })
      },
      items: [
        {
          name: 'categoryId',
          component: 'el-select',
          attrs: { placeholder: '请选择文章类别' },
          options: categories
        },
        {
          name: 'hidden',
          component: 'el-select',
          attrs: { placeholder: '请选择文章状态' },
          options: store.state.statusMap,
          transform: (map: Map<number, string>) => {
            const arr: { [key: string]: string | number }[] = []
            map.forEach((value, key) => arr.push({ _id: key, name: value }))
            return arr
          }
        },
        {
          name: 'timeRange',
          component: 'el-date-picker',
          attrs: {
            type: 'datetimerange',
            'start-placeholder': "开始时间",
            'end-placeholder': "结束时间"
          }
        }
      ]
    })

    getHandler()

    return {
      formatDate,
      categories,
      articles,
      getHandler,
      getLoading,
      currentArticle,
      dialogVisible,
      deleteHandler,
      filterConfig
    }
  }
})
</script>
