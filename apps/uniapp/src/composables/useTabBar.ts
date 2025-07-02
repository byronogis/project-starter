/**
 * 由于 addInterceptor 的 showTabBar/hideTabBar 无效, 因此手动封装, 以此更新正确的设备信息(窗口高度)
 */
export function useTabBar() {
  const { updateDeviceInfo } = useDeviceInfo()

  function hide() {
    uni.hideTabBar({
      animation: false,
      success() {
        updateDeviceInfo()
      },
    })
  }

  function show() {
    uni.showTabBar({
      animation: false,
      success() {
        updateDeviceInfo()
      },
    })
  }

  //
  return {
    hide,
    show,
  }
}
