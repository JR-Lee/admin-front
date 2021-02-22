<template>
  <router-view></router-view>
  <section class="app-progress">
    <span></span>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
  #app {
    display: flex;
    height: 100%;
    background: $background-global;
  }

  .app-progress {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100;
    width: 100%;
    height: 2px;

    > span {
      display: block;
      width: 0%;
      height: 100%;
      background-color: $--color-primary;
    }

    &.app-progress_ready {
      > span {
        width: 77.777%;
        transition: width 1.2s ease-out;
      }
    }

    &.app-progress_complete {
      > span {
        width: 99.999%;
        transition: width .7s ease-out;
      }
    }
  }
</style>
