import { StorageSerializers } from '@vueuse/core'

export const useUserStore = createGlobalState(() => {
  const user = useStorage<{
    name: string
  }>('user', {
    name: 'Byron',
  }, uniStorage, { serializer: StorageSerializers.object })

  const openId = useStorage<string>('openId', '', uniStorage)

  const isSessionStarting = ref(false)

  /**
   * 开始/刷新会话
   */
  async function startSession(): Promise<string> {
    if (isSessionStarting.value) {
      let offEventBus: (() => void) | undefined
      let timeoutId: number | undefined
      function cleanup() {
        offEventBus?.()
        clearTimeout(timeoutId)

        offEventBus = undefined
        timeoutId = undefined
      }

      console.time('[startSession] 等待 openId')

      return Promise.race<string>([
        new Promise((resolve) => {
          offEventBus = useEventBus<{ openId: string }>(GetOpenIdDoneEventBusKeyConst).once(({ openId }) => {
            console.timeEnd('[startSession] 等待 openId')
            cleanup()
            resolve(openId)
          })
        }),
        new Promise((resolve) => { // 超时处理, 避免因 openId 获取失败导致的堵塞
          timeoutId = setTimeout(() => {
            // cleanup() // 为了能够收到 '[startSession] 等待 openId' 的 timeEnd 日志, 此处暂不清理
            const openId = uni.getStorageSync('openId')
            console.warn('[startSession] 等待 openId 超时, 直接取值: ', openId)
            resolve(openId)
          }, 600)
        }),
      ])
    }

    isSessionStarting.value = true

    try {
      const { code } = await uni.login()

      // TODO Mock function, replace with actual API call
      const getOpenId = (opt: { code: string }) => http.request<BaseResult<{ openId: string }>, { code: string }>('/getOpenId', {
        data: opt,
        _checkOpenId: false, // 不检查 openId, 因为是获取 openId 的请求
      })

      const { data } = await getOpenId({ code })

      openId.value = data.openId
      useEventBus(GetOpenIdDoneEventBusKeyConst).emit({ openId: data.openId })

      return data.openId
    }
    catch (error: any) {
      console.error('获取 openId 失败', error)
      throw new Error(`获取 openId 失败: ${error.message || JSON.stringify(error)}`)
    }
    finally {
      isSessionStarting.value = false
    }
  }

  return {
    user,
    openId,
    startSession,
  }
})
