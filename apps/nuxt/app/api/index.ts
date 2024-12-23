import type { RequestConfig, Response } from '@project-starter/shared'
import { HTTP } from '@project-starter/shared'

/**
 * 初始化示例
 */
export const exampleHttp = new HTTP<BaseExampleHResult, ExampleExtraConfig>({
  baseURL: '/api',
})

exampleHttp.instance.interceptors.response.use((response: ExampleResonse) => {
  const _data = response.data as BaseExampleHResult
  const _skipCheck = response.config._skipResponseCheck
  if (!_skipCheck && _data.code !== 200) {
    return Promise.reject(new Error(_data.message ?? `[Example HTTP] Unknown Error: ${{ response }}`))
  }

  return Promise.resolve(response)
})

export interface BaseExampleHResult {
  code: number
  message?: string
  data?: any
}

interface ExampleExtraConfig {
  /**
   * 跳过响应检查
   */
  _skipResponseCheck?: boolean
}

export type ExampleResonse = Response<BaseExampleHResult, any, ExampleExtraConfig>
export type ExampleRequestConfig = RequestConfig<any, ExampleExtraConfig>

/**
 * 请求示例
 */
export function exampleAPI(data: ExampleData, extraConfig: ExampleRequestConfig = {}) {
  return exampleHttp.request<ExampleData, ExampleResult>({
    url: '/example',
    method: 'GET',
    data,
    ...extraConfig,
  })
}

interface ExampleData {
  // ...
}

interface ExampleResult extends BaseExampleHResult {
  // ...
}
