export function useSharedColorMode() {
  const colorMode = useColorMode()

  const isDarkPreferred = usePreferredDark()

  const cycleList = computed<SharedColorModeItemName[]>(() => [
    isDarkPreferred.value ? 'light' : 'dark',
    isDarkPreferred.value ? 'dark' : 'light',
    'auto',
  ])

  const { state, next } = useCycleList<SharedColorModeItemName>(cycleList, {
    initialValue: colorMode.preference as SharedColorModeItemName,
  })

  watchEffect(() => colorMode.preference = state.value)

  const isDark = computed(() => colorMode.preference === 'dark')

  return {
    state,
    toggle: next,
    isDark,
  }
}

type SharedColorModeItemName = 'light' | 'dark' | 'auto'
