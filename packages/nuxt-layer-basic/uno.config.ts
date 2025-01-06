import { defineConfig } from 'unocss'
import { fontInfo } from './config/fonts'

export default defineConfig({
  theme: {
    fontFamily: Object.entries(fontInfo).reduce((acc, [key, value]) => {
      acc[key] = value.name
      return acc
    }, {} as Record<string, string>),
  },
  // extendTheme: (theme) => {
  //   theme.fontFamily ??= {}
  //   Object.entries(fontInfo).forEach(([key, value]) => {
  //     if (!value.name) {
  //       return
  //     }

  //     if (typeof theme.fontFamily![key] === 'string') {
  //       theme.fontFamily![key] = `${value.name},${theme.fontFamily![key]}`
  //     }
  //     else {
  //       theme.fontFamily![key] = value.name
  //     }
  //   })
  // },
})
