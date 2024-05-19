import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'

export function install(app: App) {
  const router = createRouter({
    history: createWebHistory(),
    // the routes property is handled by the plugin
  })

  app.use(router)
}
