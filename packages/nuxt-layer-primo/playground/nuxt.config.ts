import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: [
    '../',
  ],

  unocss: {
    configFile: resolve('../uno.config.ts'),
  },

  app: {
    head: {
      style: [
        {
          textContent: ['@layer', [
            'reset',
            'uno',
            'nuxt-icon',

            'nuxt-layer-basic',
            'nuxt-layer-primo',

            'uno-default',
          ].join(', '), ';'].join(' '),
          tagPriority: 1,
        },
      ],
    },
  },

  future: {
    compatibilityVersion: 4,
  },
})
