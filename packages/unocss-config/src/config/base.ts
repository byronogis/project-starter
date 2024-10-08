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
    webFonts = true,
    icons = true,
    iconCustomCollection = false,
  } = options ?? {}

  const presets = [
    presetUno(),
  ]

  icons && presets.push(presetIcons({
    scale: 1,
    autoInstall: true,
    collections: {
      custom: typeof iconCustomCollection === 'string'
        ? FileSystemIconLoader(
          `${resolve(cwd(), iconCustomCollection)}`,
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
  }))

  webFonts && presets.push(presetWebFonts({
    // https://fonts.bunny.net/
    provider: 'bunny',
    fonts: {
      sans: 'DM Sans',
      serif: 'DM Serif Display',
      mono: 'DM Mono',
    },
  }))

  return {
    presets,
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
   * Enable web fonts
   * @default true
   */
  webFonts?: boolean
  /**
   * Enable icons
   * @default true
   */
  icons?: boolean
  /**
   * Enable custom icons
   * @example 'app/assets/icons/custom'
   * @default false
   */
  iconCustomCollection?: false | string
}
