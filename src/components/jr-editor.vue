<template>
  <section :id="editorId" :disabled="disabled" ref="editorRef" class="editor-wrap"></section>
</template>

<script lang="ts">
import { ConfigType } from 'node_modules/_wangeditor@4.6.7@wangeditor/dist/config'
import { defineComponent, defineProps, onMounted, PropType, Ref, ref, watch } from 'vue'
import Editor from 'wangeditor'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

export interface EditorConfig extends Partial<ConfigType> {
  [key: string]: unknown;
}

export default defineComponent({
  props: {
    value: String,
    disabled: Boolean,
    config: Object as PropType<EditorConfig>
  },
  setup (props, { emit }) {
    const editorId = 'editor' + Date.now()

    const cache = ref(undefined) as unknown as Ref<string>

    const configs: EditorConfig = {
      uploadImgAccept: [ 'jpg', 'jpeg', 'png', 'gif' ],
      uploadImgShowBase64: false,
      onchangeTimeout: 300,
      zIndex: 1,
      ...props.config
    }

    onMounted(() => {
      const editor = new Editor('#' + editorId)

      editor.highlight = hljs

      for (const key in configs) (editor.config as EditorConfig)[key] = configs[key]

      editor.txt.eventHooks.changeEvents.push(() => {
        cache.value = editor.$textElem.html()
        emit('update:value', editor.$textElem.text().trim() && cache.value)
      })

      editor.create()

      watch(
        () => props.value,
        newVal => {
          if (newVal !== cache.value) {
            /**
             * 有时父组件需要清空 value 便设置 value 为 undefined
             * 但是 html() 会过滤掉为 falsy 的参数，所以加个标签占位
             */
            editor.$textElem.html(newVal || '<p><br /></p>')
          }
        },
        { immediate: true }
      )

      watch(
        () => props.disabled,
        value => editor[value ? 'disable' : 'enable'](),
        { immediate: true }
      )
    })

    return {
      editorId
    }
  }
})
</script>

<style lang="scss" scoped>
  .editor-wrap[disabled="true"] {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      z-index: 200;
      cursor: not-allowed;
      background: rgba(255,255,255,.7);
    }
  }
</style>
