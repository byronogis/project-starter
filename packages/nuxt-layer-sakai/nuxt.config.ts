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

  modules: [
    ['@primevue/nuxt-module', primevue],
  ],

  imports: {
    dirs: [
      join(currentDir, './types'),
      join(currentDir, './stores'),
    ],
    imports: [
      { name: '*', as: 'Utils', from: '@project-starter/shared/utils' },
    ],
  },

  compatibilityDate: '2024-08-14',
})
