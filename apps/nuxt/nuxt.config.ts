import { pwa } from './app/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // see https://nuxt.com/docs/getting-started/configuration#environment-overrides
  $production: {
    app: {
      head: {
        script: [
          /**
           * polyfill \
           * es2023, es2022, es2021, es2020, default \
           * @see https://cdnjs.cloudflare.com/polyfill/
           */
          {
            src: 'https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?version=4.8.0&features=es2023%2Ces2022%2Ces2021%2Ces2020%2Cdefault',
            defer: true,
          },
        ],
      },
    },
  },
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    layoutTransition: { name: 'fade', mode: 'out-in' },
  },

  /**
   * It will be merged with app.config file as default value.
   * @see https://nuxt.com/docs/getting-started/configuration#app-configuration
   */
  appConfig: {
    foo: 'bar',
  },

  css: [
    '~/assets/styles/index.css',
  ],

  debug: false,

  devServer: {
    // host: '0.0.0.0',
  },

  experimental: {
    viewTransition: !true,
    /**
     * '@vite-pwa/nuxt' related
     * when using generate, payload js assets included in sw(service-worker) precache manifest
     * but missing on offline, disabling extraction it until fixed
     */
    payloadExtraction: false,
    typedPages: true,
  },

  extends: [
    '@project-starter/nuxt-layer-primo',
  ],

  future: {
    compatibilityVersion: 4,
  },

  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './app/assets/icons/custom',
      },
    ],
  },

  imports: {
    dirs: [
      'api',
      'constants',
      'types',
    ],
    imports: [
      { name: '*', as: 'Utils', from: '@project-starter/shared' },
    ],
  },

  modules: [
    ['@pinia/nuxt', {
      storesDirs: ['./app/stores'],
    }],

    ['@vite-pwa/nuxt', pwa],

    ['@hebilicious/vue-query-nuxt', {
      vueQueryPluginOptions: {
        enableDevtoolsV6Plugin: true,
      },
    }],
  ],

  // ssr: false,
})
