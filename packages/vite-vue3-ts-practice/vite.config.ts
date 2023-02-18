import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import AutoImport from 'unplugin-auto-import/vite'
import VueComponents from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
      dts: 'src/types/auto-imports.d.ts',
      dirs: [],
      vueTemplate: true,
    }),
    VueComponents({
      dts: 'src/types/vue-components.d.ts',
      dirs: ['src/components'],
    }),
  ],
})
