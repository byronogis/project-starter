import type {
  FilePondOptions,
  ProcessServerConfigFunction,
} from 'filepond'
import type {
  TypedSchema,
} from 'vee-validate'

export interface CrudItem {
  _id: string
  _name: string
  // [key: string]: any
}

export interface CrudFormFieldItem<T = string, V = string, G = any> {
  /**
   * 字段名
   */
  name: T
  /**
   * 标签名
   */
  label: string
  /**
   * 字段类型
   * @default 'text'
   */
  type?: CrudFormFieldItemType
  /**
   * 初始值
   */
  initialValue?: V
  /**
   * 仅用于针对值的类型的获取
   */
  valueType?: V
  /**
   * 验证规则
   */
  schema: TypedSchema<V>
  /**
   * 是否可编辑
   */
  disable?: boolean
  /**
   * 是否显示
   */
  hidden?: boolean
  /**
   * 是否自定义模板
   * NOTE 需要使用单独的组件配合 useField 作为插槽内容, 以使得 useForm 上下文生效 (provide/inject) /
   * NOTE 或手动传入 form: FormContext
   */
  custom?: boolean
  /**
   * 是否为数组字段
   */
  fieldArray?: boolean
  /**
   * 数组字段元素的字段信息 \
   * TODO fix types \
   * NOTE 在 fieldArray 为 true 时必须传入
   */
  //
  fieldArrayItemFormFieldInfos?: CrudFormFieldsInfo<any>
  /**
   * Grid 布局中的位置
   * @default name 的值
   */
  gridArea?: string
  /**
   * 传递给表单组件的 props / attrs
   */
  props?: Record<string, any>
  /**
   * 占位文本
   */
  placeholder?: string
  /**
   * 当前用于下拉框的选项
   */
  options?: { label: string, value: any }[]
  /**
   * file upload process
   * @see ~/component/uploader.vue:props:serverProcessCallback
   */
  fileUploadProcess?: CrudFormFieldFileUploadProcess
  /**
   * 当前表单项所属的分组 \
   * NOTE 空格会在添加类名时被替换为下划线
   * @default '_default'
   */
  group?: '_default' | G
  /**
   * 上传组件的 props \
   * 目前在 image 类型中传递给 Uploader 组件使用
   */
  uploaderProps?: FilePondOptions & {
    [key: string]: any
  }
}

export type CrudFormFieldFileUploadProcess = (cxt: Parameters<ProcessServerConfigFunction>, extra: {
  signal: AbortSignal
}) => Promise<{ url: string, [key: string]: any }>

export type CrudFormFieldItemType =
  | 'text'
  | 'number'
  | 'textarea'
  | 'select'
  | 'select-group'
  | 'image'
  | 'images'
  | 'datetime'
  | 'json'

export type CrudFormFieldsInfoCombind<T extends CrudItem, G = any> = CrudFormFieldsInfo<T, G> | CrudFormFieldsInfoGroup<T, G>

export type CrudFormFieldsInfo<T extends CrudItem, G = any> = {
  [K in keyof Partial<T>]: CrudFormFieldItem<K, T[K], G>
}

export type CrudFormFieldsInfoGroup<T extends CrudItem, G = any> = CrudFormFieldsInfoGroupItem<T, G>[]

export interface CrudFormFieldsInfoGroupItem<T extends CrudItem, G = any> {
  /**
   * 分组标题
   * 为空时表示不分组
   * 关键词 '_default' 表示默认分组(不分组)
   */
  title: '_default' | G
  /**
   * 包裹表单项的容器的类名
   * @default 'component-curd-form-fields-group-[title]''
   */
  formClass?: string
  /**
   * 当前分组的字段
   */
  fields: Partial<CrudFormFieldsInfo<T, G>>
}
