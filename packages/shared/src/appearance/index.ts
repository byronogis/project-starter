import { dynamic } from './dynamic'

/**
 * Credit to [@hooray](https://github.com/hooray)
 * @see https://github.com/vuejs/vitepress/pull/2347
 */
export function toogle(event: MouseEvent, options: SharedAppearanceOptions & {
  /**
   * @default 'dynamic'
   */
  effect?: SharedAppearanceEffectBuiltIn | SharedAppearanceEffectCustom
}) {
  const {
    isDark,
    toogle,
    effect = 'dynamic',
  } = options

  const dict: Record<SharedAppearanceEffectBuiltIn, SharedAppearanceEffectCustom> = {
    dynamic,
  }

  if (typeof effect === 'string') {
    dict[effect](event, { isDark, toogle })
  }
  else {
    effect(event, { isDark, toogle })
  }
}

export interface SharedAppearanceOptions {
  isDark: boolean
  toogle: () => Promise<void> | void
}

type SharedAppearanceEffectCustom = (e: MouseEvent, opt: SharedAppearanceOptions) => void

type SharedAppearanceEffectBuiltIn = 'dynamic'
