import antfu from '@antfu/eslint-config'
// import { merge } from '@project-starter/shared/utils/merge'
// import type { MergeOptions } from '@project-starter/shared/utils/merge'

// TODO fix type reference
export type { FlatConfigComposer } from 'eslint-flat-config-utils'

/**
 * Base configuration for ESLint
 * @param options
 * @param configs
 * **Leftmost** arguments have more priority when assigning defaults.
 * @returns
 * The merged configuration
 */
export function withBase(
  options?: BaseOptions,
  ...configs: Parameters<typeof antfu>[1][]
) {
  const {
    extraOptions,
  } = options ?? {}

  return antfu(
    {
      formatters: true,
      typescript: true,
      unocss: true,
      vue: true,
      ...extraOptions,
    },
    {
      rules: {
        'no-console': ['warn', {
          allow: [
            'warn',
            'error',
            'info',
          ],
        }],

        /**
         * @see https://eslint.org/docs/latest/rules/no-unused-expressions
         */
        'ts/no-unused-expressions': 'warn',

        /**
         * @see https://eslint.org/docs/latest/rules/prefer-promise-reject-errors
         */
        'prefer-promise-reject-errors': 'error',

        /**
         * Always use curly braces for blocks and new line.
         * @see https://eslint.org/docs/latest/rules/curly#all
         * @see https://eslint.style/rules/default/max-statements-per-line#max
         * @see https://eslint.style/rules/default/brace-style#stroustrup
         */
        'curly': ['error', 'all'],
        '@stylistic/max-statements-per-line': ['error', { max: 1 }],
        '@stylistic/brace-style': ['error', 'stroustrup'],
      },
    },
    /**
     * **Rightmost** arguments have more priority when assigning defaults.
     * @see https://eslint.org/docs/latest/use/configure/configuration-files#cascading-configuration-objects
     */
    ...configs.reverse(),
  )
}

interface BaseOptions {
  extraOptions?: Parameters<typeof antfu>[0]
}
