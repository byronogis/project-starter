import type { ModuleOptions } from '@vite-pwa/nuxt'
import process from 'node:process'
import { appCST } from '../constants/app'

const sw = process.env.VITE_PLUGIN_PWA === 'true'

const scope = '/'

export const pwa: ModuleOptions = {
  strategies: sw ? 'injectManifest' : 'generateSW',
  srcDir: sw ? 'service-worker' : undefined,
  filename: sw ? 'sw.ts' : undefined,
  registerType: 'autoUpdate',
  scope,
  base: scope,
  manifest: {
    id: scope,
    scope,
    name: appCST.name,
    short_name: appCST.name,
    description: appCST.description,
    theme_color: appCST.themeColor,
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'maskable-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,txt,png,ico,svg}'],
    navigateFallbackDenylist: [/^\/api\//],
    navigateFallback: '/',
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts.googleapis.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts.gstatic.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  injectManifest: {
    globPatterns: ['**/*.{js,css,html,txt,png,ico,svg}'],
  },
  registerWebManifestInRouteRules: true,
  writePlugin: true,
  devOptions: {
    enabled: sw,
    suppressWarnings: true,
    navigateFallback: scope,
    type: 'module',
  },
}
