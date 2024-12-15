import { withBase } from '@project-starter/unocss-config'
import { mergeConfigs } from 'unocss'
import config from './.nuxt/uno.config.mjs'

export default mergeConfigs([
  config,
  withBase(
    {
      icons: false,
    // iconCustomCollection: 'app/assets/icons/custom',
    },
  ) as any,
])
