import type { NuxtOptions } from '@nuxt/schema'

type FontInfoValue = NonNullable<NuxtOptions['fonts']['families']>[number]

export const fontInfo: Record<'sans' | 'serif' | 'mono', FontInfoValue> = {
  sans: { name: 'DM Sans' },
  serif: { name: 'DM Serif Display' },
  mono: { name: 'DM Mono' },
}

export const fonts: NuxtOptions['fonts'] = {
  families: Object.values(fontInfo).map(info => info),
  assets: {},
}
