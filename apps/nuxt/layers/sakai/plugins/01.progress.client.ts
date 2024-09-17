import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

export default defineNuxtPlugin({
  name: 'progress',
  setup(_uxtApp) {
    useRouter().beforeEach(() => {
      NProgress.start()
    })

    useRouter().afterEach(() => {
      NProgress.done()
    })
  },
})
