import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Project Starter',
  description: 'A project starter',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Apps',
        items: [
          { text: 'nuxt', link: '/apps/nuxt' },
        ],
      },
      {
        text: 'Packages',
        items: [
          { text: 'nuxt-layer-primo', link: '/packages/nuxt-layer-primo' },
          { text: 'nuxt-layer-basic', link: '/packages/nuxt-layer-basic' },
          { text: 'unocss-config', link: '/packages/unocss-config' },
          { text: 'eslint-config', link: '/packages/eslint-config' },
          { text: 'typescript-config', link: '/packages/typescript-config' },
          { text: 'shared', link: '/packages/shared' },
        ],
      },
    ],

    outline: {
      level: [2, 6],
    },

    sidebar: [
      {
        text: 'Apps',
        items: [
          { text: 'nuxt', link: '/apps/nuxt' },
        ],
      },
      {
        text: 'Packages',
        items: [
          { text: 'nuxt-layer-primo', link: '/packages/nuxt-layer-primo' },
          { text: 'nuxt-layer-basic', link: '/packages/nuxt-layer-basic' },
          { text: 'unocss-config', link: '/packages/unocss-config' },
          { text: 'eslint-config', link: '/packages/eslint-config' },
          { text: 'typescript-config', link: '/packages/typescript-config' },
          { text: 'shared', link: '/packages/shared' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/byronogis/pproject-starter' },
    ],

    editLink: {
      pattern: 'https://github.com/byronogis/project-starter/edit/main/apps/docs/:path',
    },
  },
})
