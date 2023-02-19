import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import AutoImport from 'unplugin-auto-import/vite'
import VueComponents from 'unplugin-vue-components/vite'
import {
  AntDesignVueResolver,
  ElementPlusResolver,
} from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages(),
    Layouts(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
      ],
      imports: [
        'vue',
        'vue-router',
      ],
      resolvers: [
        ElementPlusResolver(),
      ],
      dts: 'src/types/auto-imports.d.ts',
      dirs: ['src/composables/**'],
      vueTemplate: true,
    }),
    VueComponents({
      resolvers: [
        AntDesignVueResolver({ resolveIcons: true }),
        ElementPlusResolver(),
        IconsResolver({ prefix: 'i', enabledCollections: ['ep'] }),
      ],
      dts: 'src/types/vue-components.d.ts',
      dirs: ['src/components'],
    }),
    Icons(),
  ],
})
