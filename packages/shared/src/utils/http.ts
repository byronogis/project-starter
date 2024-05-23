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
  abortControllerMap: Map<string, AbortController> = new Map()

  constructor(config: CreateHTTPConfig = {}) {
    this.instance = axios.create(config)

    // this.instance.interceptors.request.use((requestConfig) => {
    //   console.log('requestConfig', requestConfig)
    //   return requestConfig
    // })
    // this.instance.interceptors.response.use((response) => {
    //   console.log('response', response)
    //   return response
    // })

    // 请求拦截器
    const requestInterceptors = [
      // ...config.interceptors?.request ?? [],
      this.#preventDuplication,
      this.#addAbortController,

    ].reverse() // NOTE: 由于请求拦截器是按添加顺序的倒序执行, 所以这里反转以使执行顺序和上面数组的定义顺序一致
    requestInterceptors.forEach((interceptor) => {
      this.instance.interceptors.request.use(interceptor.bind(this))
    })

    // 响应拦截器
    const responseInterceptors = [
      this.#removeAbortController,
      // ...config.interceptors?.response ?? [],
    ]
    responseInterceptors.forEach((interceptor) => {
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

  #addAbortController(requestConfig: InternalRequestConfig): Promise<InternalRequestConfig> {
    const controller = new AbortController()
    requestConfig.signal = controller.signal

    const key = this.#generateKey(requestConfig)
    this.abortControllerMap.set(key, controller)

    return Promise.resolve(requestConfig)
  }

  #removeAbortController(response: Response): Promise<Response> {
    const key = this.#generateKey(response.config)
    this.abortControllerMap.delete(key)
    return Promise.resolve(response)
  }

  #preventDuplication(requestConfig: InternalRequestConfig): Promise<InternalRequestConfig> {
    const key = this.#generateKey(requestConfig)
    if (this.abortControllerMap.has(key)) {
      return Promise.reject(new Error('Duplicate request'))
    }
    return Promise.resolve(requestConfig)
  }

  #generateKey(requestConfig: InternalRequestConfig) {
    if (requestConfig._key) {
      return requestConfig._key
    }

    const method = (requestConfig.method ?? 'get').toUpperCase()
    const url = requestConfig.url ?? ''
    return `${method}:${url}`
  }

  // #addRequestInterceptors(interceptors: HTTPInterceptors['request']) {
  //   interceptors.forEach((i) => {
  //     this.instance.interceptors.request.use(...i)
  //   })
  // }

  // #addResponseInterceptors(interceptors: HTTPInterceptors['response']) {
  //   interceptors.forEach((i) => {
  //     this.instance.interceptors.response.use(...i)
  //   })
  // }
}

interface CreateHTTPConfig extends CreateAxiosDefaults {
  // interceptors?: HTTPInterceptors
}

type RequestConfig<T = any> = AxiosRequestConfig<T> & ExtraRequestConfig

type InternalRequestConfig<T = any> = InternalAxiosRequestConfig<T> & ExtraRequestConfig

type Response<R = any, T = any> = AxiosResponse<R, T> & { config: InternalRequestConfig<T> }

export interface ExtraRequestConfig {
  _key?: string
}

// interface HTTPInterceptors {
//   request: RequestInterceptor[]
//   response: ResponseInterceptor[]
// }

// type RequestInterceptor = Parameters<AxiosInstance['interceptors']['request']['use']>
// type ResponseInterceptor = Parameters<AxiosInstance['interceptors']['response']['use']>
