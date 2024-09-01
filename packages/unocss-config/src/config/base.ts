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
import type {
  defineConfig,
} from 'unocss'

export default function base(options?: Options): Parameters<typeof defineConfig>[0] {
  const {
    customIcons = true,
    customIconsDir = 'src/assets/icons/custom',
  } = options ?? {}

  return {
    presets: [
      presetUno(),
      presetIcons({
        scale: 1.2,
        autoInstall: true,
        collections: {
          custom: customIcons
            ? FileSystemIconLoader(
              `${resolve(cwd(), customIconsDir)}`,
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
   * @default true
   */
  customIcons?: boolean
  /**
   * Custom icons directory
   * @default
   * 'app/assets/icons/custom'
   */
  customIconsDir?: string
}
