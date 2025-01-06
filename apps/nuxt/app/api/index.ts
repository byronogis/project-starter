import type {
  RequestConfig as _RequestConfig,
  Response as _Response,
} from '@project-starter/shared/http/index'
import { HTTP } from '@project-starter/shared/http/index'

export const http = new HTTP<BaseResult, ExtraConfig>({
  baseURL: '/api',
})

http.instance.interceptors.response.use((response: Response) => {
  const _data = response.data as BaseResult
  const _skipCheck = response.config._skipResponseCheck
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

interface ExtraConfig {
  /**
   * 跳过响应检查
   */
  _skipResponseCheck?: boolean
}

export type Response = _Response<BaseResult, any, ExtraConfig>
export type RequestConfig = _RequestConfig<any, ExtraConfig>

/**
 * 请求示例
 */
export function exampleAPI(data: ExampleData, extraConfig: RequestConfig = {}) {
  return http.request<ExampleData, ExampleResult>({
    url: '/example',
    method: 'GET',
    data,
    ...extraConfig,
  })
}

interface ExampleData {
  // ...
}

interface ExampleResult extends BaseResult {
  // ...
}
