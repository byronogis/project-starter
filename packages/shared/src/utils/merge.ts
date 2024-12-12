import type { defuFn } from 'defu'
import { defu } from 'defu'

/**
 * Merge configurations
 * @param options
 * @param args
 * Leftmost arguments have more priority when assigning defaults.
 * @returns
 * The merged configuration
 */
export function merge(
  options?: MergeOptions,
  ...args: Record<string | number | symbol, any>[]
) {
  const {
    merger = defu,
  } = options ?? {}

  return merger(
    args.shift() ?? {},
    ...args,
  )
}

export interface MergeOptions {
  /**
   * @default defu
   */
  merger?: typeof defuFn
}
