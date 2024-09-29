export function useSharedForm<
  T extends SharedFormItem,
  G = string,
  P = SharedFormFieldItemType,
  E = Record<string, any>,
>(options: SharedFormOptions<T, G, P, E>) {
  const {
    fieldsInfo,
    fieldsData,
  } = options ?? {}

  /**
   * 以组划分的字段信息
   */
  const fieldsInfoGroup = computed<SharedFormFieldsInfoGroupItem<T, G, P, E>[]>(() => {
    const _fieldsInfo = toValue(fieldsInfo)

    if (Array.isArray(_fieldsInfo)) {
      return _fieldsInfo.map(i => ({
        ...i,
        name: String(i.name ?? i.id),
        formClass: i.formClass ?? `shared-form-fields-group-${i.id}`,
      }))
    }
    else {
      const _group: SharedFormFieldsInfoGroupItem<T, G, P, E>[] = Object.values(_fieldsInfo)
        .reduce((acc, cur: SharedFormFieldItem<T>) => {
          acc[cur.group ?? '_default'] ??= {
            id: cur.group ?? '_default',
            name: cur.group ?? '_default',
            fields: [],
            formClass: `shared-form-fields-group-${cur.group ?? '_default'}`,
          }

          acc[cur.group ?? '_default'].fields.push({
            ...cur,
            group: cur.group ?? '_default',
          })

          return acc
        }, {} as Record<string, SharedFormFieldsInfoGroupItem<T>[]>)

      return Object.values(_group)
    }
  })

  /**
   * 扁平化的字段信息
   */
  const fieldsInfoFlat = computed<Partial<SharedFormFieldsInfo<T, G, P, E>>>(() => {
    const _fieldsInfo = toValue(fieldsInfo)

    if (Array.isArray(_fieldsInfo)) {
      return _fieldsInfo.reduce((acc, cur) => {
        // TODO 需要考虑字段名重复的情况
        return {
          ...acc,
          ...cur.fields,
        }
      }, {} as SharedFormFieldsInfo<T, G, P, E>)
    }
    else {
      return _fieldsInfo
    }
  })

  // TODO type
  // const form = reactive(useForm<T>({
  const form = reactive(useForm({
    //
  }))

  watch(() => toValue(fieldsData), (_data) => {
    if (_data) {
      form.setValues(_data)
    }
    else {
      forceResetFormValues()
    }
  }, {
    deep: true,
    immediate: true,
  })

  function forceResetFormValues() {
    form.resetForm({
      values: {},
    }, {
      force: true,
    })
  }

  // provide()

  return {
    fieldsInfoGroup,
    fieldsInfoFlat,

    values: form.values,
    errors: form.errors,
    defineField: form.defineField,
    setValues: form.setValues,
    validate: form.validate,
    // resetForm: form.resetForm,
    /**
     * useForm context
     */
    context: form,

    forceResetFormValues,
  }
}

// const {
//   fieldsInfoGroup,
// } = useSharedForm<{
//   a: number
//   b: string
// }, 'foo' | 'bar', 'text' | 'number'>({
//   fieldsInfo: {
//     a: {
//       name: 'a',
//       label: 'A',
//       schema: toTypedSchema(z.string()),
//       type: 'number',
//     }
//   },
//   fieldsData: {
//     a: 1,
//     b: '2',
//   }
// })

// // groupList.value[0].
