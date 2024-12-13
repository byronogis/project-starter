import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'

export class HTTP {
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
  request<T = any, R = any>(config: RequestConfig<T>): Promise<Response<R, T>> {
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
export interface ExtraRequestConfig {
  // ...
}

/**
 * 可接收传入的请求配置
 */
export type RequestConfig<T = any> = AxiosRequestConfig<T> & ExtraRequestConfig

/**
 * 经过 axios 处理后的传入的请求配置 \
 * 1. 添加了处理后的 headers \
 * 2. 自行扩展了一些属性 \
 * @see ExtraRequestConfig
 */
type InternalRequestConfig<T = any> = InternalAxiosRequestConfig<T> & Required<ExtraRequestConfig>

/**
 * 经过 axios 处理后的响应 \
 */
type Response<R = any, T = any> = AxiosResponse<R, T> & { config: InternalRequestConfig<T> }
