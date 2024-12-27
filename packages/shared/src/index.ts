export * as _ from './_'
export * as appearance from './appearance'
export * as color from './color'
export * as date from './date'
export * as form from './form'
export * as http from './http'
export * from './logger'
export * from './merge'
export * as timer from './timer'

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

/**
 * 针对预期的错误类型进行捕获 \
 * @example const [err] = await catchErrorTyped(new Promise(resolve => resolve(JSON.parse(''))))
 */
export async function catchErrorTyped<
  T,
  E extends new (message?: string) => Error,
>(
  promise: Promise<T>,
  errorToCatch?: E[],
): Promise<[undefined, T] | [InstanceType<E>]> {
  try {
    const data = await promise
    const result: [undefined, T] = [undefined, data]
    return result
  }
  catch (error: any) {
    if (errorToCatch === undefined) {
      return [error]
    }

    if (errorToCatch.some(e => error instanceof e)) {
      return [error]
    }

    throw error
  }
}

/**
 * 替换字符串中不支持的字符为下划线，并确保结果符合类名规范 \
 * @description 只允许 a-zA-Z0-9_- 字符, 并且不以数字开头 \
 * 不符合规范的字符将被原地替换为下划线, 如果结果以数字开头, 则添加下划线前缀 \
 * @param input 原始字符串
 * @returns 已替换的不含非法字符的字符串
 */
export function sanitizeString(input: string): string {
  // 替换不支持的字符为下划线
  let result = input.replace(/[^\w-]/g, '_')
  // 如果结果以数字开头，添加下划线前缀
  if (/^\d/.test(result)) {
    result = `_${result}`
  }
  return result
}
