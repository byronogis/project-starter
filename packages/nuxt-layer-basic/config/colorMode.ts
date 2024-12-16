import type { NuxtOptions } from '@nuxt/schema'

export const colorMode: Partial<NuxtOptions['colorMode']> = {
  classSuffix: '',
  storage: 'cookie',
  storageKey: 'nuxt-color-mode',
}
