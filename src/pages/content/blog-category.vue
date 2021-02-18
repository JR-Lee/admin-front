<template>
  <header class="block-title">博客分类列表</header>
  <div class="block-content">
    <el-table :data="[]"  empty-text="暂无分类">
      <template #empty>
        <el-empty description="暂无分类" :image-size="100"></el-empty>
      </template>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    

    return {}
  }
})
</script>

<style scoped>

</style>