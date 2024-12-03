import type {
  FilePondOptions,
  ProcessServerConfigFunction,
} from 'filepond'

/**
 * Sakai 表单项
 */
export type SakaiFormData<D = object> = SharedFormData<D>

/**
 * Sakai 表单字段配置
 */
export type SakaiFormFields<
  D extends SakaiFormData = SakaiFormData,
  G extends string = never,
> = SharedFormFields<
  D,
  G,
  SakaiFormFieldType,
  SakaiFormFieldExtra
>

export type SakaiFormGroups<
  D extends SakaiFormData = SakaiFormData,
  G extends string = never,
> = SharedFormGroups<
  D,
  G,
  SakaiFormFieldType,
  SakaiFormFieldExtra
>

export type SakaiFormGroup<
  D extends SakaiFormData = SakaiFormData,
  G extends string = never,
> = SharedFormGroup<
  D,
  G,
  SakaiFormFieldType,
  SakaiFormFieldExtra
>

export type SakaiFormFieldType =
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

export interface SakaiFormFieldExtra {
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
  fileUploadProcess?: SakaiFormFieldFileUploadProcess
  /**
   * 上传组件的 props \
   * 目前在 image 类型中传递给 Uploader 组件使用
   * TODO 需要考虑传递位置以通用
   */
  uploaderProps?: FilePondOptions & {
    [key: string]: any
  }
}

export type SakaiFormFieldFileUploadProcess = (cxt: Parameters<ProcessServerConfigFunction>, extra: {
  signal: AbortSignal
}) => Promise<{ url: string, [key: string]: any }>
