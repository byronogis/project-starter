import type { MergeOptions } from '@project-starter/shared'
import type { UserConfig } from 'unocss'
import type { IconsOptions } from 'unocss/preset-icons'
import type { TypographyOptions } from 'unocss/preset-typography'
import type { PresetUnoOptions } from 'unocss/preset-uno'
import type { WebFontsOptions } from 'unocss/preset-web-fonts'
import { merge } from '@project-starter/shared'
import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
// import { resolve } from 'node:path'
// import { cwd } from 'node:process'
// import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

/**
 * Base configuration for UnoCSS
 * @param options
 * @param configs
 * **Leftmost** arguments have more priority when assigning defaults.
 * @returns
 * The merged configuration
 */
export function base(options?: BaseOptions, ...configs: UserConfig[]): UserConfig {
  const {
    uno = {},
    typography = {},
    webFonts = {
      // https://fonts.bunny.net/
      provider: 'bunny',
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    },
    icons = {
      scale: 1,
      autoInstall: true,
      // collections: {
      //   custom: FileSystemIconLoader(
      //     `${resolve(cwd(), iconCustomCollection)}`,
      //     (svg) => {
      //       // return svg.replace(/#fff/, 'currentColor')
      //       return svg
      //     },
      //   ),
      // },
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    },
    mergeOptions = {},
  } = options ?? {}

  const presets = []

  uno && presets.push(presetUno(uno))
  icons && presets.push(presetIcons(icons))
  webFonts && presets.push(presetWebFonts(webFonts))
  typography && presets.push(presetTypography(typography))

  const baseConfig: UserConfig = {
    presets,
    transformers: [
      transformerVariantGroup(),
      transformerDirectives(),
    ],
    outputToCssLayers: {
      cssLayerName: layer => layer === 'default'
        ? 'uno-default'
        : layer.includes('uno')
          ? layer
          : `uno.${layer}`,
    },
    safelist: [
      // ...
    ],
    rules: [
      [/^grid-wrap-(.+)$/, ([, s]) => ({ 'grid-template-columns': `repeat(auto-fit, minmax(${s}, 1fr))` })],
    ],
  }

  configs.push(baseConfig)

  return defineConfig(merge(
    mergeOptions,
    ...configs,
  ))
}

interface BaseOptions {
  /**
   * Enable presetUno
   * @default {}
   */
  uno?: false | PresetUnoOptions
  /**
   * Enable typography
   * @default {}
   */
  typography?: false | TypographyOptions
  /**
   * Enable web fonts
   * @default
     {
        // https://fonts.bunny.net/
        provider: 'bunny',
        fonts: {
          sans: 'DM Sans',
          serif: 'DM Serif Display',
          mono: 'DM Mono',
        },
      }
   */
  webFonts?: false | WebFontsOptions
  /**
   * Enable icons
   * @default
    {
      scale: 1,
      autoInstall: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }
   */
  icons?: false | IconsOptions
  mergeOptions?: MergeOptions
}
