import type {
  FilePondOptions,
  ProcessServerConfigFunction,
} from 'filepond'

/**
 * Primo 表单项
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
}

export type PrimoFormFieldFileUploadProcess = (cxt: Parameters<ProcessServerConfigFunction>, extra: {
  signal: AbortSignal
}) => Promise<{ url: string, [key: string]: any }>
