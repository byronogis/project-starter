import base from '@project-starter/shared/config/unocss/presets/base'
import { mergeConfigs } from 'unocss'
import config from './.nuxt/uno.config.mjs'

export default mergeConfigs([
  config,
  base(
    {
      icons: false,
      webFonts: false,
    },
  ),
])
