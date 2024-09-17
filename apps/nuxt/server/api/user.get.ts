import type { UserItem } from '~/types/user'

export default defineEventHandler(async (_event) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  const users: UserItem[] = Array.from({ length: 35 }).fill(0).map((_, idx) => ({
    id: idx.toString(),
    name: `John Doe ${idx}`,
    avatar: '',
    contacts: [
      {
        phone: '1234567890',
        email: 'jhon@doe.me',
        website: 'https://john.doe.me',
      },
    ],

  }))

  return {
    code: 200,
    data: users,
  }
})
