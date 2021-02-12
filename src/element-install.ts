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
  ElDrawer,
  ElSelect,
  ElOption,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadioGroup,
  ElRadio,
  ElUpload,
  ElDialog
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
  ElDrawer,
  ElSelect,
  ElOption,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadioGroup,
  ElRadio,
  ElUpload,
  ElDialog
]

export default {
  install(app: App) {
    for (const component of components) app.use(component)
  }
}
