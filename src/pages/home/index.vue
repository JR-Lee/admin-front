<template>
  <div>
    <el-button type="primary" @click="useClick">Click Me.</el-button>
  </div>
</template>

<script lang="ts">
import Message from 'element-plus/lib/el-message'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const useClick = () => {
      Message.success('success!')
    }
    return {
      useClick
    }
  }
})
</script>

<style scoped>

</style>
