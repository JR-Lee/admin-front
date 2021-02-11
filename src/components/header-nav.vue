<template>
  <nav @mousemove="mouseMoveHandler" @mouseleave="mouseLeaveHandler">
    <div class="nav-left">
      <div class="nav-item nav-ink">
        <span class="ut_cursor-pointer ut_bold" @click="menuCollapseHandler">
          <i v-if="$store.state.isCollapse" title="展开菜单" class="iconfont icon-zhedie2"></i>
          <i v-else title="收起菜单" class="iconfont icon-zhedie1"></i>
        </span>
      </div>
      <div class="nav-item nav-ink">
        <span><i class="iconfont icon-qianduan"></i></span>
      </div>
      <div class="nav-item nav-ink">
        <span><i class="iconfont icon-shuaxin"></i></span>
      </div>
    </div>
    <div class="nav-center">
      <div class="nav-item">
        <time :datetime="new Date()">{{ date }}</time>
      </div>
    </div>
    <div class="nav-right">
      <div class="nav-item nav-ink">
        <span title="消息"><i class="iconfont icon-xiaoxi1"></i></span>
      </div>
      <div class="nav-item nav-ink">
        <span>
          <custom-theme title="切换主题">
            <template #icon>
              <i class="iconfont icon-zhuti"></i>
            </template>
          </custom-theme>
        </span>
      </div>
      <div class="nav-item nav-ink">
        <span title="本地便签"><i class="iconfont icon-bianqian"></i></span>
      </div>
      <div class="nav-item nav-ink">
        <span title="全屏展示" @click="fullScreenHandler"><i class="iconfont icon-quanping"></i></span>
      </div>
      <div class="nav-item nav-ink">
        <el-avatar shape="circle" size="small" :src="$store.state.userInfo.avatar"></el-avatar>
        <el-dropdown trigger="click" placement="bottom-end">
          <span class="user_menu">{{ $store.state.userInfo.name }} <i class="iconfont icon-xiala2"></i></span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <router-link :to="{ name: 'user-info' }" class="ut_color-text">
                  <i class="iconfont icon-yonghuxinxi"></i> 用户信息
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link :to="{ name: 'change-pass' }" class="ut_color-text">
                  <i class="iconfont icon-xiugaimima01"></i> 修改密码
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <router-link :to="{ name: 'home' }" class="ut_color-text">
                  <i class="iconfont icon-icon-out-light"></i> 退出登录
                </router-link>
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
import CustomTheme from '@/components/custom-theme.vue'

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
  components: { CustomTheme },
  setup () {
    const _store = useStore()

    const formate = 'yyyy年MM月dd日 HH时mm分ss秒 星期w'
    const date = ref(formatDate(new Date(), formate))
    setInterval(() => date.value = formatDate(new Date(), formate), 1000)

    const menuCollapseHandler = () => _store.commit('SET_COLLAPSE')

    const { mouseMoveHandler, mouseLeaveHandler, cursorLeft, cursorWidth } = useMouse()

    return {
      date,
      menuCollapseHandler,
      mouseMoveHandler, mouseLeaveHandler, cursorLeft, cursorWidth,
      fullScreenHandler: () => fullScreen(document.body)
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

      > time {
        color: $--color-primary;
        font-size: $size-text-large;
        text-shadow: 3px 3px 4px;
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

  .user_menu {
    cursor: pointer;
    padding-left: 6px;
    transition: .2s;

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
