import type { ToastMessageOptions } from 'primevue/toast'

export function useSakaiToast() {
  const toast = useToast()

  return {
    toast,
    toastSuccess: (message: string, extraOptions: ToastMessageOptions = {}) => toast.add({
      severity: 'success',
      summary: 'Successful',
      detail: message,
      life: 3000,
      ...extraOptions,
    }),
    toastError: (message: string, extraOptions: ToastMessageOptions = {}) => toast.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000,
      ...extraOptions,
    }),
    toastWarn: (message: string, extraOptions: ToastMessageOptions = {}) => toast.add({
      severity: 'warn',
      summary: 'Warn',
      detail: message,
      life: 3000,
      ...extraOptions,
    }),
    toastInfo: (message: string, extraOptions: ToastMessageOptions = {}) => toast.add({
      severity: 'info',
      summary: 'Info',
      detail: message,
      life: 3000,
      ...extraOptions,
    }),
  }
}
