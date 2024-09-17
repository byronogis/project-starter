import type {
  UserConfig,
} from 'unocss'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import {
  // defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default function base(options?: Options): UserConfig {
  const {
    customIcons = false,
  } = options ?? {}

  return {
    presets: [
      presetUno(),
      presetIcons({
        scale: 1.2,
        autoInstall: true,
        collections: {
          custom: typeof customIcons === 'string'
            ? FileSystemIconLoader(
              `${resolve(cwd(), customIcons)}`,
              (svg) => {
              // return svg.replace(/#fff/, 'currentColor')
                return svg
              },
            )
            : undefined,
        },
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'middle',
        },
      }),
      presetWebFonts({
        // https://fonts.bunny.net/
        provider: 'bunny',
        fonts: {
          sans: 'DM Sans',
          serif: 'DM Serif Display',
          mono: 'DM Mono',
        },
      }),

    ],
    transformers: [
      transformerVariantGroup(),
      transformerDirectives(),
    ],
    outputToCssLayers: {
      cssLayerName: layer => `uno-${layer}`,
    },
    safelist: [
      // ...
    ],

  }
}

interface Options {
  /**
   * Enable custom icons
   * @example 'app/assets/icons/custom'
   * @default false
   */
  customIcons?: false | string
}
