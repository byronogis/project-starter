import { pwa } from './app/config'
import { appCST } from './app/constants/app'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    head: {
      title: appCST.title,
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover' },
        { name: 'description', content: appCST.description },
        { name: 'keywords', content: appCST.keywords },
        { name: 'author', content: appCST.author },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-title', content: appCST.name },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
      style: [
        {
          /**
           * 在此处定义 @layer, 保证顺序完全与期望一致
           * @see ./app/assets/styles/index.css
           */
          textContent: ['@layer', [
            'uno-preflights',
            'uno-shortcuts',
            'uno-icons',
            'nuxt-icon',
            'reset',

            // @project-starter/nuxt-layer-primo
            'nuxt-layer-primo-primevue',
            'uno-nuxt-layer-primo-unocss',
            'nuxt-layer-primo-layout',

            'base',
            'transition',
            'uno-default',
          ].join(', '), ';'].join(' '),
        },
      ],
    },
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
    viewTransition: true,
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
      { name: '*', as: 'Utils', from: '@project-starter/shared/utils' },
    ],
  },

  modules: [
    ['@pinia/nuxt', {
      storesDirs: ['./app/stores'],
    }],

    ['@nuxt/eslint', {
      config: {
        standalone: false,
      },
    }],

    ['@unocss/nuxt', {
      // ...
    }],

    ['@vite-pwa/nuxt', pwa],

    ['@hebilicious/vue-query-nuxt', {
      vueQueryPluginOptions: {
        enableDevtoolsV6Plugin: true,
      },
    }],
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
      'postcss-mixins': {},
      'postcss-nesting': {},
    },
  },

  // ssr: false,
})
