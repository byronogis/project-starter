export function queryHelloAPI(data: ExampleData) {
  return http.request<ExampleData, ExampleResult>({
    url: '/api/hello',
    method: 'GET',
    params: data,
  })
}

export function bodyHelloAPI(data: ExampleData) {
  return http.request<ExampleData, ExampleResult>({
    url: '/api/hello',
    method: 'POST',
    data,
  })
}

export function pathHelloAPI(data: ExampleData) {
  return http.request<ExampleData, ExampleResult>({
    url: `/api/hello/${data.name}`,
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
