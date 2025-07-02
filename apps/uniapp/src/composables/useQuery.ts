export function useQuery<
  T extends AnyObject = AnyObject,
  K extends keyof T = keyof T,
>(options?: UseQueryOptions<T> | UseQueryOptions<T>['key']) {
  const {
    key,
    afterResolve,
  } = typeof toValue(options) === 'string'
    ? { key: options }
    : (options ?? {}) as UseQueryOptions<T>

  const query = ref<T>({} as T)

  onLoad((q) => {
    query.value = q || {}

    afterResolve?.(query.value)
  })

  const value = computed<T[K]>(() =>
    key ? query.value[toValue(key) as keyof T] : null,
  )

  return {
    query: readonly(query),
    value,
  }
}

interface UseQueryOptions<T extends AnyObject = AnyObject> {
  key?: MaybeRefOrGetter<keyof T>
  /**
   * 页面参数解析完成后回调, 在 onLoad 生命周期中执行
   */
  afterResolve?: (query: T) => void
}
