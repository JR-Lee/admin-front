<template>
  <aside class="app-aside">
    <jr-menu></jr-menu>
  </aside>
  <div class="app-main">
    <header>
      <jr-nav></jr-nav>
      <section v-show="!isConsole" class="app-crumb ut_slide-down">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
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
      <router-view #="{ Component }">
        <component :is="Component"></component>
      </router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import JrNav from '@/components/jr-nav.vue'
import JrMenu from '@/components/jr-menu.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Layout',
  components: {
    JrNav,
    JrMenu
  },
  setup() {
    const _route = useRoute()

    // 当前页面是否为首页
    const isConsole = computed(() => _route.name === 'index')

    return { isConsole }
  }
})
</script>

<style lang="scss" scoped>
  .app-aside {
    display: flex;
    flex-direction: column;
    width: auto;
    height: 100%;
    border-right: 1px solid $border-main;
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
  }

  .app-crumb {
    display: flex;
    align-items: center;
    height: $nav-height;
    padding: 0px $spacing-x;
    background: $background-main;
  }
</style>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: all .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transition: all .2s;
  }
</style>
