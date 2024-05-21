export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  await new Promise(resolve => setTimeout(resolve, 1000 * 2))

  console.log('query', query)
  return `Hello, ${query.name}!`
})
