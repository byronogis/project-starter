export function useSakaiToast() {
  const toast = useToast()

  return {
    toast,
    toastSuccess: (message: string) => toast.add({
      severity: 'success',
      summary: 'Successful',
      detail: message,
      life: 3000,
    }),
    toastError: (message: string) => toast.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000,
    }),
    toastWarn: (message: string) => toast.add({
      severity: 'warn',
      summary: 'Warn',
      detail: message,
      life: 3000,
    }),
    toastInfo: (message: string) => toast.add({
      severity: 'info',
      summary: 'Info',
      detail: message,
      life: 3000,
    }),
  }
}
