<template>
  <el-menu class="aside-menu" router>
    <template v-for="menu in menus" :key="menu.name">
      <el-submenu v-if="menu.children">
        <el-menu-item v-for="item in menu.children" :index="menu.path + item.path" :key="item.name">
          <i :class="'iconfont ' + item.meta.icon"></i><span>{{ item.meta.title }}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="menu.path">
        <i :class="'iconfont ' + menu.meta.icon"></i><span>{{ menu.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { routes } from '@/router/index'
import { RouteRecordRaw } from 'vue-router'

export default defineComponent({
  setup () {
    const menus = computed(() => routes.filter((item: RouteRecordRaw) => !item.meta?.hide))

    return {
      menus
    }
  }
})
</script>

<style lang="scss" scoped>
  .aside-menu {
    height: 100%;

    i.iconfont {
      font-size: $size-text-large-2x;
      vertical-align: middle;

      + span {
        padding-left: 10px;
        vertical-align: middle;
      }
    }
  }
</style>
