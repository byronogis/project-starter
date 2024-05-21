import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios'

export class Request {
  instance: AxiosInstance
  abortControllerMap: Map<string, AbortController> = new Map()

  constructor(config: CreateRequestConfig = {}) {
    this.instance = axios.create(config)

    // this.instance.interceptors.request.use((requestConfig) => {
    //   console.log('requestConfig', requestConfig)
    //   return requestConfig
    // })
    // this.instance.interceptors.response.use((response) => {
    //   console.log('response', response)
    //   return response
    // })

    const requestInterceptors = [
      this.#preventDuplication,
      this.#addAbortController,
    ].reverse() // NOTE: 由于请求拦截器是按添加顺序的倒序执行, 所以这里反转以使执行顺序和上面数组的定义顺序一致
    requestInterceptors.forEach((interceptor) => {
      this.instance.interceptors.request.use(interceptor.bind(this))
    })

    const responseInterceptors = [
      this.#removeAbortController,
    ]
    responseInterceptors.forEach((interceptor) => {
      this.instance.interceptors.response.use(interceptor.bind(this))
    })
  }

  /**
   * 发送请求
   */
  request(config: RequestConfig) {
    return this.instance.request(config)
  }

  /**
   * 取消请求
   */
  cancel(key: string) {
    const controller = this.abortControllerMap.get(key)
    if (controller) {
      controller.abort()
      this.abortControllerMap.delete(key)
    }
  }

  /**
   * 取消所有请求
   */
  cancelAll() {
    this.abortControllerMap.forEach((controller) => {
      controller.abort()
    })
    this.abortControllerMap.clear()
  }

  #addAbortController(requestConfig: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    const controller = new AbortController()
    requestConfig.signal = controller.signal

    const key = this.#generateKey(requestConfig)
    this.abortControllerMap.set(key, controller)

    return Promise.resolve(requestConfig)
  }

  #removeAbortController(response: AxiosResponse): Promise<AxiosResponse> {
    const key = this.#generateKey(response.config)
    this.abortControllerMap.delete(key)
    return Promise.resolve(response)
  }

  #preventDuplication(requestConfig: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    const key = this.#generateKey(requestConfig)
    if (this.abortControllerMap.has(key)) {
      return Promise.reject(new Error('Duplicate request'))
    }
    return Promise.resolve(requestConfig)
  }

  #generateKey(requestConfig: InternalAxiosRequestConfig) {
    const method = (requestConfig.method ?? 'get').toUpperCase()
    const url = requestConfig.url ?? ''
    return `${method}:${url}`
  }
}

interface CreateRequestConfig extends CreateAxiosDefaults {
  // TODO
  // interceptors?: AxiosInstance['interceptors']
}

interface RequestConfig extends AxiosRequestConfig {
  // TODO
  // interceptors?: AxiosInstance['interceptors']
  // TODO
  // _key?: string
}

// interface InternalRequestConfig extends InternalAxiosRequestConfig {
//   // _key?: string

// }

// type Promisable<T> = T | Promise<T>

// interface RequestInterceptors {
//   request?: (config: InternalAxiosRequestConfig) => RequestConfig | Promise<InternalAxiosRequestConfig>
//   response?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
// }
