import { appearance } from '@project-starter/shared'

/**
 * Manages color mode cycling with system preference
 *
 * - Respects system preference for initial dark/light ordering
 * - Handles cycling between modes with transition animations
 * - Prevents unnecessary transitions when next state matches current appearance
 *
 * @lang {zh-CN} \
 * 管理颜色模式切换，支持系统偏好设置
 *
 * - 遵循系统偏好设置进行初始深色/浅色排序
 * - 处理模式切换时的过渡动画
 * - 当下一个状态与当前外观相匹配时避免不必要的过渡
 */
export function useBasicColorMode() {
  const colorMode = useColorMode()

  const isDarkPreferred = usePreferredDark()

  const _initialPerference = colorMode.preference as BasicColorModeItemName

  const _cycleListDict: Record<BasicColorModeItemName, BasicColorModeItemName[]> = {
    system: ['system', ...(isDarkPreferred.value ? ['light', 'dark'] : ['dark', 'light']) as BasicColorModeItemName[]],
    light: ['light', 'dark', 'system'],
    dark: ['dark', 'light', 'system'],
  }

  const cycleList = _cycleListDict[_initialPerference]

  const { state, index, next } = useCycleList<BasicColorModeItemName>(cycleList, {
    initialValue: _initialPerference,
  })

  watchEffect(() => colorMode.preference = state.value)

  const isDark = computed(() => colorMode.value === 'dark')

  const toggle = (event: MouseEvent) => {
    const _currentValue = colorMode.preference === 'system'
      ? isDarkPreferred.value ? 'dark' : 'light'
      : colorMode.preference

    const _nextMode = cycleList[(index.value + 1) % cycleList.length]
    const _nextValue = _nextMode === 'system'
      ? isDarkPreferred.value ? 'dark' : 'light'
      : _nextMode

    if (_currentValue === _nextValue) {
      next()
      return
    }

    appearance.toogle(event, {
      isDark: !isDark.value,
      toogle: async () => {
        next()
        await nextTick()
      },
    })
  }

  return {
    state,
    toggle,
    isDark,
  }
}

type BasicColorModeItemName = 'light' | 'dark' | 'system'
