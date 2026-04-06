import { defineConfig } from 'vite-plus'

export default defineConfig({
  test: {
    coverage: {
      enabled: !true,
      // include: ['src'],
    },
    projects: [
      'packages/*',
      'apps/*',
      '!apps/uniapp',
    ],
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
    ignorePatterns: [
      'apps/uniapp',
    ],
  },
  fmt: {},
  staged: {
    '*': 'eslint . --fix',
  },
  run: {
    cache: true,
  },
})
