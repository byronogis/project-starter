import type { UnConfig, UnResponse } from '@uni-helper/uni-network'
import { un } from '@uni-helper/uni-network'

const _http = un.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  _directResponse: true, // 默认直接返回响应数据
})

_http.interceptors.response.use((response: UnResponse) => {
  const _data = response.data as BaseResult | undefined
  const _skipCheck = response.config?._skipResponseCheck
  if (!_skipCheck && _data?.code !== 200) {
    return Promise.reject(new Error(_data?.message ?? `[HTTP] Unknown Error: ${{ response }}`))
  }

  const _directResponse = response.config?._directResponse

  return Promise.resolve(_directResponse ? (_data as any) : response)
})

const originalRequest = _http.request.bind(_http) // 保存原始方法

/**
 * 自定义请求方法, 对于配置 _directResponse 区分不同的返回类型
 *
 * 当 _directResponse 为 false 时，完整返回 \
 * 当 _directResponse 为 true 或未设置时，直接返回接口数据 \
 * 如果不传 _directResponse，取默认值 true \
 */
function customRequest<Result = any, Params = any>(
  configOrUrl: string | RequestConfig<Result, Params> & { _directResponse: false },
  config?: RequestConfig<Result, Params> & { _directResponse: false }
): Promise<UnResponse<Result>>
function customRequest<Result = any, Params = any>(
  configOrUrl: string | RequestConfig<Result, Params> & { _directResponse?: true },
  config?: RequestConfig<Result, Params> & { _directResponse?: true }
): Promise<Result>
function customRequest<Result = any, Params = any>(
  configOrUrl: string | RequestConfig<Result, Params>,
  config?: RequestConfig<Result, Params>
): Promise<Result>
function customRequest<Result = any, Params = any>(
  configOrUrl: string | RequestConfig<Result, Params>,
  config?: RequestConfig<Result, Params>,
): Promise<Result | UnResponse<Result>> {
  return originalRequest<Result, Params, UnResponse<Result>>(configOrUrl, config) as any
}

/**
 * 创建新的 http 对象, 使得 request 的类型得到正确推断
 */
export const http = {
  ..._http,
  request: customRequest, // 替换原有的 request 方法
}

export interface BaseResult<D = any> {
  code: number
  message?: string
  data: D
}

interface ExtraRequestConfig {
  /**
   * 跳过响应检查
   */
  _skipResponseCheck?: boolean
  /**
   * 直接返回响应数据, 会直接取 data 字段作为结果
   * @default true
   */
  _directResponse?: boolean
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

type ExampleResult = BaseResult<{
  list: string[]
}>
