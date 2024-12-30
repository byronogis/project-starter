import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { colorMode, eslint, htmlInjectCommands, icon, unocss } from './config'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  css: [
    join(currentDir, './assets/styles/index.css'),
  ],

  /**
   * By default, Nuxt comes with the following plugins already pre-configured:
   * postcss-import: Improves the @import rule
   * postcss-url: Transforms url() statements
   * autoprefixer: Automatically adds vendor prefixes
   * cssnano: Minification and purge
   * @see https://nuxt.com/docs/getting-started/styling#using-postcss
   */
  postcss: {
    plugins: {
      /**
       * @see https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#options
       */
      'postcss-preset-env': {
        stage: 2,
        minimumVendorImplementations: 2,
        /**
         * TODO: \
         * Perhaps we could try implementing layer order rules in each CSS entry file.
         * @see https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-cascade-layers#how-it-works
         * @see https://browsersl.ist/#q=fully+supports+css-cascade-layers
         */
        browsers: 'fully supports css-cascade-layers',
      },
    },
  },

  imports: {
    dirs: [
      join(currentDir, './types'),
    ],
    imports: [
      { name: 'z', as: 'z', from: 'zod' },
      { name: 'ComponentProps', from: 'vue-component-type-helpers', type: true },
      { name: 'ComponentExposed', from: 'vue-component-type-helpers', type: true },
    ],
  },

  modules: [
    '@nuxt/devtools',
    ['@nuxt/eslint', eslint],
    ['@unocss/nuxt', unocss],
    ['@nuxtjs/color-mode', colorMode],
    ['@nuxt/icon', icon],
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    ['nuxt-html-inject-commands', htmlInjectCommands],
  ],

  compatibilityDate: '2024-08-14',

  telemetry: {
    enabled: false,
  },
})
