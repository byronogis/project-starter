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
      confirmFn?: SakaiConfirmDialogConfirmFn
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
                resolve((data as SakaiConfirmDialogResolveData)._res)
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
                  h(Button, {
                    label: 'No',
                    icon: 'i-prime:times',
                    text: true,
                    onClick: () => {
                      dialogRef.close()
                    },
                  }),
                  h(Button, {
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

                        const _data: SakaiConfirmDialogResolveData = {
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

interface SakaiConfirmDialogResolveData {
  _flag: boolean
  _res: any
}

interface SakaiConfirmDialogComfirmParams {
  signal: AbortSignal
}

type SakaiConfirmDialogConfirmFn = (p: SakaiConfirmDialogComfirmParams) => Promise<any> | any
