import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'

export class HTTP<Result = any, ExtraConfig = any> {
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
   */
  request<T = any, R = Result, E = ExtraConfig>(config: RequestConfig<T, E>): Promise<Response<R, T, E>> {
    return this.instance.request(config)
  }
}

/**
 * 创建 HTTP 实例的配置
 */
interface CreateHTTPConfig extends CreateAxiosDefaults {
  // ...
}

/**
 * 额外的请求配置
 */
export type ExtraRequestConfig<E = any> = {
  // ...
} & E

/**
 * 可接收传入的请求配置
 */
export type RequestConfig<T = any, E = any> = AxiosRequestConfig<T> & ExtraRequestConfig<E>

/**
 * 经过 axios 处理后的传入的请求配置 \
 * 1. 添加了处理后的 headers \
 * 2. 可自行扩展一些属性 \
 * @see ExtraRequestConfig
 */
type InternalRequestConfig<T = any, E = any> = InternalAxiosRequestConfig<T> & Partial<ExtraRequestConfig<E>>

/**
 * 经过 axios 处理后的响应 \
 */
export type Response<R = any, T = any, E = any> = AxiosResponse<R, T> & { config: InternalRequestConfig<T, E> }
