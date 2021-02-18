<template>
  <header class="block-header">
    <span>
      {{ title }}
    </span>
    <span v-if="$slots['header-extra']" class="block-header_extra">
      <slot name="header-extra"></slot>
    </span>
  </header>
  <div v-if="$slots.divider">
    <slot name="divider"></slot>
  </div>
  <div class="block-body" :class="bodyClass ? bodyClass : ''">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: String,
    bodyClass: String
  },
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
  .block-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing;
    border-bottom: 1px solid $border-secondary;
  }

  .block-body {
    padding: $spacing;
  }
</style>