import { sakaiPreset } from '@project-starter/nuxt-layer-sakai/unocss'
import { base } from '@project-starter/unocss-config'
import { defu } from 'defu'
import {
  defineConfig,
} from 'unocss'

export default defineConfig(defu(
  {
    presets: [
      sakaiPreset(),
    ],
  },
  base({
    // customIcons: 'app/assets/icons/custom',
  }),
))
