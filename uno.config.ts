import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      autoInstall: true,
      collections: {
        custom: FileSystemIconLoader(
          // place your custom icons in `src/assets/icons/custom`,
          // eg: `packages/vue-ts/src/assets/icons/custom` for `./packages/vue-ts` (cwd(): /path/to/packages/vue-ts)
          `${resolve(cwd(), 'src/assets/icons/custom')}`,
          svg => svg.replace(/#fff/, 'currentColor'),
        ),
      },
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),

  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
