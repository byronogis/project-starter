import type {
  FilePondOptions,
  ProcessServerConfigFunction,
} from 'filepond'

/**
 * Sakai 表单项
 */
export type SakaiFormItem = SharedFormItem & {
  //
}

/**
 * Sakai 表单字段配置
 */
export type SakaiFormFieldInfo<
  T extends SakaiFormItem = SakaiFormItem,
  G = string,
> = SharedFormFieldsInfo<
  T,
  G,
  SakaiFormFieldItemType,
  SakaiFormFieldItemExtra
>

export type SakaiFormFieldsInfoGroupItem<
  T extends SakaiFormItem = SakaiFormItem,
  G = string,
> = SharedFormFieldsInfoGroupItem<
  T,
  G,
  SakaiFormFieldItemType,
  SakaiFormFieldItemExtra
>

export type SakaiFormFieldItemType = SharedFormFieldItemType
  | 'select-group'
  | 'multi-select'
  | 'multi-select-group'
  | 'slider'
  | 'image'
  | 'images'
  | 'datetime'
  | 'json'

export interface SakaiFormFieldItemExtra {
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
