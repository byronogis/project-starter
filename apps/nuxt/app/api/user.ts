import type { RequestConfig } from '@project-starter/shared/utils/http'
import { exampleHttp } from './index'

/**
 * 查询列表 user
 */
export function getUserListAPI(data: GetUserListData, extraConfig: RequestConfig = {}) {
  return exampleHttp.request<GetUserListData, GetUserListResult>({
    url: '/user',
    method: 'GET',
    params: {
      ...data,
    },
    ...extraConfig,
  })
}

interface GetUserListData {
  // ...
}

interface GetUserListResult {
  code: number
  data: UserItem[]
}
