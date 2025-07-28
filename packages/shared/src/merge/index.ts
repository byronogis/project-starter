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
export function merge<Source extends Input = Input>(
  options?: MergeOptions,
  ...args: Source[]
) {
  const {
    merger = defu,
  } = options ?? {}

  return merger(
    args.shift() ?? {} as Source,
    ...args,
  )
}

export interface MergeOptions {
  /**
   * @default defu
   */
  merger?: typeof defuFn
}

type Input = Record<string | number | symbol, any>
