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
  },
})
