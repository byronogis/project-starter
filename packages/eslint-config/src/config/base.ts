import antfu from '@antfu/eslint-config'
// import { merge } from '@project-starter/shared'
// import type { MergeOptions } from '@project-starter/shared'

// TODO fix type reference
export type { FlatConfigComposer } from 'eslint-flat-config-utils'

export const baseOverride: Parameters<typeof antfu>[1] = {
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
}

/**
 * Base configuration for ESLint
 * @param options
 * @param configs
 * **Leftmost** arguments have more priority when assigning defaults.
 * @returns
 * The merged configuration
 */
export function base(
  options?: BaseOptions,
  ...configs: Parameters<typeof antfu>[1][]
) {
  const {
    extraOptions,
    builtOverride = true,
  } = options ?? {}

  return antfu(
    {
      formatters: true,
      typescript: true,
      unocss: true,
      vue: true,
      ...extraOptions,
    },
    builtOverride ? baseOverride : {},
    /**
     * **Rightmost** arguments have more priority when assigning defaults.
     * @see https://eslint.org/docs/latest/use/configure/configuration-files#cascading-configuration-objects
     */
    ...configs.reverse(),
  )
}

interface BaseOptions {
  /**
   * Whether to use built-in overrides of this configuration.
   * @see baseOverride
   * @default true
   */
  builtOverride?: boolean
  extraOptions?: Parameters<typeof antfu>[0]
}
