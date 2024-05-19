// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    unocss: true,
    ignores: [
      '.github',
    ],
  },
  {
    rules: {
      'no-console': 'warn',

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
)
