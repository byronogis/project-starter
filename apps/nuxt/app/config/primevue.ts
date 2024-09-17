import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

const CustomPreset = definePreset(Aura, {
  // see https://primevue.org/theming/styled/#customization
  // ...
})

export const primevue = {
  options: {
    theme: {
      preset: CustomPreset,
      options: {
        cssLayer: {
          name: 'primevue',
        },
        darkModeSelector: 'html.dark',
      },
    },
    ripple: true,

  },
  components: {
    prefix: 'Prime',
  },
}
