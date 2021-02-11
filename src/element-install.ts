import { App } from 'vue'
import {
  ElButton,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElTooltip,
  ElAvatar,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDrawer
} from 'element-plus'

const components = [
  ElButton,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElTooltip,
  ElAvatar,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDrawer
]

export default {
  install(app: App) {
    for (const component of components) app.use(component)
  }
}
