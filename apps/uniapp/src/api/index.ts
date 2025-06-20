import type { UnConfig, UnResponse } from '@uni-helper/uni-network'
import { un } from '@uni-helper/uni-network'

export const http = un.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

http.interceptors.response.use((response: UnResponse) => {
  const _data = response.data as BaseResult
  const _skipCheck = response.config?._skipResponseCheck
  if (!_skipCheck && _data.code !== 200) {
    return Promise.reject(new Error(_data.message ?? `[HTTP] Unknown Error: ${{ response }}`))
  }

  return Promise.resolve(response)
})

export interface BaseResult {
  code: number
  message?: string
  data?: any
}

interface ExtraRequestConfig {
  /**
   * 跳过响应检查
   */
  _skipResponseCheck?: boolean
}

export type RequestConfig<R = any, T = any> = UnConfig<R, T> & ExtraRequestConfig

/**
 * 请求示例
 * // exampleAPI({
   //   id: '1'
   // }).then(res => {
   //   return res.data?.data.list
   // })
 */
export function exampleAPI(data: ExampleData, extraConfig: RequestConfig = {}) {
  return http.request<ExampleResult, ExampleData>({
    url: '/example',
    method: 'GET',
    data,
    ...extraConfig,
  })
}

interface ExampleData {
  // ...
  id: string
}

interface ExampleResult extends BaseResult {
  data: {
    list: string[]
  }
}
