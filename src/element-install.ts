import { App } from 'vue'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import {
  locale,
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
  ElDialog,
  ElRadioButton,
  ElAlert,
  ElEmpty,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElLoading,
  ElTag
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
  ElDialog,
  ElRadioButton,
  ElAlert,
  ElEmpty,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElLoading,
  ElTag
]

locale(lang)

export interface PluginI {
  install: (app: App) => void;
  [key: string]: unknown;
}
export default {
  install(app: App) {
    for (const component of components) app.use(component as PluginI)
  }
}
