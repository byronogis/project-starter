import type {
  DefineSharedFormOptions,
  SharedFormData,
  // SharedFormField,
  SharedFormFields,
  SharedFormGroup,
  SharedFormGroups,
} from '@project-starter/shared'
import type {
  FilePondOptions,
  ProcessServerConfigFunction,
} from 'filepond'
import type { MaybeRefOrGetter } from 'vue'
import {
  defineSharedForm,
} from '@project-starter/shared'
import { useForm } from 'vee-validate'

// TODO fix type reference
export type { PartialDeep } from 'type-fest'

export function usePrimoForm<
  D extends PrimoFormData,
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
  D extends SharedFormData,
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
 * Primo 表单数据
 */
export type PrimoFormData<D = object> = SharedFormData<D>

/**
 * Primo 表单字段配置
 */
export type PrimoFormFields<
  D extends PrimoFormData = PrimoFormData,
  G extends string = never,
> = SharedFormFields<
  D,
  G,
  PrimoFormFieldType,
  PrimoFormFieldExtra
>

export type PrimoFormGroups<
  D extends PrimoFormData = PrimoFormData,
  G extends string = never,
> = SharedFormGroups<
  D,
  G,
  PrimoFormFieldType,
  PrimoFormFieldExtra
>

export type PrimoFormGroup<
  D extends PrimoFormData = PrimoFormData,
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
