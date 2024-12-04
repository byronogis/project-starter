import type { ToastMessageOptions } from 'primevue/toast'

export function useGlobalToast(globalOptions: ToastMessageOptions = {}) {
  return useSakaiToast({
    group: SakaiToastGroupGlobalCST,
    ...globalOptions,
  })
}
