import { StorageSerializers } from '@vueuse/core'

export const useUserStore = createGlobalState(() => {
  const user = useStorage<{
    name: string
  }>('user', {
    name: 'Byron',
  }, uniStorage, { serializer: StorageSerializers.object })

  return {
    user,
  }
})
