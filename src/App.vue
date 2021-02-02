<template>
  <aside class="main-aside">
    <aside-menu></aside-menu>
  </aside>
  <div>
    <header><header-nav></header-nav></header>
    <main class="router-view_wrap">
      <router-view class="router-view_content"></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderNav from '@/components/header-nav.vue'
import AsideMenu from '@/components/aside-menu.vue'

export default defineComponent({
  name: 'App',
  components: {
    HeaderNav,
    AsideMenu
  }
})
</script>
