import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  css: [
    join(currentDir, './assets/styles/index.css'),
  ],

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
    ['@nuxtjs/color-mode', {
      classSuffix: '',
    }],

    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
  ],

  compatibilityDate: '2024-08-14',

  // @ts-expect-error type error
  telemetry: true,
})
