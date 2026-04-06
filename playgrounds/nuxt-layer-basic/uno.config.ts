import base from '@project-starter/shared/config/unocss/presets/base'
import { mergeConfigs } from 'unocss'
import config from './.nuxt/uno.config.mjs'

export default mergeConfigs([
  config,
  {
    presets: [
      base({
        webFonts: false,
        icons: false,
      }),
    ],
  } as any,
])
