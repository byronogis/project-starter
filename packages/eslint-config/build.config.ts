import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    './src/config/base',
  ],
  declaration: 'compatible',
  rollup: {
    emitCJS: true,
  },
})
