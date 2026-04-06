import type { NuxtOptions } from '@nuxt/schema'

export const colorMode: Partial<Exclude<NuxtOptions['colorMode'], false>> = {
  classSuffix: '',
  storage: 'cookie',
  storageKey: 'nuxt-color-mode',
}
