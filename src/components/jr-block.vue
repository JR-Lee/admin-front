<template>
  <header :class="{ 'block-header': true, 'block-header_border': headerBorder }">
    <span>
      {{ title }}
    </span>
    <span v-if="$slots['header-extra']" class="block-header_extra">
      <slot name="header-extra"></slot>
    </span>
    <template v-else-if="action">
      <span v-if="Array.isArray(action)">
        <el-button
          v-for="(item, index) in action"
          @click="item.handler"
          :type="item.type"
          :key="index"
          size="small">
          {{ item.text }}
        </el-button>
      </span>
      <span v-else>
        <el-button
          @click="action.handler"
          :type="action.type"
          size="small">
          {{ action.text }}
        </el-button>
      </span>
    </template>
  </header>
  <div v-if="$slots.divider">
    <slot name="divider"></slot>
  </div>
  <div class="block-body" :class="bodyClass ? bodyClass : ''">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface Action {
  type?: string;
  handler: () => void;
  text: string;
}

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    headerBorder: {
      type: Boolean,
      default: true
    },
    bodyClass: String,
    action: [Array, Object]  as PropType<Action[] | Action>
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
    flex: none;
    height: 55px;
    padding: 0px $spacing;
    border-bottom: 1px solid $border-secondary;
    box-sizing: border-box;
  }

  .block-header_border > span:first-child {
    position: relative;
    padding-left: 15px;

    &::before {
      content: '';
      position: absolute;
      left: 0px;
      top: 0px;
      width: 4px;
      height: 100%;
      background: $--color-primary;
    }
  }

  .block-body {
    padding: $spacing;
  }
</style>