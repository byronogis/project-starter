import type { NuxtOptions } from '@nuxt/schema'

/**
 * The Nuxt SEO module is simply an alias that combines all the other SEO modules into a single installation.
 * @see https://nuxtseo.com/
 * @see https://github.com/harlan-zw/nuxt-seo/blob/main/src/const.ts
 */
const nuxtseo: Exclude<NuxtOptions['nuxtseo'], false> = {
  enabled: true,
}

const robots: Partial<Exclude<NuxtOptions['robots'], false>> = {
  enabled: true,
}

const sitemap: Partial<Exclude<NuxtOptions['sitemap'], false>> = {
  enabled: true,
}

const ogImage: Partial<Exclude<NuxtOptions['ogImage'], false>> = {
  enabled: false,
  // zeroRuntime: true,
}

const schemaOrg: Partial<Exclude<NuxtOptions['schemaOrg'], false>> = {
  enabled: false,
}

const linkChecker: Partial<Exclude<NuxtOptions['linkChecker'], false>> = {
  enabled: true,
}

const site: Partial<Exclude<NuxtOptions['site'], false>> = {
  enabled: true,
}

/**
 *  seo utils
 */
const seo: Partial<Exclude<NuxtOptions['seo'], false>> = {
  enabled: false,
}

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
