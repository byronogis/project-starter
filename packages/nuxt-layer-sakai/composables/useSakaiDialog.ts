import Button from 'primevue/button'

export function useSakaiDialog() {
  const dialog = useDialog()
  const toast = useSakaiToast()

  return {
    dialog,
    open: async ({
      message,
      header = 'Dialog',
      confirmFn = async () => {},
    }: {
      message: string
      header?: string
      confirmFn?: () => Promise<void> | void
    }) => {
      return new Promise((resolve, reject) => {
        // TODO fix loading reactivity (h props not reactive ?)
        const loading = ref(false)

        const dialogRef = dialog.open(
          h(
            'p',
            null,
            h(
              'span',
              null,
              [
                // TODO pref rich text and wrap
                message,
              ],
            ),
          )
          ,
          {
            props: {
              header,
              modal: true,
            },
            templates: {
              footer: h(
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
                    // loading,
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
                  }, {
                    // icon: () => h('i', {
                    //   class: [
                    //     loading.value
                    //       ? 'i-prime:spinner animate-spin'
                    //       : 'i-prime:check',
                    //   ],
                    // }),
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
