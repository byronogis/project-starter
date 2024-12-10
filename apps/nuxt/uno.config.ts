import { primoPreset } from '@project-starter/nuxt-layer-primo/unocss'
import { base } from '@project-starter/unocss-config'
import { defu } from 'defu'
import {
  defineConfig,
} from 'unocss'

export default defineConfig(defu(
  {
    presets: [
      primoPreset(),
    ],
  },
  base({
    icons: false,
    // iconCustomCollection: 'app/assets/icons/custom',
  }),
))
