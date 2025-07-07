import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import '~/assets/styles/main.css'

/** #ifdef MP */
// 只有构建小程序时手动注入 Polyfills
// 可以按实际情况调整
// import 'core-js/actual/array/at'
// ❌ 不要像下面这样做，会占用大量小程序体积且没有必要
// import 'core-js/actual'
/** #endif */

export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
