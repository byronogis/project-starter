import type {
  DefineSharedFormOptions,
  SharedFormField,
  SharedFormFields,
  SharedFormGroup,
  SharedFormGroups,
} from '@project-starter/shared/form/index'
import type {
  FilePondOptions,
  ProcessServerConfigFunction,
} from 'filepond'
import type { MaybeRefOrGetter } from 'vue'
import {
  define as defineSharedForm,
} from '@project-starter/shared/form/index'
import { useForm } from 'vee-validate'

// TODO fix type reference
export type { PartialDeep } from 'type-fest'

export function usePrimoForm<
  D extends object,
  G extends string = never,
>(options: PrimoFormOptions<D, G>) {
  const {
    data,
    ...defineOpts
  } = options

  const groupList = ref<PrimoFormGroup<D, G>[]>([])

  watch(() => reactive(defineOpts), (_opts) => {
    const {
      groupList: _groupList,
    } = defineSharedForm<D, G>(Object.entries(_opts).reduce((acc, [key, value]) => {
      acc[key] = toValue(value)
      return acc
    }, {} as any))
    groupList.value = _groupList
  }, { immediate: true, deep: true })

  const form = reactive(useForm<D>({
    //
  }))

  watch(() => toValue(data), (_data) => {
    if (_data) {
      form.setValues(_data as any)
    }
    else {
      _forceResetFormValues()
    }
  }, {
    deep: true,
    immediate: true,
  })

  function _forceResetFormValues() {
    form.resetForm({
      values: {} as any,
    }, {
      force: true,
    })
  }

  return {
    context: form,
    groupList,
    forceResetFormValues: _forceResetFormValues,
  }
}

export type PrimoFormOptions<
  D extends object,
  G extends string = never,
> = {
  [K in keyof DefineSharedFormOptions<D, G, PrimoFormFieldType, PrimoFormFieldExtra>]:
  MaybeRefOrGetter<DefineSharedFormOptions<D, G, PrimoFormFieldType, PrimoFormFieldExtra>[K]>
} & {
  /**
   * 表单字段数据
   */
  data?: MaybeRefOrGetter<Partial<D> | undefined>
}

export type PrimoFormReturns = ReturnType<typeof usePrimoForm>

/**
 * extend shared form types
 * SharedFormField -> PrimoFormField
 * SharedFormFields -> PrimoFormFields
 * SharedFormGroup -> PrimoFormGroup
 * SharedFormGroups -> PrimoFormGroups
 * SharedFormFieldType -> PrimoFormFieldType
 * SharedFormFieldExtra -> PrimoFormFieldExtra
 */

export type PrimoFormField<V = any> = SharedFormField<any, V, any, PrimoFormFieldType, PrimoFormFieldExtra>

export type PrimoFormFields<
  D extends object = object,
  G extends string = never,
> = SharedFormFields<
  D,
  G,
  PrimoFormFieldType,
  PrimoFormFieldExtra
>

export type PrimoFormGroups<
  D extends object = object,
  G extends string = never,
> = SharedFormGroups<
  D,
  G,
  PrimoFormFieldType,
  PrimoFormFieldExtra
>

export type PrimoFormGroup<
  D extends object = object,
  G extends string = never,
> = SharedFormGroup<
  D,
  G,
  PrimoFormFieldType,
  PrimoFormFieldExtra
>

export type PrimoFormFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'password'
  | 'select'
  | 'select-group'
  | 'multi-select'
  | 'multi-select-group'
  | 'slider'
  | 'image'
  | 'images'
  | 'datetime'
  | 'json'

export interface PrimoFormFieldExtra {
  /**
   * 是否自定义模板 \
   * 用于自定义表单项渲染内容(vue 作用域插槽) \
   */
  custom?: boolean
  /**
   * Grid 布局中的位置 \
   * @default `${fieldPath}` ?? `${name}`
   * @description 不合法的字符会被替换为下划线
   */
  gridArea?: string
  /**
   * 传递给表单组件的 props / attrs \
   * TODO 需要考虑传递位置以通用
   */
  props?: Record<string, any>
  /**
   * file upload process
   * @see ~/component/uploader.vue:props:serverProcessCallback
   * TODO 需要考虑传递位置以通用
   */
  fileUploadProcess?: PrimoFormFieldFileUploadProcess
  /**
   * 上传组件的 props \
   * 目前在 image 类型中传递给 Uploader 组件使用
   * TODO 需要考虑传递位置以通用
   */
  uploaderProps?: FilePondOptions & {
    [key: string]: any
  }
  /**
   * 当前用于下拉框(select 类型)的选项
   */
  options?: MaybeRefOrGetter<{
    label: string
    value: any
    [key: string]: any
  }[]>
}

export type PrimoFormFieldFileUploadProcess = (cxt: Parameters<ProcessServerConfigFunction>, extra: {
  signal: AbortSignal
}) => Promise<{ url: string, [key: string]: any }>
