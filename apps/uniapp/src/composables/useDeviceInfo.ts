export const useDeviceInfo = createGlobalState(() => {
  //
  const deviceInfo = useStorage('device-info', uni.getSystemInfoSync(), uniStorage)

  function updateDeviceInfo() {
    deviceInfo.value = uni.getSystemInfoSync()
  }

  // 右上角胶囊
  const {
    top: capsuleTop,
    height: capsuleHeight,
  } = uni.getMenuButtonBoundingClientRect()

  /** 状态栏高度 */
  const statusBarHeight = computed(() => deviceInfo.value.statusBarHeight || 0)

  /** 导航栏高度 */
  const navBarHeight = computed(() => {
    return (capsuleTop - statusBarHeight.value) * 2 + capsuleHeight
  })

  /** 状态栏 + 导航栏高度 */
  const topBarHeight = computed(() => {
    return statusBarHeight.value + navBarHeight.value
  })
  const topBarHeightWithUnit = computed(() => {
    return `${topBarHeight.value}px`
  })

  return {
    deviceInfo: readonly(deviceInfo),
    updateDeviceInfo,

    statusBarHeight,
    navBarHeight,

    topBarHeight,
    topBarHeightWithUnit,
  }
})
