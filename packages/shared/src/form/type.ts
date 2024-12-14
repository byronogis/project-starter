import type { ZodSchema } from 'zod'

/**
 * 表单数据
 */
export type SharedFormData<D = object> = {
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
} & D

/**
 * 表单字段项
 */
export interface SharedFormField<
  K extends string = string,
  V = string,
  G extends string = never,
  T extends string = never,
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
   */
  type: SharedFormFieldType<T>
  /**
   * 验证规则
   */
  schema: ZodSchema
  /**
   * 初始值 \
   * 也可用于对于当前字段值的类型推断
   */
  initialValue?: V
  /**
   * 占位文本
   */
  placeholder?: string
  /**
   * 是否禁用编辑
   * @default false
   */
  disable?: boolean
  /**
   * 是否隐藏
   * @default false
   */
  hidden?: boolean
  /**
   * 是否自定义模板 \
   * 用于自定义表单项渲染内容(vue 作用域插槽) \
   * @default false
   */
  custom?: boolean
  /**
   * 字段在表单中的完整路径 \
   * 级联字段的路径使用 `.`分隔 user.name \
   * 数组字段的路径使用 `[].` 分割 users[].name \
   * @readonly
   */
  fieldPath?: string
  /**
   * Grid 布局中的位置 \
   * @default `${identify}_${fieldPath}`
   * @description 不合法的字符会被替换为下划线
   */
  gridArea?: string
  /**
   * 是否为数组字段
   * @default false
   */
  isArray?: boolean
  /**
   * 数组字段元素的字段信息
   * NOTE 在 isArray 为 true 时需要传入
   */
  arrayFields?: V extends Array<infer U extends object>
    ? SharedFormFields<U, G, T, E>
    : never
  /**
   * 是否为级联字段
   * @default false
   */
  isCascade?: boolean
  /**
   * 级联字段的子字段配置
   * NOTE 在 cascade 为 true 时需要传入
   */
  cascadeFields?: V extends object
    ? SharedFormFields<V, G, T, E>
    : never
  /**
   * 当前表单项所属的分组
   * @default '_default''
   */
  groupId?: SharedFormGroupId<G>
  /**
   * 其他属性 \
   */
  extra?: E
}

/**
 * 表单字段项类型 \
 * 内置 `_array` 和 `_cascade` 两个类型, \
 * 可选择用于标识数组字段和级联字段, 目前仅用于类型检查 \
 *
 */
export type SharedFormFieldType<T extends string = never> =
  | '_array'
  | '_cascade'
  | T

/**
 * 表单字段项信息
 */
export type SharedFormFields<
  D extends object,
  G extends string = never,
  T extends string = never,
  E = Record<string, any>,
> = {
  [K in Extract<keyof D, string>]?: SharedFormField<K, D[K], G, T, E>
}

/**
 * 表单字段分组信息
 */
export type SharedFormGroups<
  D extends SharedFormData,
  G extends string = never,
  T extends string = never,
  E = Record<string, any>,
> = {
  [K in SharedFormGroupId<G>]: SharedFormGroup<D, K, T, E>
}

/**
 * 表单字段分组项
 */
export interface SharedFormGroup<
  D extends SharedFormData,
  G extends string,
  T extends string = never,
  E = Record<string, any>,
> {
  /**
   * 分组标识 \
   * 为空时表示默认分组 '_default' \
   * 默认用作 containerClass 类名后缀 \
   */
  id: G
  /**
   * 数组名称 \
   * 为空时使用 id 作为名称 \
   * @default id
   */
  label?: string
  /**
   * 优先级 \
   * 字越大优先级越高，越靠前 \
   * @default 0
   */
  priority?: number
  /**
   * 包裹表单项的容器的类名 \
   * @default `${identify}_${id}`
   * @description 不合法的字符会被替换为下划线
   */
  containerClass?: string
  /**
   * 当前分组的字段
   */
  fields?: Partial<SharedFormFields<D, G, T, E>>
}

/**
 * 表单字段分组项名称 \
 * NOTE 默认也会被用于类名, 此时不支持的字符会在添加到类名前被替换为下划线 \
 * 内置 `_default` 用于默认分组 \
 */
export type SharedFormGroupId<G extends string = never> =
  | '_default'
  | G
