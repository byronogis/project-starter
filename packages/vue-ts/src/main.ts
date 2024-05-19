import { createApp } from 'vue'
import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
import '~/assets/style/base.css'

import App from './App.vue'

const app = createApp(App)

const modules = import.meta.glob<{ install: (ctx: typeof app) => void }>('./modules/*.ts', { eager: true })
Object.values(modules).forEach(i => app.use(i))

app.mount('#app')
