import type { ZodSchema } from 'zod'

/**
 * 表单数据
 * @deprecated
 */
export type SharedFormData<D = Record<string, any>> = {
  /**
   * 当前表单的唯一标识
   * @deprecated 基础类型中不需要放入此属性, 可选择使用时自行定义
   */
  _id?: string
  /**
   * 当前表单的名称, 用于显示
   * @deprecated 基础类型中不需要放入此属性, 可选择使用时自行定义
   */
  _label?: string
  /**
   * 表单数据
   */
} & D

/**
 * 表单字段项
 */
export interface SharedFormField<
  K extends string,
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
   * 标签名 \
   * 如果未设置则使用 name 的值作为标签名 \
   * @default name
   */
  label?: string
  /**
   * 字段类型
   */
  type: SharedFormFieldType<T>
  /**
   * 验证规则
   */
  schema?: ZodSchema
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
   * 是否只读 \
   * @default false
   */
  readonly?: boolean
  /**
   * 是否禁用
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
   * @deprecated 基础类型中不需要放入此属性, 可选择使用时自行定义
   */
  custom?: boolean
  /**
   * 字段在表单中的完整路径 \
   * 级联字段的路径使用 `.`分隔 user.name \
   * 数组字段的路径使用 `[].` 分隔 users[].name \
   * @readonly
   */
  fieldPath?: string
  /**
   * Grid 布局中的位置 \
   * @default `${fieldPath}` ?? `${name}`
   * @description 不合法的字符会被替换为下划线
   * @deprecated 基础类型中不需要放入此属性, 可选择使用时自行定义
   */
  gridArea?: string
  /**
   * 是否为数组字段
   * @default false
   * @deprecated 并入 arrayFields 属性中, 直接判断 `arrayFields` 是否存在即可 \
   */
  isArray?: boolean
  /**
   * 数组字段元素的字段信息
   */
  arrayFields?: V extends Array<infer U extends object>
    ? SharedFormFields<U, G, T, E>
    : never
  /**
   * 是否为级联字段
   * @default false
   * @deprecated 并入 cascadeFields 属性中, 直接判断 `cascadeFields` 是否存在即可 \
   */
  isCascade?: boolean
  /**
   * 级联字段的子字段配置
   */
  cascadeFields?: V extends object
    ? SharedFormFields<V, G, T, E>
    : never
  /**
   * 当前表单项所属的分组
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
  [K in keyof D & string]: SharedFormField<K, D[K], G, T, E>
}

/**
 * 表单字段分组信息
 */
export type SharedFormGroups<
  D extends object,
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
  D extends object,
  G extends string = never,
  T extends string = never,
  E = Record<string, any>,
> {
  /**
   * 分组标识 \
   */
  id: G
  /**
   * 分组名称 \
   * 为空时使用 id 的值作为名称 \
   * @default id
   */
  label?: string
  /**
   * 分组排序 \
   * 数字越大越靠前 \
   * @default 0
   */
  sort?: number
  /**
   * 优先级 \
   * 数字越大优先级越高，越靠前 \
   * @default 0
   * @deprecated 使用 sort 替代
   */
  priority?: number
  /**
   * 包裹表单项的容器的类名 \
   * @default `${identify}_${id}`
   * @description 不合法的字符会被替换为下划线
   * @deprecated 基础类型中不需要放入此属性, 可选择使用时自行定义
   */
  containerClass?: string
  /**
   * 当前分组的字段
   */
  fields?: Partial<SharedFormFields<D, G, T, E>>
}

/**
 * 表单字段分组项标识 \
 * 内置 `_default` 用于默认分组 \
 */
export type SharedFormGroupId<G extends string = never> =
  | '_default'
  | G
