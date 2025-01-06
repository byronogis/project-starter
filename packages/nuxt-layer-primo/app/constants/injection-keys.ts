export const PrimoStoreInjectionKey = Symbol('PrimoStoreInjectionKey') as InjectionKey<
  ReturnType<typeof usePrimoStore>
>

export const PrimoToastInjectionKey = Symbol('PrimoToastInjectionKey') as InjectionKey<
  ReturnType<typeof usePrimoToast>
>
