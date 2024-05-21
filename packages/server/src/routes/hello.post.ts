export default defineEventHandler(async (event) => {
  const { name } = await readBody(event)
  return `Hello, ${name}! (post)`
})
