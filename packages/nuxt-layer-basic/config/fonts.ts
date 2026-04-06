import type { NuxtOptions } from '@nuxt/schema'

type FontInfoValue = NonNullable<Exclude<NuxtOptions['fonts'], false>['families']>[number]

export const fontInfo: Record<'sans' | 'serif' | 'mono', FontInfoValue> = {
  sans: { name: 'DM Sans' },
  serif: { name: 'DM Serif Display' },
  mono: { name: 'DM Mono' },
}

export const fonts: Exclude<NuxtOptions['fonts'], false> = {
  families: Object.values(fontInfo).map(info => info),
  assets: {},
}
