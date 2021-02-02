import { App } from 'vue'
import {
  ElButton,
  ElMenu,
  ElSubmenu,
  ElMenuItem
} from 'element-plus'

const components = [
  ElButton,
  ElMenu,
  ElSubmenu,
  ElMenuItem
]

export default {
  install(app: App) {
    for (const component of components) app.use(component)
  }
}
