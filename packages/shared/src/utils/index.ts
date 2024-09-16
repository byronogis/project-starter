export { HTTP } from './http'
export { logger } from './logger'
export { date } from './date'
export { _ } from './_'
export { timer } from './timer'

/**
 * 安全的 JSON 解析 \
 * eg: `const res = safeJSONParse(str).value ?? {} // 默认值`
 */
export function safeJSONParse(text: string, reviver?: (this: any, key: string, value: any) => any) {
  try {
    return {
      value: JSON.parse(text, reviver),
    }
  }
  catch (error) {
    // console.error(error)
    return {
      error,
    }
  }
}
