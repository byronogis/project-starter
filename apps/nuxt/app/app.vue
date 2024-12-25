<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

const globalToast = useGlobalToast()
provide(PrimoToastInjectionKey, globalToast)

useSeoMeta({
  title: appCST.title,
  description: appCST.description,
  ogTitle: appCST.title,
  ogDescription: appCST.description,
  ogImage: '/favicon.svg',
  ogUrl: appCST.url,
  twitterTitle: appCST.title,
  twitterDescription: appCST.description,
  twitterImage: '/favicon.svg',
  twitterCard: 'summary',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
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
       * 在此处定义 @layer, 保证顺序与期望一致
       */
      textContent: ['@layer', [
        'reset',
        'uno-preflights',
        'uno-shortcuts',
        'uno-typography',
        'nuxt-icon',

        'nuxt-layer-basic',
        'nuxt-layer-primo',

        'base',
        'transition',
        'uno-default',
      ].join(', '), ';'].join(' '),
    },
  ],
})
</script>

<template>
  <NuxtPwaManifest />
  <NuxtLayout class="font-sans">
    <NuxtPage />
  </NuxtLayout>

  <PrimeToast :group="PrimoToastGroupGlobalCST" />

  <VueQueryDevtools />
</template>
