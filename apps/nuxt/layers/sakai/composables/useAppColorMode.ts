export function useAppColorMode() {
  const colorMode = useColorMode()

  const isDarkPreferred = usePreferredDark()

  const cycleList = computed<('light' | 'dark' | 'auto')[]>(() => [
    isDarkPreferred.value ? 'light' : 'dark',
    isDarkPreferred.value ? 'dark' : 'light',
    'auto',
  ])

  const { state, next } = useCycleList(cycleList, { initialValue: colorMode.preference })

  watchEffect(() => colorMode.preference = state.value)

  const isDark = computed(() => colorMode.preference === 'dark')

  return {
    state,
    toggle: next,
    isDark,
  }
}
