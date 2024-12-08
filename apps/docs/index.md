---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Project Starter"
  text: "A project starter"
  # tagline: My great project tagline
  actions:
    - theme: brand
      text: Apps
      link: /apps
    - theme: alt
      text: Packages
      link: /packages

features:
  - title: Monorepo
    details: A monorepo project structure powered by pnpm workspaces.
    link: https://pnpm.io/workspaces
  - title: Turborepo
    details: Manage your monorepo with TurboRepo.
    link: https://turbo.build/repo/docs
  - title: UnoCSS
    details: A utility-first CSS framework for rapid UI development.
    link: /packages/unocss-config
  - title: ESLint
    details: A basic ESLint configuration that can be imported and used in the project.
    link: /packages/eslint-config
  - title: Typescript
    details: A basic TypeScript configuration that can be imported and used in the project.
    link: /packages/typescript-config
  - title: Primo
    details: A basic theme layer for nuxt.
    link: /packages/nuxt-layer-primo
---
