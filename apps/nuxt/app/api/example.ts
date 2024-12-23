import type { BaseExampleHResult, ExampleRequestConfig } from './index'
import { exampleHttp } from './index'

/**
 * 查询列表 example
 */
export function getExampleListAPI(data: GetExampleListData, extraConfig: ExampleRequestConfig = {}) {
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

interface GetExampleListResult extends BaseExampleHResult {
  data: ExampleItem[]
}
