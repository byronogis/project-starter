import { defineConfig } from 'unocss'
import { fontInfo } from './config/fonts'

export default defineConfig({
  theme: {
    font: Object.entries(fontInfo).reduce((acc, [key, value]) => {
      acc[key] = value.name
      return acc
    }, {} as Record<string, string>),
  },
})
