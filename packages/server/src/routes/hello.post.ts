import { z } from 'zod'

export default defineEventHandler(async (event) => {
  // 请求体校验
  const bodySchema = z.object({
    name: z.string(),
  })

  const {
    data,
    error,
    success,
  } = await readValidatedBody(event, bodySchema.safeParse)

  // 成功响应
  if (success) {
    const { name } = data
    return {
      code: 200,
      msg: 'ok',
      data: `Hello, ${name}! (post)`,
    }
  }
  // 失败响应
  else {
    throw new Error(JSON.stringify(error))
  }
})
