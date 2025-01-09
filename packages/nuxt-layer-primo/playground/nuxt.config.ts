export default defineNuxtConfig({
  extends: [
    '../',
  ],

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
