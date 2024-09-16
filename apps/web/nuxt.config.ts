import { pwa } from './app/config/pwa'
import { appDescription } from './app/constants/index'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
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

  compatibilityDate: '2024-08-14',

  css: [
    'uno:preflights.css',
    'uno.css',
    '~/assets/styles/index.css',
    'uno:default.css',
  ],

  debug: false,

  devServer: {
    host: '0.0.0.0',
  },

  devtools: {
    enabled: true,
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

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    ['@unocss/nuxt', {
      autoImport: false,
    }],

    ['@nuxtjs/color-mode', {
      classSuffix: '',
    }],

    ['@pinia/nuxt', {
      storesDirs: ['./app/stores'],
    }],

    ['@nuxt/eslint', {
      config: {
        standalone: false,
      },
    }],

    '@vueuse/nuxt',

    ['@vite-pwa/nuxt', pwa],
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
      'postcss-nesting': {},
    },
  },

  // ssr: false,

  telemetry: true,
})
