<template>
  <div class="login-form_wrap">
    <router-view></router-view>
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
  .login-form_wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 30px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgba(0,0,0,.1) 0px 0px 10px 0px;
  }
</style>
