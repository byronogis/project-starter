import axios from 'axios'
import type {
  AxiosInstance,
  CreateAxiosDefaults,
} from 'axios'

export class Request {
  instance: AxiosInstance

  constructor(config: RequestConfig = {}) {
    this.instance = axios.create(config)
  }
}

interface RequestConfig extends CreateAxiosDefaults {
  // TODO
  interceptors?: any
}
