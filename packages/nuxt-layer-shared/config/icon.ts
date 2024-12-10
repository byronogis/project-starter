import type { NuxtOptions } from '@nuxt/schema'

export const icon: NuxtOptions['icon'] = {
  cssLayer: 'nuxt-icon',
  componentName: 'NuxtIcon',
  provider: 'server',
  clientBundle: {
    sizeLimitKb: 0,
  },
}
