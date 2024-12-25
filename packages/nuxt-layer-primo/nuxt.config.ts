import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { primevue, veeValidate } from './config'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  extends: [
    '@project-starter/nuxt-layer-basic',
  ],

  css: [
    join(currentDir, './assets/styles/index.css'),
  ],

  icon: {
    customCollections: [
      {
        prefix: 'primo',
        dir: join(currentDir, './assets/icons/primo'),
      },
    ],
  },

  imports: {
    dirs: [
      join(currentDir, './types'),
      join(currentDir, './stores'),
      join(currentDir, './constants'),
    ],
    imports: [
      { name: 'toTypedSchema', from: '@vee-validate/zod' },
      { name: '*', as: 'Utils', from: '@project-starter/shared' },
    ],
  },

  modules: [
    ['@primevue/nuxt-module', primevue],

    ['@vee-validate/nuxt', veeValidate],
  ],
})
