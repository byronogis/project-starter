/**
 * To make @unocss/eslint-plugin work with monorepo
 * @see https://github.com/unocss/unocss/issues/2603
 */
import { base } from '@project-starter/unocss-config'
import { defu } from 'defu'
import {
  defineConfig,
} from 'unocss'

export default defineConfig(defu(
  {
    //
  },
  base(),
))
