<template>
  <aside class="app-aside">
    <aside-menu></aside-menu>
  </aside>
  <div class="app-main">
    <header>
      <header-nav></header-nav>
      <section v-show="!isConsole" class="app-crumb ut_slide-down">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            v-for="(item, index) in $route.matched"
            :to="{ path: item.path }"
            :key="index">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </section>
    </header>
    <main class="router-view_wrap">
      <router-view class="router-view_content"></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import HeaderNav from '@/components/header-nav.vue'
import AsideMenu from '@/components/aside-menu.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {
    HeaderNav,
    AsideMenu
  },
  setup() {
    const _route = useRoute()

    // 当前页面是否为控制台
    const isConsole = computed(() => _route.name === 'console')

    return { isConsole }
  }
})
</script>

<style lang="scss">
  #app {
    display: flex;
    height: 100%;
    background: $background-global;
  }
</style>

<style lang="scss" scoped>
  .app-aside {
    display: flex;
    flex-direction: column;
    width: auto;
    height: 100%;
    background: $background-main;
  }

  .app-main {
    display: flex;
    flex-direction: column;
    width: 100%;

    > header {
      z-index: 1;
      box-shadow: $shadow-main 2px 2px 2px;
    }

    > main {
      height: 100%;
    }

    > .router-view_wrap {
      width: 100%;
    }
  }

  .app-crumb {
    display: flex;
    align-items: center;
    height: $nav-height;
    padding: 0px $spacing-x;
    background: $background-main;
  }
</style>
