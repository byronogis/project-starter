import Button from 'primevue/button'

export function useSakaiDialog() {
  const dialog = useDialog()
  const toast = inject(SakaiToastInjectionKey, useSakaiToast())

  return {
    dialog,
    dialogConfirm: async ({
      message,
      header = 'Dialog',
      confirmFn = async () => {},
    }: {
      message: string | VNode
      header?: string
      confirmFn?: () => Promise<void> | void
    }) => {
      const _content = typeof message === 'string'
        ? h('span', null, message)
        : message

      return new Promise((resolve, reject) => {
        const loading = ref(false)

        const dialogRef = dialog.open(
          _content,
          {
            props: {
              header,
              modal: true,
            },
            templates: {
              footer: () => h(
                'div',
                null,
                [
                  h(Button, {
                    label: 'No',
                    icon: 'i-prime:times',
                    text: true,
                    onClick: () => {
                      dialogRef.close()
                      reject(new Error('User canceled'))
                    },
                  }),
                  h(Button, {
                    label: 'Yes',
                    icon: 'i-prime:check',
                    loading: loading.value,
                    onClick: async () => {
                      try {
                        loading.value = true
                        await confirmFn()
                        loading.value = false
                        dialogRef.close()

                        resolve('User confirmed')
                      }
                      catch (error: any) {
                        loading.value = false
                        toast.toastError(error?.message)
                      }
                    },
                  }),
                ],
              ),
            },
          },
        )
      })
    },
  }
}
