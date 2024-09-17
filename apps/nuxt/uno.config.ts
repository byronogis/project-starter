import { base } from '@project-starter/unocss-config'
import { defu } from 'defu'
import {
  defineConfig,
} from 'unocss'
import { primevueSakaiPresetOfUnocss } from './app/config/primevue'

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
