import type { NuxtOptions } from '@nuxt/schema'

export const icon: Exclude<NuxtOptions['icon'], false> = {
  class: 'nuxt-icon',
  cssLayer: 'nuxt-icon',
  componentName: 'NuxtIcon',
  provider: 'server',
  clientBundle: {
    sizeLimitKb: 0,
  },
}
