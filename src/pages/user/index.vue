<template>
  <section class="login-form_wrap">
    <login-form v-if="action === 'login'" @change-action="action = 'register'"></login-form>
    <register-form v-else @change-action="action = 'login'"></register-form>
    <footer class="app-copyright">
      <small>©2021 版权归 JR·Lee 所有</small>
    </footer>
  </section>
  <section class="login-background"></section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginForm from './components/login-form.vue'
import RegisterForm from './components/register-form.vue'

export type Action = 'login' | 'register'

export default defineComponent({
  name: 'user',
  components: { LoginForm, RegisterForm },
  setup () {
    const action = ref<Action>('login')

    return {
      action
    }
  }
})
</script>

<style lang="scss" scoped>
  .login-form_wrap {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    padding: 10px 30px 20px;
    color: #fff;
    // background: rgba(0, 0, 0, 0.42);
    border-radius: 10px;
    transform: translate(-50%, -50%);
  }

  :deep() {
    .login-form, .register-form {
      width: 300px;
      margin-top: 35px;

      .el-form-item__content {
        line-height: normal;
      }

      .el-input-group__prepend {
        padding: 0px 17px;

        i.iconfont {
          font-size: 17px;
        }
      }

      .verify-form-item {
        .el-form-item__content {
          display: flex;

          .el-input__inner {
            border: {
              top-right-radius: 0px;
              bottom-right-radius: 0px;
            }
          }

          .el-button {
            width: 140px;
            padding: {
              left: 0px;
              right: 0px;
            };
            text-align: center;
            box-sizing: border-box;
            border: {
              width: 0px;
              top-left-radius: 0px;
              bottom-left-radius: 0px;
            }
          }
        }
      }
    }
  }

  .login-background {
    position: fixed;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(../../assets/background2.jpg) no-repeat center center;
    background-size: cover;

    &::after {
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.42);
    }
  }

  .app-copyright {
    color: #ddd;
    text-align: center;
  }
</style>
