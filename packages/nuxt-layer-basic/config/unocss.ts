import type { NuxtOptions } from '@nuxt/schema'

export const unocss: Exclude<NuxtOptions['unocss'], false> = {
  // ...
  nuxtLayers: true,
}
