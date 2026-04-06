import antfu from '@antfu/eslint-config'
import { getDefaultConfig } from '@project-starter/shared/config/eslint/base'

export default antfu(
  {},
  getDefaultConfig(),
  {
    ignores: [
      '.github',
    ],
  },
)
