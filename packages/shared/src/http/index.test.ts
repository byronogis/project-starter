import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { HTTP } from './index'

vi.mock('axios')

interface TestRequestData {
  id: number
}

interface TestResponseData {
  id: number
  name: string
  age: number
  email: string
  createdAt: string
  updatedAt: string
}

describe('http', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  describe('静态属性', () => {
    it('应该正确初始化默认的 transformRequest', () => {
      expect(HTTP.axiosDefaultTransformRequests).toEqual(
        Array.isArray(axios.defaults.transformRequest)
          ? axios.defaults.transformRequest
          : [axios.defaults.transformRequest],
      )
    })

    it('应该正确初始化默认的 transformResponse', () => {
      expect(HTTP.axiosDefaultTransformResponses).toEqual(
        Array.isArray(axios.defaults.transformResponse)
          ? axios.defaults.transformResponse
          : [axios.defaults.transformResponse],
      )
    })
  })

  describe('constructor', () => {
    it('不传配置时应使用默认配置', () => {
      // @ts-expect-error '_http' is declared but its value is never read.
      const _http = new HTTP()
      expect(axios.create).toHaveBeenCalledWith({})
    })

    it('应正确使用传入的配置', () => {
      const config = {
        baseURL: 'https://api.example.com',
        timeout: 5000,
        headers: { 'X-Custom-Header': 'test' },
      }
      // @ts-expect-error '_http' is declared but its value is never read.
      const _http = new HTTP(config)
      expect(axios.create).toHaveBeenCalledWith(config)
    })
  })

  describe('request', () => {
    const mockResponse: AxiosResponse<TestResponseData> = {
      data: {
        id: 1,
        name: 'Test User',
        age: 25,
        email: 'test@example.com',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      status: 200,
      statusText: 'OK',
      headers: { 'content-type': 'application/json' },
      config: {
        headers: {} as any,
        transformRequest: [],
        transformResponse: [],
        // ...其他必需的 InternalRequestConfig 属性
      },
    }

    it('应正确发送带类型的请求并处理响应', async () => {
      const requestData: TestRequestData = {
        id: 1,
      }

      const mockAxiosInstance = {
        request: vi.fn().mockResolvedValue(mockResponse),
      }
      vi.mocked(axios.create).mockReturnValue(mockAxiosInstance as any)

      const http = new HTTP()
      const response = await http.request<TestRequestData, TestResponseData>({
        url: '/users',
        method: 'GET',
        params: requestData, // 使用 params 而不是 data，因为是 GET 请求
      })

      // 验证请求是否正确发送
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        url: '/users',
        method: 'GET',
        params: requestData,
      })

      // 验证响应数据和类型
      expect(response.status).toBe(200)
      expect(response.data).toEqual(mockResponse.data)

      // 类型检查（编译时验证）
      const { id, name, age, email, createdAt, updatedAt } = response.data
      expect(typeof id).toBe('number')
      expect(typeof name).toBe('string')
      expect(typeof age).toBe('number')
      expect(typeof email).toBe('string')
      expect(typeof createdAt).toBe('string')
      expect(typeof updatedAt).toBe('string')
    })

    it('应正确处理请求错误', async () => {
      const error = new Error('Network Error')
      const mockAxiosInstance = {
        request: vi.fn().mockRejectedValue(error),
      }
      vi.mocked(axios.create).mockReturnValue(mockAxiosInstance as any)

      const http = new HTTP()
      await expect(
        http.request<TestRequestData, TestResponseData>({
          url: '/users',
          method: 'GET',
          params: { id: 1 },
        }),
      ).rejects.toThrow('Network Error')
    })
  })
})
