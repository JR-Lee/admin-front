<template>
  <section v-if="filterConfig && filterModel" class="app-table_filter">
    <component
      v-for="(item, index) in filterConfig.items"
      :key="index"
      :is="item.component"
      :disabled="loading"
      v-bind="item.attrs"
      v-model="filterModel[item.name]"
      clearable>
      <template v-if="item.component === 'el-select' && item.options">
        <el-option
          v-for="option in (item.transform ?  item.transform(item.options) : item.options)"
          :key="option._id"
          :value="option._id"
          :label="option.name">
        </el-option>
      </template>
    </component>
    <el-button @click="filterHandler" :loading="loading" type="primary" size="small">
      <i class="iconfont icon-sousuo"></i>
    </el-button>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue'

export interface IFilterConfig {
  handler: (value: unknown) => void;
  items: {
    name: string;
    attrs: { [key: string]: unknown };
    component: string;
    options?: { [key: string]: unknown }[];
    field: { name: string; _id: string; }
  }[]
}

export default defineComponent({
  props: {
    filterConfig: Object as PropType<IFilterConfig>
  },
  setup (props) {
    const filterModel = reactive<{ [prop: string]: unknown | undefined }>({})

    const loading = ref(false)

    const initFilterModel = () => {
      const { filterConfig: config } = props

      if (!config) return

      const items = config.items
      items.forEach(item => filterModel[item.name] = undefined)
    }

    const filterHandler = async () => {
      const config = props.filterConfig

      if (!config) return

      try {
        loading.value = true
        await config.handler(JSON.parse(JSON.stringify((filterModel))))
      } catch (err) {
        console.log('filter error: ', err)
      }

      loading.value = false
    }

    initFilterModel()

    return {
      filterModel,
      filterHandler,
      loading
    }
  }
})
</script>

<style lang="scss" scoped>
  .app-table_filter:deep() {
    margin-bottom: $spacing;

    > * + * {
      margin-left: $spacing;
    }
  }
</style>
