import { resolve } from 'node:path'
import { defineConfig } from 'vite'
// https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#options
import vue from '@vitejs/plugin-vue'
// https://unocss.dev/integrations/vite
import UnoCSS from 'unocss/vite'
// https://github.com/unplugin/unplugin-auto-import?tab=readme-ov-file#configuration
import AutoImport from 'unplugin-auto-import/vite'
// https://github.com/unplugin/unplugin-vue-components?tab=readme-ov-file#configuration
import Components from 'unplugin-vue-components/vite'
// https://uvr.esm.is/guide/configuration.html
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
// https://devtools-next.vuejs.org/guide/vite-plugin
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    //
    minify: false,
    sourcemap: true,
    rollupOptions: {
      external: [
        //
      ],
    },
  },
  server: {
    host: true,
    proxy: {
      '/api': {
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
      // 直接指向 packages/shared/src 目录, 以便即时更新
      '@project-starter/shared': `${resolve(__dirname, '../shared/src')}`,
    },
  },
  plugins: [
    VueRouter({
      dts: './src/types/typed-router.d.ts',
    }),
    vue(),
    UnoCSS(),
    AutoImport({
      dts: './src/types/auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/stores',
      ],
      imports: [
        /**
         * presets
         * @see https://github.com/unplugin/unplugin-auto-import/blob/main/src/presets/index.ts
         * @see https://github.com/unjs/unimport/blob/main/src/presets/index.ts
         */
        'vue',
        '@vueuse/core',

        VueRouterAutoImports,
      ],
      vueTemplate: true,
    }),
    Components({
      dts: './src/types/components.d.ts',
    }),
    VueDevTools(),
  ],
  esbuild: {
    pure: [
      'console.log',
    ],
    // drop: ['console'],
  },
})
