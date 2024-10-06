// import type {
//   FilePondOptions,
//   ProcessServerConfigFunction,
// } from 'filepond'
import type {
  TypedSchema,
} from 'vee-validate'

export interface SharedFormOptions<
  /**
   * 表单项类型
   */
  T extends SharedFormItem,
  /**
   * 表单分组
   */
  G = string,
  /**
   * 表单项字段支持的类型  \
   * @default text number textarea select
   */
  P = SharedFormFieldItemType,
  /**
   * 表单字段额外配置
   */
  E = Record<string, any>,
> {
  /**
   * 表单字段信息
   */
  fieldsInfo: MaybeRefOrGetter<Partial<SharedFormFieldsInfo<T, G, P, E>> | SharedFormFieldsInfoGroupItem<T, G, P, E>[]>
  /**
   * 表单字段数据
   */
  fieldsData?: MaybeRefOrGetter<Partial<T> | undefined>
}

/**
 * 表单项
 */
export interface SharedFormItem {
  /**
   * 表单项列表中的唯一标识
   */
  _id: string
  /**
   * 名称, 用于显示
   */
  _label: string
  /**
   * 表单数据
   */
  [key: string]: any
}

/**
 * 表单字段配置项
 */
export interface SharedFormFieldItem<
  K = string,
  V = string,
  G = string,
  P = SharedFormFieldItemType,
  E = Record<string, any>,
> {
  /**
   * 字段名
   */
  name: K
  /**
   * 标签名
   */
  label: string
  /**
   * 字段类型
   * @default 'text'
   */
  type?: P
  /**
   * 初始值
   */
  initialValue?: V
  /**
   * 仅用于针对值的类型的获取(作类型用)
   */
  valueType?: V
  /**
   * 验证规则
   */
  schema: TypedSchema<V>
  /**
   * 是否禁用编辑
   */
  disable?: boolean
  /**
   * 是否隐藏
   */
  hidden?: boolean
  /**
   * 是否自定义模板 \
   * 用于自定义表单项渲染内容(vue 作用域插槽) \
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
  fieldArrayItemFormFieldInfos?: SharedFormFieldsInfo<any>
  /**
   * Grid 布局中的位置 \
   * 用于指示在该表单项的容器上添加的 css grid-area 的值 \
   * NOTE 允许的字符为 a-z, A-Z, 0-9, 下划线, 中横线
   * 其它字符会被替换为下划线 \
   * @default name 的值
   */
  gridArea?: string
  /**
   * 占位文本
   */
  placeholder?: string
  /**
   * 当前用于下拉框(select 类型)的选项
   */
  options?: { label: string, value: any }[]
  /**
   * 当前表单项所属的分组 \
   * NOTE 也会被用于类名, 此时不支持的字符会在添加到类名前被替换为下划线
   * @default '_default'
   */
  group?: SharedFormFieldsGroupName<G>
  /**
   * 其他属性 \
   */
  extra?: E
}

// export type SharedFormFieldFileUploadProcess = (cxt: Parameters<ProcessServerConfigFunction>, extra: {
//   signal: AbortSignal
// }) => Promise<{ url: string, [key: string]: any }>

/**
 * 表单字段类型
 */
export type SharedFormFieldItemType =
  | 'text'
  | 'number'
  | 'textarea'
  | 'select'
  | string
  // | 'select-group'
  // | 'image'
  // | 'images'
  // | 'datetime'
  // | 'json'

/**
 * 表单字段配置信息
 */
export type SharedFormFieldsInfo<
  T extends SharedFormItem,
  G = string,
  P = SharedFormFieldItemType,
  E = Record<string, any>,
> = {
  [K in keyof Partial<T>]: SharedFormFieldItem<K, T[K], G, P, E>
}

/**
 * 表单字段分组项
 */
export interface SharedFormFieldsInfoGroupItem<
  T extends SharedFormItem,
  G = string,
  P = SharedFormFieldItemType,
  E = Record<string, any>,
> {
  /**
   * 分组标题 \
   * 为空时表示默认分组 \
   * 关键词 '_default' 表示默认分组 \
   * 默认用作 formClass 类名后缀 \
   * @deprecated 使用 name 代替
   */
  title?: SharedFormFieldsGroupName<G>
  /**
   * 分组标识 \
   * 为空时表示默认分组 \
   * 关键词 '_default' 表示默认分组 \
   * 默认用作 formClass 类名后缀 \
   * NOTE 允许的字符为 a-z, A-Z, 0-9, 下划线, 中横线
   * 其它字符会被替换为下划线 \
   */
  id: SharedFormFieldsGroupName<G>
  /**
   * 分组名称 \
   * 为空时使用 id 作为名称 \
   * @default id
   */
  name?: string
  /**
   * 包裹表单项的容器的类名 \
   * 默认值使用 title 作为后缀 \
   * @default 'shared-form-fields-group-[title]''
   */
  formClass?: string
  /**
   * 当前分组的字段
   */
  fields: Partial<SharedFormFieldsInfo<T, G, P, E>>
}

export type SharedFormFieldsGroupName<G = string> = '_default' | G
