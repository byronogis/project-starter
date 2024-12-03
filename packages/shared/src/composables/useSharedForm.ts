import type { MaybeRefOrGetter } from 'vue'
import type {
  SharedFormData,
  SharedFormField,
  SharedFormFields,
  SharedFormGroup,
  SharedFormGroups,
} from '../types/form'
import { useForm } from 'vee-validate'
import { computed, reactive, toValue, watch } from 'vue'
import { sanitizeString } from '../utils'

export * from '../types/form'

// TODO fix type reference
export type { PartialDeep } from 'type-fest'

export function useSharedForm<
  D extends SharedFormData,
  G extends string = never,
  T extends string = never,
  E = Record<string, any>,
>(options: SharedFormOptions<D, G, T, E>) {
  const {
    fields,
    data,
    groups,
  } = options ?? {}

  /**
   * 以组划分的字段信息
   */
  const groupList = computed<SharedFormGroup<D, G, T, E>[]>(() => {
    const _fields = toValue(fields)

    const _groups = (Object.values(_fields) as SharedFormField<Extract<keyof D, string>, D[Extract<keyof D, string>], G, T, E>[])
      .reduce<Record<string, SharedFormGroup<D, G, T, E>>>((acc, field) => {
        const _gid = (field.group ?? '_default') as G

        acc[_gid] ??= {
          id: _gid,
          fields: {},
        }

        acc[_gid].fields[field.name] = {
          ...field,
          // 处理默认值
          type: field.type ?? 'text' as T,
          gridArea: sanitizeString(field.gridArea ?? field.name),
          group: _gid,
        }

        return acc
      }, (toValue(groups) ?? {}) as Record<string, SharedFormGroup<D, G, T, E>>)

    return Object.values(_groups)
      .map(g => ({
        ...g,
        label: g.label ?? g.id,
        priority: g.priority ?? 0,
        formClass: sanitizeString(g.formClass ?? `shared-form-group-${g.id}`),
      })) // 处理默认值
      .sort((a, b) => (b.priority!) - (a.priority!)) // 降序排列
  })

  const form = reactive(useForm<D>({
    //
  }))

  watch(() => toValue(data), (_data) => {
    if (_data) {
      form.setValues(_data as any)
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
      values: {} as any,
    }, {
      force: true,
    })
  }

  return {
    context: form,
    groupList,
    forceResetFormValues,
  }
}

export interface SharedFormOptions<
  /**
   * 表单项类型
   */
  D extends SharedFormData,
  /**
   * 表单分组
   */
  G extends string = never,
  /**
   * 表单项字段支持的类型 \
   */
  T extends string = never,
  /**
   * 表单字段额外配置
   */
  E = Record<string, any>,
> {
  /**
   * 表单字段信息
   */
  fields: MaybeRefOrGetter<Partial<SharedFormFields<D, G, T, E>>>
  /**
   * 表单字段数据
   */
  data?: MaybeRefOrGetter<Partial<D> | undefined>
  /**
   * 表单字段分组信息
   */
  groups?: MaybeRefOrGetter<Partial<SharedFormGroups<D, G, T, E>> | undefined>
}
