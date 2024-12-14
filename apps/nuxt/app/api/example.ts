import type { RequestConfig } from '@project-starter/shared'
import { exampleHttp } from './index'

/**
 * 查询列表 example
 */
export function getExampleListAPI(data: GetExampleListData, extraConfig: RequestConfig = {}) {
  return exampleHttp.request<GetExampleListData, GetExampleListResult>({
    url: '/example',
    method: 'GET',
    params: {
      ...data,
    },
    ...extraConfig,
  })
}

interface GetExampleListData {
  // ...
}

interface GetExampleListResult {
  code: number
  data: ExampleItem[]
}
