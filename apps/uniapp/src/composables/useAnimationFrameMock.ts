export function useAnimationFrameMock(options: UseAnimationFrameOptions = {}) {
  /** 由小程序的 canvas 组件驱动模拟的动画帧执行 */
  const api: AnimationFrameMock = {
    requestAnimationFrame: (cb, reqOptions) => {
      const {
        retry = Infinity,
        retryDelay = 200,
      } = { ...options, ...(reqOptions ?? {}) }

      const _window = uni._animationFrameMock
      if (!_window) {
        if (retry > 0) {
          console.info('useAnimationFrameMock: requestAnimationFrame retry', retry)

          setTimeout(() => {
            api.requestAnimationFrame(cb, { ...reqOptions, retry: retry - 1 })
          }, retryDelay)
        }
        return
      }
      return _window.requestAnimationFrame(cb)
    },
    cancelAnimationFrame: (handle) => {
      const _window = uni._animationFrameMock
      if (!_window) {
        return
      }
      _window.cancelAnimationFrame(handle)
    },
  }

  return {
    api,
  }
}

export interface UseAnimationFrameOptions extends AnimationFrameMockOptions {
  // /**
  //  * 在小程序平台中, 需要依靠 canvas 以实现 requestAnimationFrame 的功能
  //  */
  // window?: MaybeRefOrGetter<AnimationFrameMock>
}

/**
 * 由小程序的 canvas 组件驱动模拟的动画帧执行
 *
 * 在小程序中模拟浏览器的 requestAnimationFrame 和 cancelAnimationFrame 方法
 */
export interface AnimationFrameMock {
  requestAnimationFrame: (callback: FrameRequestCallback, options?: AnimationFrameMockOptions) => number | void
  cancelAnimationFrame: (handle: number) => void
}

export interface AnimationFrameMockOptions {
  /**
   * 重试次数
   *
   * uniapp 中的组件生命周期钩子顺序比较紊乱, 与正版 Vue 不同 (如父子组件的 onMounted 顺序)
   *
   * 在使用 canvas 的 requestAnimationFrame 能力时, 需要在 onMounted 中调用 selectQuery,
   * 此时为了确保布局(初始化了 AnimationFrameMock 组件)下的子组件能够正常使用模拟的 api,
   * 加入重试机制.
   *
   * @default Infinity
   */
  retry?: number
  /**
   * 重试延迟 ms
   * @default 200
   */
  retryDelay?: number
}
