import { toogleAppearance } from '@project-starter/shared'

export function useSharedColorMode() {
  const colorMode = useColorMode()

  const isDarkPreferred = usePreferredDark()

  const cycleList = computed<SharedColorModeItemName[]>(() => [
    isDarkPreferred.value ? 'light' : 'dark',
    isDarkPreferred.value ? 'dark' : 'light',
    'system',
  ])

  const { state, index, next } = useCycleList<SharedColorModeItemName>(cycleList, {
    initialValue: colorMode.preference as SharedColorModeItemName,
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

type SharedColorModeItemName = 'light' | 'dark' | 'system'
