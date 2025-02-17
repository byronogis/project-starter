import type { NuxtOptions } from '@nuxt/schema'
import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'
import { PrimoConfigDefaultCST } from '../app/constants/setting'
import { PrimoPrimaryColorListCST } from '../app/constants/theme'
import { sakakiThemePresetGenerator } from '../app/utils/theme'

const CustomPreset = definePreset(Aura, {
  // see https://primevue.org/theming/styled/#customization
  // ...
  ...sakakiThemePresetGenerator(PrimoPrimaryColorListCST.find(i => i.name === PrimoConfigDefaultCST.primary)!),
})

export const primevue: NuxtOptions['primevue'] = {
  options: {
    loadedStyleNames: ['common'],
    theme: {
      preset: CustomPreset,
      options: {
        cssLayer: {
          name: 'nuxt-layer-primo.primevue',
        },
        darkModeSelector: 'html.dark',
      },
    },
    ripple: true,

  },
  components: {
    prefix: 'Prime',
    exclude: [
      'Chart',
      'Editor',
      'Form',
      'FormField',
    ],
  },
}
