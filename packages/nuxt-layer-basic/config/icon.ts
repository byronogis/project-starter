import type { NuxtOptions } from '@nuxt/schema'

export const icon: NuxtOptions['icon'] = {
  class: 'nuxt-icon',
  cssLayer: 'nuxt-icon',
  componentName: 'NuxtIcon',
  provider: 'server',
  clientBundle: {
    sizeLimitKb: 0,
  },
}
