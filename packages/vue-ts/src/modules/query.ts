import type { App } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

export function install(app: App) {
  app.use(VueQueryPlugin)
}
