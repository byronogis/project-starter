import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'
import { SakaiPrimaryColorListCST } from '../constants/config'
import { sakakiThemePresetGenerator } from '../utils/theme'

const CustomPreset = definePreset(Aura, {
  // see https://primevue.org/theming/styled/#customization
  // ...
  ...sakakiThemePresetGenerator(SakaiPrimaryColorListCST.find(i => i.name === 'sky')!),
})

export const primevue = {
  options: {
    theme: {
      preset: CustomPreset,
      options: {
        cssLayer: {
          name: 'nuxt-layer-sakai_primevue',
        },
        darkModeSelector: 'html.dark',
      },
    },
    ripple: true,

  },
  components: {
    // @see https://github.com/primefaces/primevue/issues/6007
    // prefix: 'Prime',
  },
}
