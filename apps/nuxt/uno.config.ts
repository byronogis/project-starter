import { base } from '@project-starter/unocss-config'
import { defu } from 'defu'
import {
  defineConfig,
} from 'unocss'

export default defineConfig(defu(
  {
    //
  },
  base({
    customIcons: 'app/assets/icons/custom',
  }),
))
