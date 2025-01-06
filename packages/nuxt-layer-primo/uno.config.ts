import { mergeConfigs } from 'unocss'
import config from './.nuxt/uno.config.mjs'

export default mergeConfigs([
  config,
  {
    theme: {
      /**
       * tailwindcss-primeui
       * @see https://github.com/primefaces/tailwindcss-primeui/blob/d5e903377e015b7c63cb5edf42490b9d6954ef04/src/theme.js#L7
       */
      colors: {
        'primary': convert('var(--p-primary-color)'),
        'primary-emphasis': convert('var(--p-primary-hover-color)'),
        'primary-emphasis-alt': convert('var(--p-primary-active-color)'),
        'primary-contrast': convert('var(--p-primary-contrast-color)'),
        'primary-50': convert('var(--p-primary-50)'),
        'primary-100': convert('var(--p-primary-100)'),
        'primary-200': convert('var(--p-primary-200)'),
        'primary-300': convert('var(--p-primary-300)'),
        'primary-400': convert('var(--p-primary-400)'),
        'primary-500': convert('var(--p-primary-500)'),
        'primary-600': convert('var(--p-primary-600)'),
        'primary-700': convert('var(--p-primary-700)'),
        'primary-800': convert('var(--p-primary-800)'),
        'primary-900': convert('var(--p-primary-900)'),
        'primary-950': convert('var(--p-primary-950)'),
        'surface-0': convert('var(--p-surface-0)'),
        'surface-50': convert('var(--p-surface-50)'),
        'surface-100': convert('var(--p-surface-100)'),
        'surface-200': convert('var(--p-surface-200)'),
        'surface-300': convert('var(--p-surface-300)'),
        'surface-400': convert('var(--p-surface-400)'),
        'surface-500': convert('var(--p-surface-500)'),
        'surface-600': convert('var(--p-surface-600)'),
        'surface-700': convert('var(--p-surface-700)'),
        'surface-800': convert('var(--p-surface-800)'),
        'surface-900': convert('var(--p-surface-900)'),
        'surface-950': convert('var(--p-surface-950)'),
      },
      /**
       * tailwindcss-primeui
       * @see https://github.com/primefaces/sakai-vue/blob/4c7b0c0f5db459ef36c7b8ca6962223cfd69d5be/tailwind.config.js#L7C8-L7C19
       */
      breakpoints: {
        'sm': '576px',
        'md': '768px',
        'lg': '992px',
        'xl': '1200px',
        '2xl': '1920px',
      },
    },
    rules: [
      /**
       * tailwindcss-primeui
       * @see https://github.com/primefaces/tailwindcss-primeui/blob/d5e903377e015b7c63cb5edf42490b9d6954ef04/src/utils/preset.js
       */
      ['border-surface', {
        'border-color': 'var(--p-content-border-color)',
      }],
      ['bg-emphasis', {
        background: 'var(--p-content-hover-background)',
        color: 'var(--p-content-hover-color)',
      }],
      ['bg-highlight', {
        background: 'var(--p-highlight-background)',
        color: 'var(--p-highlight-color)',
      }],
      ['bg-highlight-emphasis', {
        background: 'var(--p-highlight-focus-background)',
        color: 'var(--p-highlight-focus-color)',
      }],
      ['rounded-border', {
        'border-radius': 'var(--p-content-border-radius)',
      }],
      ['text-color', {
        color: 'var(--p-text-color)',
      }],
      ['text-color-emphasis', {
        color: 'var(--p-text-hover-color)',
      }],
      ['text-muted-color', {
        color: 'var(--p-text-muted-color)',
      }],
      ['text-muted-color-emphasis', {
        color: 'var(--p-text-hover-muted-color)',
      }],
      /**
       * tailwindcss-primeui
       * @see https://github.com/primefaces/tailwindcss-primeui/blob/d5e903377e015b7c63cb5edf42490b9d6954ef04/src/utils/backface.js
       */
      ['backface-visible', {
        'backface-visibility': 'visible',
      }],
      ['backface-hidden', {
        'backface-visibility': 'hidden',
      }],
    ].map(i => [...i, { layer: 'nuxt-layer-primo.unocss' }] as any),
    safelist: [
      'i-prime:bars',
      'i-prime:ellipsis-v',
      'i-prime:angle-down',
      'i-prime:palette',
      'i-prime:desktop',
      'i-prime:sun',
      'i-prime:moon',
      'i-prime:user',
      'i-prime:plus',
      'i-prime:eye',
      'i-prime:file-edit',
      'i-prime:times',
      'i-prime:check',
      'i-prime:th-large',
      'i-prime:search',
      'i-prime:pencil',
      'i-prime:trash',
    ],
  } as any,
])

function convert(color: string) {
  return `color-mix(in srgb, ${color} calc(100% * <alpha-value>), transparent)`
}

// export default defineConfig()
