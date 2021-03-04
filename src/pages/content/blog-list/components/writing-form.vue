<template>
  <el-dialog v-bind="$attrs">
    <jr-form :model="form" :rules="rules" :on-submit="onSubmit" v-model:disabled="disabled">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章类别" prop="categoryId">
        <el-select v-model="form.categoryId" placeholder="请选择类别" clearable>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="hidden">
        <el-radio-group v-model="form.hidden" :disabled="disabled">
          <el-radio-button
            v-for="(status, index) in $store.state.statusMap"
            :key="index"
            :label="status[0]">
            {{ status[1] }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="封面">
        <el-upload></el-upload>
      </el-form-item> -->
      <el-form-item label="背景音乐" prop="music">
        <el-input v-model="form.music" :disabled="disabled" placeholder="输入音频地址或上传音频">
          <template #prepend>
            <el-tooltip content="点击上传" placement="top">
              <i class="iconfont icon-shangchuan"></i>
            </el-tooltip>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <jr-editor
          v-model:value="form.content"
          :disabled="disabled"
          :config="{ height: '350', placeholder: '写点啥。。' }"
          style="margin-right: 125px">
        </jr-editor>
      </el-form-item>
    </jr-form>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, nextTick, watch } from 'vue'
import { IArticle, setArticle } from '@/api/article'
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { getCategory } from '@/api/category'
import JrEditor from '@/components/jr-editor.vue'

interface IForm extends IArticle {
  [ key: string ]: unknown;
}

export default defineComponent({
  components: { JrEditor },
  props: {
    article: Object
  },
  setup (props, { emit }) {
    const route = useRoute()

    const form: Partial<IForm> = reactive({
      title: undefined,
      categoryId: undefined,
      hidden: 0,
      content: undefined
    })

    const visible = ref(false)

    if (props.article) for (const key in form) form[key] = props.article[key]

    const rules = reactive({
      title: [
        { required: true, message: '请输入标题' },
        { max: 40, message: '标题应小于 40 个字符' }
      ],
      categoryId: { required: true, message: '请选择类别' },
      hidden: { required: true, message: '请选择状态' },
      content: { required: true, message: '请输入内容' }
    })

    const disabled = ref(false)

    const onSubmit = async () => {
      await setArticle(form as Required<IArticle>, props.article && props.article._id)
      await nextTick()
      form.content = undefined
    }

    const categories = ref([])

    getCategory().then(({ data }) => categories.value = data)

    return {
      form,
      rules,
      disabled,
      onSubmit,
      categories
    }
  }
})
</script>
