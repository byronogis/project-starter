import { z } from 'zod'

export default defineEventHandler(async (event) => {
  // 查询参数校验
  const querySchema = z.object({
    name: z.string(),
  })

  await new Promise(resolve => setTimeout(resolve, 1000 * 2))

  const {
    data,
    error,
    success,
  } = await getValidatedQuery(event, querySchema.safeParse)

  // 成功响应
  if (success) {
    const { name } = data
    return {
      code: 200,
      msg: 'ok',
      data: `Hello, ${name}! (get query)`,
    }
  }
  // 失败响应
  else {
    throw new Error(JSON.stringify(error))
  }
})
