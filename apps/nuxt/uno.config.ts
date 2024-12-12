import { primoPreset } from '@project-starter/nuxt-layer-primo/unocss'
import { withBase } from '@project-starter/unocss-config'

export default withBase(
  {
    icons: false,
    // iconCustomCollection: 'app/assets/icons/custom',
  },
  {
    presets: [
      primoPreset(),
    ],
  },
)
