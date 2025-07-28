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
export function safeJSONParse<T>(text: string, reviver?: (this: any, key: string, value: any) => any) {
  try {
    return {
      value: JSON.parse(text, reviver) as T,
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
 * 替换字符串中不受支持的字符(默认 /[^\w-]/g )为指定字符(默认下划线)，并执行回调(默认确保为非数字开头) \
 */
export function sanitizeString(options: {
  source: string
  /** @default /[^\w-]/g */
  regex?: RegExp
  /** @default '_' */
  replaceWith?: string
  /** @default (result: string) => (/^\d/.test(result)) ? `${replaceWith}${result}` : result 如果结果以数字开头，添加 replaceWith 为前缀 */
  afterReplace?: (result: string) => string
}): string {
  const {
    source,
    regex = /[^\w-]/g,
    replaceWith = '_',
    afterReplace = (result: string) => (/^\d/.test(result)) ? `${replaceWith}${result}` : result,
  } = options ?? {}

  // 替换不支持的字符为下划线
  let result = source.replace(regex, replaceWith)

  if (afterReplace) {
    result = afterReplace(result)
  }

  return result
}
