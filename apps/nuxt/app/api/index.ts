import { HTTP } from '@project-starter/shared/utils/http'

/**
 * 示例 API
 */
export const exampleHttp = new HTTP({
  baseURL: '/api',
})
export function exampleAPI(data: ExampleData, extraConfig: any = {}) {
  return exampleHttp.request<ExampleData, ExampleResult>({
    url: '/example',
    method: 'GET',
    data,
    ...extraConfig,
  })
}

interface ExampleData {
  // ...
}

interface ExampleResult {
  // ...
}
