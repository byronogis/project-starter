import { appearance } from '@project-starter/shared'

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
