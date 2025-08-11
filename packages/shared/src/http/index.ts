import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'

export class HTTP<Result = any, Extra = any> {
  static axios = axios

  static axiosDefaultTransformRequests = Array.isArray(axios.defaults.transformRequest)
    ? axios.defaults.transformRequest
    : [axios.defaults.transformRequest]

  static axiosDefaultTransformResponses = Array.isArray(axios.defaults.transformResponse)
    ? axios.defaults.transformResponse
    : [axios.defaults.transformResponse]

  instance: AxiosInstance

  constructor(config: CreateHTTPConfig = {}) {
    this.instance = axios.create(config)
  }

  /**
   * 发送请求
   *
   * 当 _directResponse 为 true 时，直接返回响应数据
   * 当 _directResponse 为 false 或未设置时，返回完整的响应对象
   */
  request<Params = any, Result2 = Result, Extra2 = Extra>(
    config: RequestConfig<Params, Extra2> & { _directResponse: true }
  ): Promise<Result2>
  request<Params = any, Result2 = Result, Extra2 = Extra, Response2 extends Response<Result2, Params, Extra2> = Response<Result2, Params, Extra2>>(
    config: RequestConfig<Params, Extra2>
  ): Promise<Response2>
  request<Params = any, Result2 = Result, Extra2 = Extra, Response2 extends Response<Result2, Params, Extra2> = Response<Result2, Params, Extra2>>(
    config: RequestConfig<Params, Extra2>,
  ): Promise<Result2 | Response2> {
    return this.instance.request<Result2, Response2, Params>(config).then((res) => {
      if (config._directResponse) {
        return res.data
      }
      return res
    })
  }
}

/**
 * 创建 HTTP 实例的配置
 */
interface CreateHTTPConfig extends CreateAxiosDefaults, ExtraRequestConfig {
  // ...
}

/**
 * 额外的请求配置
 */
export type ExtraRequestConfig<Extra = object> = {
  /**
   * 直接返回响应数据, 会直接取 data 字段作为结果
   */
  _directResponse?: boolean
} & Extra

/**
 * 可接收传入的请求配置
 */
export type RequestConfig<Params = any, Extra = any> = AxiosRequestConfig<Params> & ExtraRequestConfig<Extra>

/**
 * 经过 axios 处理后的传入的请求配置 \
 * 1. 添加了处理后的 headers \
 * 2. 可自行扩展一些属性 \
 * @see ExtraRequestConfig
 */
type InternalRequestConfig<Params = any, Extra = any> = InternalAxiosRequestConfig<Params> & Partial<ExtraRequestConfig<Extra>>

/**
 * 经过 axios 处理后的响应 \
 */
export type Response<Result = any, Params = any, Extra = any> = AxiosResponse<Result, Params> & { config: InternalRequestConfig<Params, Extra> }
