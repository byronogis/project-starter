/**
 * 禁止滚动
 *
 * 用于解决滑动穿透问题
 *
 *
 * 配合 App.vue 中的全局样式使用:
 *  page:has(.disable-scroll) {
      overflow: hidden;
    }
 */
const disableScroll = ref(false)
export function useDisableScroll(_options?: UseDisableScrollOptions) {
  const disableScrollClass = computed(() => disableScroll.value ? 'disable-scroll' : '')

  function switchDisableScroll(state: boolean) {
    disableScroll.value = state
  }

  return {
    disableScroll: readonly(disableScroll),
    disableScrollClass,
    switchDisableScroll,
  }
}

interface UseDisableScrollOptions {
  //
}
