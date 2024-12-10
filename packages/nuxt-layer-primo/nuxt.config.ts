import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { primevue } from './config/primevue'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  extends: [
    '@project-starter/nuxt-layer-shared',
  ],

  css: [
    join(currentDir, './assets/styles/index.css'),
  ],

  imports: {
    dirs: [
      join(currentDir, './types'),
      join(currentDir, './stores'),
      join(currentDir, './constants'),
    ],
    imports: [
      { name: 'toTypedSchema', from: '@vee-validate/zod' },
      { name: '*', as: 'Utils', from: '@project-starter/shared/utils' },
    ],
  },

  modules: [
    ['@primevue/nuxt-module', primevue],

    ['@vee-validate/nuxt', {
      componentNames: {
        Form: 'VeeForm',
        Field: 'VeeField',
        FieldArray: 'VeeFieldArray',
        ErrorMessage: 'VeeErrorMessage',
      },
    }],
  ],
})
