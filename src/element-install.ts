import { ElButton } from 'element-plus'
import { App } from 'vue'

const components = [
  ElButton
]

export default {
  install(app: App) {
    for (const component of components) app.use(component)
  }
}
