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
  pendingMap: Map<string, PendingRequest> = new Map()

  constructor(config: CreateHTTPConfig = {}) {
    this.instance = axios.create(config)

    const {
      _isAborted = false,
      _isDeDuplicate = false,
      _isStorePending = false,
    } = config

    // 请求拦截器
    const requestInterceptors = [
      _isDeDuplicate && this.#deDuplication,
      _isStorePending && this.#addPendingRequest,
      _isStorePending && _isAborted && this.#addAbortController,
    ].reverse() // NOTE: 由于请求拦截器是按添加顺序的倒序执行, 所以这里反转以使执行顺序和上面数组的定义顺序一致
    requestInterceptors.forEach((interceptor) => {
      if (!interceptor) {
        return
      }
      // TODO fix type AxiosResponse InternalRequestConfig
      this.instance.interceptors.request.use(interceptor.bind(this) as any)
    })

    // 响应拦截器
    const responseInterceptors = [
      _isStorePending && this.#removePendingRequest,
    ]
    responseInterceptors.forEach((interceptor) => {
      if (!interceptor) {
        return
      }
      // TODO fix type AxiosResponse InternalRequestConfig
      this.instance.interceptors.response.use(interceptor.bind(this) as any)
    })
  }

  /**
   * 发送请求
   */
  request<T = any, R = any>(config: RequestConfig<T>): Promise<Response<R, T>> {
    return this.instance.request(config)
  }

  /**
   * 取消请求
   */
  cancel(key: string) {
    const { cancel } = this.pendingMap.get(key) ?? {}
    cancel?.()
    this.pendingMap.delete(key)
  }

  /**
   * 取消所有请求
   */
  cancelAll() {
    this.pendingMap.forEach(({ cancel }) => {
      cancel?.()
    })
    this.pendingMap.clear()
  }

  /**
   * 存储请求
   */
  #addPendingRequest(requestConfig: InternalRequestConfig): Promise<InternalRequestConfig> {
    const key = this.#getKey(requestConfig)
    this.pendingMap.set(key, {
      key,
      config: requestConfig,
    })

    requestConfig._key ??= key
    /**
     * 自定义 validateStatus \
     * NOTE: 防止因失败返回而无法清理 pendingMap 中存储的数据 \
     * 1. 首先使用 axios 默认的 validateStatus 判断 \
     * 2. 如果失败则清理 pendingMap 中的数据
     */
    requestConfig.validateStatus = (status) => {
      const isSuccess = status >= 200 && status < 300 // axios validateStatus default

      if (!isSuccess) {
        this.#removePendingRequest({ config: requestConfig } as Response)
      }

      return isSuccess
    }

    return Promise.resolve(requestConfig)
  }

  /**
   * 移除存储的请求
   */
  #removePendingRequest(response: Response): Promise<Response> {
    const key = response.config._key
    this.pendingMap.delete(key)
    return Promise.resolve(response)
  }

  /**
   * 添加取消请求控制器
   */
  #addAbortController(requestConfig: InternalRequestConfig): Promise<InternalRequestConfig> {
    const controller = new AbortController()
    requestConfig.signal = controller.signal

    const key = requestConfig._key
    this.pendingMap.get(key)!.cancel = () => {
      controller.abort()
      this.pendingMap.delete(key)
    }

    return Promise.resolve(requestConfig)
  }

  /**
   * 阻止重复请求
   */
  #deDuplication(requestConfig: InternalRequestConfig): Promise<InternalRequestConfig> {
    const key = this.#getKey(requestConfig)
    if (this.pendingMap.has(key)) {
      return Promise.reject(new Error('Duplicate request'))
    }
    return Promise.resolve(requestConfig)
  }

  /**
   * 获取请求的请求标识
   */
  #getKey(requestConfig: InternalRequestConfig): RequestKey {
    return requestConfig._key ?? this.#generateKey(requestConfig)
  }

  /**
   * 默认的请求标识生成 \
   */
  #generateKey(requestConfig: InternalRequestConfig): RequestKey {
    const method = (requestConfig.method ?? 'get').toUpperCase()
    const url = requestConfig.url ?? ''
    return `${method}:${url}`
  }
}

/**
 * 创建 HTTP 实例的配置
 */
interface CreateHTTPConfig extends CreateAxiosDefaults {
  // ...
  /**
   * 是否启用存储请求
   * @default false
   */
  _isStorePending?: boolean
  /**
   * 是否启用取消请求
   * @default false
   */
  _isAborted?: boolean
  /**
   * 是否启用阻止重复请求
   * @default false
   */
  _isDeDuplicate?: boolean
}

interface PendingRequest {
  /**
   * 请求标识
   */
  key: RequestKey
  /**
   * 请求配置
   */
  config: InternalRequestConfig
  /**
   * 取消请求
   */
  cancel?: () => void
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

/**
 * 额外的请求配置
 */
export interface ExtraRequestConfig {
  /**
   * 请求标识 \
   * 1. 用于存储请求 \
   * 2. 用于取消请求 \
   * @default `${method}:${url}`
   * @see #generateKey
   */
  _key?: RequestKey
}

/**
 * 请求标识的类型
 */
type RequestKey = string
