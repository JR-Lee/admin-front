<template>
  <nav @mousemove="mouseMoveHandler" @mouseleave="mouseLeaveHandler">
    <div class="nav-left">
      <div class="nav-item nav-ink">
        <el-tooltip :content="$store.state.isCollapse ? '展开菜单' : '收起菜单'">
          <span class="ut_cursor-pointer ut_bold" @click="menuCollapseHandler">
            <i v-if="$store.state.isCollapse" class="iconfont icon-zhedie2"></i>
            <i v-else class="iconfont icon-zhedie1"></i>
          </span>
        </el-tooltip>
      </div>
      <div class="nav-item nav-ink">
        <el-tooltip content="前台">
          <span>
            <i class="iconfont icon-qianduan"></i>
          </span>
        </el-tooltip>
      </div>
      <div class="nav-item nav-ink">
        <el-tooltip content="刷新">
          <span>
            <i class="iconfont icon-shuaxin"></i>
          </span>
        </el-tooltip>
      </div>
    </div>
    <div class="nav-center">
      <div class="nav-item">
        <time :datetime="new Date()">{{ date }}</time>
      </div>
    </div>
    <div class="nav-right">
      <div class="nav-item nav-ink">
        <el-tooltip content="消息">
          <span>
            <i class="iconfont icon-xiaoxi1"></i>
          </span>
        </el-tooltip>
      </div>
      <div class="nav-item nav-ink">
        <el-tooltip content="切换主题">
          <span>
            <jr-theme>
              <i class="iconfont icon-zhuti"></i>
            </jr-theme>
          </span>
        </el-tooltip>
      </div>
      <div class="nav-item nav-ink">
        <el-tooltip content="本地便签">
          <span>
            <jr-note>
              <i class="iconfont icon-bianqian"></i>
            </jr-note>
          </span>
        </el-tooltip>
      </div>
      <div class="nav-item nav-ink">
        <el-tooltip content="全屏展示">
          <span @click="fullScreenHandler">
            <i class="iconfont icon-quanping"></i>
          </span>
        </el-tooltip>
      </div>
      <div class="nav-item nav-ink">
        <el-dropdown trigger="click" placement="bottom-end">
          <div class="user-info">
            <el-avatar shape="circle" size="small" :src="$store.state.userInfo.avatar"></el-avatar>
            <span>{{ $store.state.userInfo.name }} <i class="iconfont icon-xiala2"></i></span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push({ name: 'user-info' })">
                <i class="iconfont icon-yonghuxinxi"></i> 用户信息
              </el-dropdown-item>
              <el-dropdown-item @click="$router.push({ name: 'change-pass' })">
                <i class="iconfont icon-xiugaimima01"></i> 修改密码
              </el-dropdown-item>
              <el-dropdown-item @click="logoutHandler" divided>
                <i class="iconfont icon-icon-out-light"></i> 退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <span class="nav-cursor" :style="`left: ${cursorLeft}px; width: ${cursorWidth}px;`"></span>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { formatDate, fullScreen } from '@/utils/index'
import { useStore } from 'vuex'
import JrTheme from '@/components/jr-theme.vue'
import JrNote from '@/components/jr-note.vue'
import { useRouter } from 'vue-router'

function useMouse () {
  let [ cursorLeft, cursorWidth ] = [ ref(0), ref(0) ]
  const mouseMoveHandler = (e: MouseEvent) => {
    if (!e.target || !(e.target as HTMLElement).className.includes('nav-ink')) return

    const { offsetLeft, offsetWidth } = (e.target as HTMLElement)
    cursorLeft.value = offsetLeft
    cursorWidth.value = offsetWidth
  }
  const mouseLeaveHandler = () => cursorWidth.value = 0

  return { mouseMoveHandler, mouseLeaveHandler, cursorLeft, cursorWidth }
}

export default defineComponent({
  components: { JrTheme, JrNote },
  setup () {
    const _store = useStore()
    const _router = useRouter()

    const formate = 'yyyy年MM月dd日 HH时mm分ss秒 星期w'
    const date = ref(formatDate(new Date(), formate))
    setInterval(() => date.value = formatDate(new Date(), formate), 1000)

    const menuCollapseHandler = () => _store.commit('SET_COLLAPSE')

    const { mouseMoveHandler, mouseLeaveHandler, cursorLeft, cursorWidth } = useMouse()

    const logoutHandler = () => {
      // 清除 token

      // 跳转至登陆页
      _router.push({ name: 'user', params: { action: 'login' } })
    }

    return {
      date,
      menuCollapseHandler,
      mouseMoveHandler, mouseLeaveHandler, cursorLeft, cursorWidth,
      fullScreenHandler: () => fullScreen(document.body),
      logoutHandler
    }
  }
})
</script>

<style lang="scss" scoped>
  nav {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: $nav-height;
    padding: 0px $spacing-x;
    background: $background-main;
    border-bottom: 1px solid $border-main;

    > div {
      display: flex;

      &.nav-right {
        justify-content: flex-end;
      }
    }

    .nav-item {
      position: relative;
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0px 7px;

      > span {
        cursor: pointer;
        transition: color .2s;

        &:hover {
          color: $--color-primary;
        }
      }

      time {
        color: $--color-primary;
        text-shadow: 1px 1px 3px;
      }

      + .nav-item {
        margin-left: $spacing-x;
      }
    }

    > .nav-cursor {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 0px;
      height: 2px;
      background: $--color-primary;
      transition: left .7s ease-out, width .3s ease-out;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: .2s;

    > span:last-child {
      padding-left: 6px;
    }

    i.iconfont {
      display: inline-block;
      transition: transform .2s ease-in;
    }

    &:focus {
      color: $color-link;

      i.iconfont {
        transform: rotate(180deg);
      }
    }
  }
</style>
