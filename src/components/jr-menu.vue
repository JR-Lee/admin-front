<template>
  <div class="logo-wrap" style="background: #202222">
    <router-link class="logo" tag="a" to="/" title="博客后台管理系统"></router-link>
  </div>
  <el-menu
    class="aside-menu"
    :default-active="$route.path"
    :collapse="$store.state.isCollapse"
    background-color="#202222"
    text-color="#fff"
    unique-opened
    router>
    <template v-for="menu in menus" :key="menu.name">
      <el-submenu v-if="menu.children" :index="menu.path">
        <template #title>
          <i :class="'iconfont ' + menu.meta.icon"></i>
          <span> {{ menu.meta.title }}</span>
        </template>
        <el-menu-item v-for="item in menu.children" :index="menu.path + '/' + item.path" :key="item.name">
          <template #title>
            <i :class="'iconfont ' + item.meta.icon"></i>
            <span> {{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="menu.path">
        <i :class="'iconfont ' + menu.meta.icon"></i>
        <template #title>
          <span> {{ menu.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { staticMenus } from '@/router/index'

function useMenu() {
  const menus = computed(() => staticMenus)
  const isCollapse = ref(true)
  return { menus, isCollapse }
}

export default defineComponent({
  setup () {
    const { menus, isCollapse } = useMenu()

    return {
      menus,
      isCollapse
    }
  }
})
</script>

<style lang="scss">
  .el-menu {
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

<style lang="scss" scoped>
  .logo-wrap {
    display: flex;
    justify-content: center;
    width: 100%;
    height: $nav-height;
    padding: 10px;

    > .logo {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: url('../assets/logo.png') no-repeat center center;
      background-size: contain;
      box-sizing: border-box;
    }
  }

  .aside-menu{
    width: $aside-width;
    height: 100%;
    border-right: none;
    overflow-y: hidden;

    &:hover {
      overflow-y: auto;
    }

    &.el-menu--collapse {
      width: 64px;
    }
  }
</style>
