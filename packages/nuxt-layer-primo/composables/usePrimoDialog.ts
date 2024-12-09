import PrimeButton from 'primevue/button'

export function usePrimoDialog() {
  const dialog = useDialog()
  const toast = inject(PrimoToastInjectionKey, usePrimoToast())

  return {
    dialog,
    dialogConfirm: async ({
      message,
      header = 'Dialog',
      confirmFn = async () => {},
    }: {
      message: string | VNode
      header?: string
      confirmFn?: PrimoConfirmDialogConfirmFn
    }) => {
      const _content = typeof message === 'string'
        ? h('span', null, message)
        : message

      const _controller = new AbortController()

      return new Promise((resolve, reject) => {
        const loading = ref(false)

        const dialogRef = dialog.open(
          _content,
          {
            props: {
              header,
              modal: true,
            },
            onClose(options) {
              const { data } = options ?? {}

              if (data?._flag) {
                resolve((data as PrimoConfirmDialogResolveData)._res)
              }
              else {
                _controller.abort()
                reject(new Error('User canceled'))
              }
            },
            templates: {
              footer: () => h(
                'div',
                null,
                [
                  h(PrimeButton, {
                    label: 'No',
                    icon: 'i-prime:times',
                    text: true,
                    onClick: () => {
                      dialogRef.close()
                    },
                  }),
                  h(PrimeButton, {
                    label: 'Yes',
                    icon: 'i-prime:check',
                    loading: loading.value,
                    onClick: async () => {
                      try {
                        loading.value = true
                        const _res = await confirmFn({
                          signal: _controller.signal,
                        })
                        loading.value = false

                        const _data: PrimoConfirmDialogResolveData = {
                          _flag: true,
                          _res,
                        }
                        dialogRef.close(_data)
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

interface PrimoConfirmDialogResolveData {
  _flag: boolean
  _res: any
}

interface PrimoConfirmDialogComfirmParams {
  signal: AbortSignal
}

type PrimoConfirmDialogConfirmFn = (p: PrimoConfirmDialogComfirmParams) => Promise<any> | any
