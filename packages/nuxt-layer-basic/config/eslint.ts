import type { NuxtOptions } from '@nuxt/schema'

export const eslint: Exclude<NuxtOptions['eslint'], false> = {
  config: {
    standalone: false,
  },
}
