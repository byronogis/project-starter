import type { Preset } from 'unocss'
import type { IconsOptions } from 'unocss/preset-icons'
import type { TypographyOptions } from 'unocss/preset-typography'
import type { WebFontsOptions } from 'unocss/preset-web-fonts'
import type { PresetWind4Options } from 'unocss/preset-wind4'
import {
  definePreset,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { merge } from '../../../merge'

export function getDefaultOptions(): Options {
  return {
    wind4: {},
    typography: {},
    webFonts: {
      fonts: {
        sans: 'Inter',
        mono: 'DM Mono',
        condensed: 'Roboto Condensed',
        wisper: 'Bad Script',
      },
    },
    icons: {
      scale: 1,
      autoInstall: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    },
  }
}

export default definePreset((userOptions?: Options) => {
  const {
    wind4,
    typography,
    webFonts,
    icons,
  } = merge(
    {},
    userOptions ?? {},
    getDefaultOptions(),
  )

  const presets: Preset[] = []

  if (wind4 !== false) {
    presets.push(presetWind4(wind4))
  }
  if (typography !== false) {
    presets.push(presetTypography(typography))
  }
  if (webFonts !== false) {
    presets.push(presetWebFonts(webFonts))
  }
  if (icons !== false) {
    presets.push(presetIcons(icons))
  }

  return {
    name: 'shared-preset-base',
    configResolved(config) {
      // 由于 preset 不支持修改 outputToCssLayers, 因此利用 configResolved 来修改
      if (!config.outputToCssLayers) {
        config.outputToCssLayers = {
          cssLayerName: layer => layer === 'default'
            ? 'uno-default'
            : layer.includes('uno')
              ? layer
              : `uno.${layer}`,
        }
      }
    },
    safelist: [
      // ...
    ],
    rules: [
      // ...
    // eslint-disable-next-line e18e/prefer-static-regex
      [/^grid-wrap-(.+)$/, ([, s]) => ({ 'grid-template-columns': `repeat(auto-fit, minmax(${s}, 1fr))` })],
    ],
    variants: [
      // ...
    ],
    transformers: [
      transformerVariantGroup(),
      transformerDirectives(),
    ],
    presets,
  }
})

interface Options {
  /**
   * Enable presetUno
   */
  wind4?: false | PresetWind4Options
  /**
   * Enable typography
   */
  typography?: false | TypographyOptions
  /**
   * Enable web fonts
   */
  webFonts?: false | WebFontsOptions
  /**
   * Enable icons
   */
  icons?: false | IconsOptions
}
