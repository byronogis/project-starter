import { dynamic } from './dynamic'

/**
 * Credit to [@hooray](https://github.com/hooray)
 * @see https://github.com/vuejs/vitepress/pull/2347
 */
export function toggle(event: MouseEvent, options: SharedAppearanceOptions & {
  /**
   * @default 'dynamic'
   */
  effect?: SharedAppearanceEffectBuiltIn | SharedAppearanceEffectCustom
}) {
  const {
    isDark,
    toggle,
    effect = 'dynamic',
  } = options

  const dict: Record<SharedAppearanceEffectBuiltIn, SharedAppearanceEffectCustom> = {
    dynamic,
  }

  if (typeof effect === 'string') {
    dict[effect](event, { isDark, toggle })
  }
  else {
    effect(event, { isDark, toggle })
  }
}

export interface SharedAppearanceOptions {
  isDark: boolean
  toggle: () => Promise<void> | void
}

type SharedAppearanceEffectCustom = (e: MouseEvent, opt: SharedAppearanceOptions) => void

type SharedAppearanceEffectBuiltIn = 'dynamic'
