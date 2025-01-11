/**
 * uniapp 使用了自修改的 vue.runtime.esm.js 文件，部分 api 不齐全
 * @see https://github.com/dcloudio/uni-app/issues/4604
 */
import type { Plugin } from 'vite'

export function uniPolyfill(): Plugin {
  return {
    name: 'vite-plugin-uni-polyfill',
    transform(code, id) {
      if (id.endsWith('@dcloudio/uni-mp-vue/dist/vue.runtime.esm.js')) {
        const missingExports = {
          components: ['TransitionGroup'],
        }
        for (const [key, exports] of Object.entries(missingExports)) {
          for (const exportName of exports) {
            if (key === 'components') {
              code += `export const ${exportName} = {};\n`
            }
          }
        }
      }
      return code
    },
  }
}
