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

    describe('_directResponse 功能测试', () => {
      const mockAxiosInstance = {
        request: vi.fn(),
      }

      beforeEach(() => {
        vi.mocked(axios.create).mockReturnValue(mockAxiosInstance as any)
        mockAxiosInstance.request.mockResolvedValue(mockResponse)
      })

      it('当 _directResponse 为 true 时，应直接返回数据部分', async () => {
        const http = new HTTP()

        // 模拟实际的拦截器逻辑，直接返回数据
        mockAxiosInstance.request.mockResolvedValue(mockResponse.data)

        const result = await http.request<TestRequestData, TestResponseData>({
          url: '/users',
          method: 'GET',
          params: { id: 1 },
          _directResponse: true,
        })

        // 验证返回的是数据本身，而不是完整的响应对象
        expect(result).toEqual(mockResponse.data)
        expect(result.id).toBe(1)
        expect(result.name).toBe('Test User')

        // 验证类型：result 应该是 TestResponseData 类型
        // TypeScript 编译时会验证这些属性存在
        expect(typeof result.id).toBe('number')
        expect(typeof result.name).toBe('string')
      })

      it('当 _directResponse 为 false 或未设置时，应返回完整的响应对象', async () => {
        const http = new HTTP()

        // 测试 _directResponse: false - 这里需要明确类型，因为重载会返回 Response 类型
        const resultFalse = await http.request<TestRequestData, TestResponseData>({
          url: '/users',
          method: 'GET',
          params: { id: 1 },
          _directResponse: false,
        } as const)

        // resultFalse 应该是 Response 类型，有 status 和 data 属性
        expect(resultFalse.status).toBe(200)
        expect(resultFalse.data).toEqual(mockResponse.data)

        // 测试未设置 _directResponse（默认为 false）
        const resultDefault = await http.request<TestRequestData, TestResponseData>({
          url: '/users',
          method: 'GET',
          params: { id: 1 },
        })

        // resultDefault 也应该是 Response 类型
        expect(resultDefault.status).toBe(200)
        expect(resultDefault.data).toEqual(mockResponse.data)
      })

      it('应正确处理不同的数据类型', async () => {
        interface SimpleData {
          message: string
          success: boolean
        }

        const simpleResponse: AxiosResponse<SimpleData> = {
          data: { message: 'Hello World', success: true },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        }

        mockAxiosInstance.request.mockResolvedValue(simpleResponse.data)

        const http = new HTTP()
        const result = await http.request<any, SimpleData>({
          url: '/simple',
          method: 'GET',
          _directResponse: true,
        })

        expect(result.message).toBe('Hello World')
        expect(result.success).toBe(true)
        expect(typeof result.message).toBe('string')
        expect(typeof result.success).toBe('boolean')
      })

      it('应正确处理数组类型的响应数据', async () => {
        const arrayData = [
          { id: 1, name: 'User 1' },
          { id: 2, name: 'User 2' },
        ]

        mockAxiosInstance.request.mockResolvedValue(arrayData)

        const http = new HTTP()
        const result = await http.request<any, typeof arrayData>({
          url: '/users',
          method: 'GET',
          _directResponse: true,
        })

        expect(Array.isArray(result)).toBe(true)
        expect(result).toHaveLength(2)
        expect(result[0]?.id).toBe(1)
        expect(result[1]?.name).toBe('User 2')
      })
    })
  })
})
