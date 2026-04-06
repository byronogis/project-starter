import antfu from '@antfu/eslint-config'
import { getDefaultConfig } from '@project-starter/shared/config/eslint/base'
import nuxt from './.nuxt/eslint.config.mjs'

export default nuxt(antfu(
  {},
  getDefaultConfig(),
))
