export const SakaiStoreInjectionKey = Symbol('SakaiStoreInjectionKey') as InjectionKey<
  ReturnType<typeof useSakaiStore>
>

export const SakaiToastInjectionKey = Symbol('SakaiToastInjectionKey') as InjectionKey<
  ReturnType<typeof useSakaiToast>
>
