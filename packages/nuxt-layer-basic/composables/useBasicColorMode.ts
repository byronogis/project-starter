import { toogleAppearance } from '@project-starter/shared'

export function useBasicColorMode() {
  const colorMode = useColorMode()

  const isDarkPreferred = usePreferredDark()

  const cycleList = computed<BasicColorModeItemName[]>(() => [
    isDarkPreferred.value ? 'light' : 'dark',
    isDarkPreferred.value ? 'dark' : 'light',
    'system',
  ])

  const { state, index, next } = useCycleList<BasicColorModeItemName>(cycleList, {
    initialValue: colorMode.preference as BasicColorModeItemName,
  })

  watchEffect(() => colorMode.preference = state.value)

  const isDark = computed(() => colorMode.value === 'dark')

  const toggle = (event: MouseEvent) => {
    const _currentValue = colorMode.preference === 'system'
      ? isDarkPreferred.value ? 'dark' : 'light'
      : colorMode.preference

    const _nextMode = cycleList.value[(index.value + 1) % cycleList.value.length]
    const _nextValue = _nextMode === 'system'
      ? isDarkPreferred.value ? 'dark' : 'light'
      : _nextMode

    if (_currentValue === _nextValue) {
      next()
      return
    }

    toogleAppearance(event, {
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
