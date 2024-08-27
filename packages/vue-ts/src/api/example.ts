export function queryHelloAPI(data: ExampleData, extraConfig: any = {}) {
  return http.request<ExampleData, ExampleResult>({
    url: '/server-nitro/hello',
    method: 'GET',
    params: data,
    ...extraConfig,
  })
}

export function bodyHelloAPI(data: ExampleData) {
  return http.request<ExampleData, ExampleResult>({
    url: '/server-nitro/hello',
    method: 'POST',
    data,
  })
}

export function pathHelloAPI(data: ExampleData) {
  return http.request<ExampleData, ExampleResult>({
    url: `/server-nitro/hello/${data.name}`,
    method: 'GET',
  })
}

export interface ExampleData {
  name: string
}

export interface ExampleResult {
  code: number
  msg: string
  data: string
}
