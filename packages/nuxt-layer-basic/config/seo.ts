import type { NuxtOptions } from '@nuxt/schema'

/**
 * The Nuxt SEO module is simply an alias that combines all the other SEO modules into a single installation.
 * @see https://nuxtseo.com/
 * @see https://github.com/harlan-zw/nuxt-seo/blob/main/src/const.ts
 */
const nuxtseo: NuxtOptions['nuxtseo'] = {
  enabled: true,
}

const robots: NuxtOptions['robots'] = {
  enabled: true,
} as NuxtOptions['robots']

const sitemap: NuxtOptions['sitemap'] = {
  enabled: true,
} as NuxtOptions['sitemap']

const ogImage: NuxtOptions['ogImage'] = {
  enabled: false,
  // zeroRuntime: true,
} as NuxtOptions['ogImage']

const schemaOrg: NuxtOptions['schemaOrg'] = {
  enabled: false,
} as NuxtOptions['schemaOrg']

const linkChecker: NuxtOptions['linkChecker'] = {
  enabled: true,
} as NuxtOptions['linkChecker']

const site: NuxtOptions['site'] = {
  enabled: true,
} as NuxtOptions['site']

/**
 *  seo utils
 */
const seo: NuxtOptions['seo'] = {
  enabled: false,
} as NuxtOptions['seo']

export const seoCombind = {
  nuxtseo,
  robots,
  sitemap,
  ogImage,
  schemaOrg,
  linkChecker,
  site,
  seo,
}
