import type { ToastMessageOptions } from 'primevue/toast'

export function useGlobalToast(globalOptions: ToastMessageOptions = {}) {
  return usePrimoToast({
    group: PrimoToastGroupGlobalCST,
    ...globalOptions,
  })
}
