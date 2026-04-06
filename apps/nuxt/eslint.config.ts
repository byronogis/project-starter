import { getDefaultConfig } from '@project-starter/shared/config/eslint/base'
import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default nuxt(antfu(
  {},
  getDefaultConfig(),
))
