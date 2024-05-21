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
  abortControllerMap: Map<any, AbortController> = new Map()

  constructor(config: CreateRequestConfig = {}) {
    this.instance = axios.create(config)

    // this.instance.interceptors.request.use((requestConfig) => {
    //   console.log('requestConfig', requestConfig)
    // })
    const interceptors = [
      this.#preventDuplication,
      this.#setAbortController,
    ]
    interceptors.forEach((interceptor) => {
      this.instance.interceptors.request.use(interceptor.bind(this))
    })
  }

  request(config: RequestConfig) {
    return this.instance.request(config)
  }

  #setAbortController(requestConfig: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    const controller = new AbortController()
    requestConfig.signal = controller.signal

    const key = this.#generateKey(requestConfig)
    this.abortControllerMap.set(key, controller)

    return Promise.resolve(requestConfig)
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

// const request = new Request()
// // request.req

interface CreateRequestConfig extends CreateAxiosDefaults {
  // TODO
  // interceptors?: AxiosInstance['interceptors']
}

interface RequestConfig extends AxiosRequestConfig {
  // TODO
  // interceptors?: AxiosInstance['interceptors']
}

// type Promisable<T> = T | Promise<T>

// interface RequestInterceptors {
//   request?: (config: InternalAxiosRequestConfig) => RequestConfig | Promise<InternalAxiosRequestConfig>
//   response?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
// }
