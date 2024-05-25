import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios'

export class HTTP {
  instance: AxiosInstance
  pendingMap: Map<string, PendingRequest> = new Map()

  constructor(config: CreateHTTPConfig = {}) {
    this.instance = axios.create(config)

    const {
      _isAborted = true,
      _isDeDuplicate = true,
      _isStorePending = true,
    } = config

    // 请求拦截器
    const requestInterceptors = [
      _isDeDuplicate && this.#deDuplication,
      _isStorePending && this.#addPendingRequest,
      _isAborted && this.#addAbortController,
    ].reverse() // NOTE: 由于请求拦截器是按添加顺序的倒序执行, 所以这里反转以使执行顺序和上面数组的定义顺序一致
    requestInterceptors.forEach((interceptor) => {
      if (!interceptor) {
        return
      }
      this.instance.interceptors.request.use(interceptor.bind(this))
    })

    // 响应拦截器
    const responseInterceptors = [
      _isStorePending && this.#removePendingRequest,
    ]
    responseInterceptors.forEach((interceptor) => {
      if (!interceptor) {
        return
      }
      this.instance.interceptors.response.use(interceptor.bind(this))
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
  }

  /**
   * 取消所有请求
   */
  cancelAll() {
    this.pendingMap.forEach(({ cancel }) => {
      cancel?.()
    })
  }

  #addPendingRequest(requestConfig: InternalRequestConfig): Promise<InternalRequestConfig> {
    const key = this.#generateKey(requestConfig)
    this.pendingMap.set(key, {
      key,
      config: requestConfig,
    })

    requestConfig._key = key
    /**
     * NOTE: 防止因失败返回而无法清理 pendingMap 中存储的数据
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

  #removePendingRequest(response: Response): Promise<Response> {
    const key = response.config._key!
    this.pendingMap.delete(key)
    return Promise.resolve(response)
  }

  #addAbortController(requestConfig: InternalRequestConfig): Promise<InternalRequestConfig> {
    const controller = new AbortController()
    requestConfig.signal = controller.signal

    const key = requestConfig._key!
    this.pendingMap.get(key)!.cancel = () => {
      controller.abort()
      this.pendingMap.delete(key)
    }

    return Promise.resolve(requestConfig)
  }

  #deDuplication(requestConfig: InternalRequestConfig): Promise<InternalRequestConfig> {
    const key = this.#generateKey(requestConfig)
    if (this.pendingMap.has(key)) {
      return Promise.reject(new Error('Duplicate request'))
    }
    return Promise.resolve(requestConfig)
  }

  #generateKey(requestConfig: InternalRequestConfig): string {
    if (requestConfig._key) {
      return requestConfig._key
    }

    const method = (requestConfig.method ?? 'get').toUpperCase()
    const url = requestConfig.url ?? ''
    return `${method}:${url}`
  }
}

interface CreateHTTPConfig extends CreateAxiosDefaults {
  // ...
  /**
   * 是否存储请求
   * @default true
   */
  _isStorePending?: boolean
  /**
   * 是否启用取消请求
   * @default true
   */
  _isAborted?: boolean
  /**
   * 是否阻止重复请求
   * @default true
   */
  _isDeDuplicate?: boolean
}

interface PendingRequest {
  key: string
  config: InternalRequestConfig
  cancel?: () => void
}

type RequestConfig<T = any> = AxiosRequestConfig<T> & ExtraRequestConfig

type InternalRequestConfig<T = any> = InternalAxiosRequestConfig<T> & ExtraRequestConfig

type Response<R = any, T = any> = AxiosResponse<R, T> & { config: InternalRequestConfig<T> }

export interface ExtraRequestConfig {
  _key?: string
}
