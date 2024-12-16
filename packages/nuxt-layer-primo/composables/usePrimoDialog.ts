import type { DialogProps } from 'primevue/dialog'
import { NuxtIcon } from '#components'
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
      cancelFn = async () => {},
      extraProps = {},
    }: {
      message: string | VNode
      header?: string
      confirmFn?: PrimoConfirmDialogConfirmFn
      cancelFn?: () => void
      extraProps?: DialogProps
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
              ...extraProps,
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
              footer: () => [
                h(PrimeButton, {
                  label: 'No',
                  text: true,
                  onClick: () => {
                    cancelFn()
                    dialogRef.close()
                  },
                }, {
                  icon: () => h(NuxtIcon, { name: 'i-prime:times' }),
                }),
                h(PrimeButton, {
                  label: 'Yes',
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
                }, {
                  icon: () => h(NuxtIcon, { name: 'i-prime:check' }),
                }),
              ],
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
