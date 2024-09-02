export const useUserStore = defineStore('user', () => {
  /**
   * Current named of the user.
   */
  const name = ref('')

  return {
    name,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
