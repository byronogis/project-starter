import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  // css: [
  //   join(currentDir, './assets/styles/index.css'),
  // ],

  imports: {
    dirs: [
      join(currentDir, './types'),
    ],
    imports: [
      { name: 'z', as: 'z', from: 'zod' },
      { name: 'toTypedSchema', from: '@vee-validate/zod' },
      { name: 'ComponentProps', from: 'vue-component-type-helpers', type: true },
      { name: 'ComponentExposed', from: 'vue-component-type-helpers', type: true },
    ],
  },

  modules: [
    // ...
    ['@vee-validate/nuxt', {
      componentNames: {
        Form: 'VeeForm',
        Field: 'VeeField',
        FieldArray: 'VeeFieldArray',
        ErrorMessage: 'VeeErrorMessage',
      },
    }],

    ['@hebilicious/vue-query-nuxt', {
      vueQueryPluginOptions: {
        enableDevtoolsV6Plugin: true,
      },
    }],
  ],
})