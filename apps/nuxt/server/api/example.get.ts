import type { ExampleItem } from '~/types/example'

export default defineEventHandler(async (_event) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  const examples: ExampleItem[] = Array.from({ length: 35 }).fill(0).map((_, idx) => ({
    id: idx.toString(),
    name: `John Doe ${idx}`,
    avatar: `https://i.pravatar.cc/150?u=${idx}`,
    description: `这是第 ${idx} 个示例描述`,
    tags: ['示例', `标签${idx}`],
    birthday: Date.now() - Math.floor(Math.random() * 1000000000),
    score: Math.floor(Math.random() * 100),
    settings: {
      theme: 'light',
      notifications: true,
    },
    contacts: [
      {
        phone: '1234567890',
        email: 'john@doe.me',
        website: 'https://john.doe.me',
      },
    ],
  }))

  return {
    code: 200,
    data: examples,
  }
})
