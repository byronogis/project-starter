import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const username = ref('Anonymous')

  function setNewName(name: string) {
    username.value = name
  }

  return {
    setNewName,
    username,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
}
