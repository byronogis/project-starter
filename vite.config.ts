import { defineConfig } from 'vite-plus'

export default defineConfig({
  test: {
    coverage: {
      enabled: !true,
      // include: ['src'],
    },
  },
  lint: {
    options: {
      typeAware: true,
      // typeCheck: true,
    },
    ignorePatterns: [
      'apps/uniapp',
    ],
  },
  fmt: {},
  staged: {
    '*': 'vp check --fix',
  },
  run: {
    cache: true,
  },
})
