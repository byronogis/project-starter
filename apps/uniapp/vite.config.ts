import { resolve } from 'node:path'
import { cwd } from 'node:process'
import Uni from '@dcloudio/vite-plugin-uni'
import { isH5, isMp } from '@uni-helper/uni-env'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import postcssPresetEnv from 'postcss-preset-env'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import legacy from 'vite-plugin-legacy-swc'
import { uniPolyfill } from './plugins/uni-polyfill'

// https://vitejs.dev/config/
export default async () => {
  const UnoCSS = (await import('unocss/vite')).default

  return defineConfig({
    plugins: [
      // https://github.com/uni-helper/vite-plugin-uni-manifest
      UniHelperManifest(),
      // https://github.com/uni-helper/vite-plugin-uni-pages
      UniHelperPages({
        dts: 'src/types/uni-pages.d.ts',
      }),
      // https://github.com/uni-helper/vite-plugin-uni-layouts
      UniHelperLayouts(),
      // https://github.com/uni-helper/vite-plugin-uni-components
      UniHelperComponents({
        dts: 'src/types/components.d.ts',
        directoryAsNamespace: true,
        resolvers: [WotResolver()],
      }),
      Uni(),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: ['vue', '@vueuse/core', 'uni-app'],
        dts: 'src/types/auto-imports.d.ts',
        dirs: ['src/composables', 'src/stores', 'src/utils', 'src/api'],
        vueTemplate: true,
      }),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      UnoCSS(),
      isMp ? uniPolyfill() : null,
      isH5 ? legacy() : null,
    ],
    resolve: {
      alias: {
        '~': resolve(cwd(), 'src'),
      },
    },
    /**
     * 兼容性
     * @see https://vitesse-docs.netlify.app/getting-started/deployment#%E5%85%BC%E5%AE%B9%E6%80%A7
     */
    build: {
      target: 'es6',
      cssTarget: 'es6',
    },
    css: {
      postcss: {
        plugins: [
          postcssPresetEnv({
            browsers: ['chrome>=53', 'ios>=10'],
          }),
        ],
      },
    },
  })
}
