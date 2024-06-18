import { z } from 'zod'

export default defineEventHandler(async (event) => {
  // 路径参数校验
  const paramsSchema = z.object({
    name: z.string(),
  })

  const {
    data,
    error,
    success,
  } = await getValidatedRouterParams(event, paramsSchema.safeParse)

  // 成功响应
  if (success) {
    const { name } = data
    return {
      code: 200,
      msg: 'ok',
      data: `Hello, ${name}! (get params)`,
    }
  }
  // 失败响应
  else {
    throw new Error(JSON.stringify(error))
  }
})
