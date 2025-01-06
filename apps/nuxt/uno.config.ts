import { base } from '@project-starter/unocss-config'
import { mergeConfigs } from 'unocss'
import config from './.nuxt/uno.config.mjs'

export default mergeConfigs([
  config,
  base(
    {
      icons: false,
    },
  ) as any,
])
