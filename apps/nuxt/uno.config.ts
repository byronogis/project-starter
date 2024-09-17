import { base } from '@project-starter/unocss-config'
import { defu } from 'defu'
import {
  defineConfig,
} from 'unocss'
import { primevueSakaiPresetOfUnocss } from './layers/sakai/config/primevue'

export default defineConfig(defu(
  {
    presets: [
      primevueSakaiPresetOfUnocss(),
    ],
  },
  base({
    // customIcons: 'app/assets/icons/custom',
  }),
))
