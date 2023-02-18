import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import AutoImport from 'unplugin-auto-import/vite'
import VueComponents from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages(),
    Layouts(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
      resolvers: [
        ElementPlusResolver(),
      ],
      dts: 'src/types/auto-imports.d.ts',
      dirs: [],
      vueTemplate: true,
    }),
    VueComponents({
      resolvers: [
        ElementPlusResolver(),
      ],
      dts: 'src/types/vue-components.d.ts',
      dirs: ['src/components'],
    }),
  ],
})
