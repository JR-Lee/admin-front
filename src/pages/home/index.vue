<template>
  <div class="router-view_content" style="background: none;">
    <div class="index-item">
      <section>
        <jr-block title="最新评论" :header-border="false"></jr-block>
      </section>
      <section>
        <jr-block title="最新留言" :header-border="false"></jr-block>
      </section>
    </div>
    <div class="index-item">
      <section>
        <jr-block title="访问概览" :header-border="false"></jr-block>
      </section>
      <section>
        <jr-block title="文章概览" :header-border="false"></jr-block>
      </section>
    </div>
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

<style lang="scss" scoped>
  .index-item {
    display: flex;

    > section {
      flex: 1;
      background: $background-main;

      + section {
        margin-left: $spacing;
      }
    }

    + .index-item {
      margin-top: $spacing;
    }
  }
</style>