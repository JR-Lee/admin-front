<template>
  <span @click="drawerHandler">
    <slot></slot>
  </span>
  <el-drawer
    v-model="visible"
    append-to-body
    :show-close="false"
    :with-header="false">
    <div class="block-title">自定义主题</div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

function useDrawer() {
  const visible = ref(false)
  const drawerHandler = () => visible.value = !visible.value

  return { visible, drawerHandler }
}

export default defineComponent({
  setup () {
    const { visible, drawerHandler } = useDrawer()

    return { visible, drawerHandler }
  }
})
</script>
