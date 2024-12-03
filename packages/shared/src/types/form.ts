import type { ZodSchema } from 'zod'

/**
 * 表单数据
 */
export type SharedFormData<T = object> = {
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
} & T

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
   * @default 'text'
   */
  type?: SharedFormFieldType<T>
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
  schema: ZodSchema
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
  fieldArrayItemFormFields?: SharedFormFields<any, G, T>
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
   * 当前表单项所属的分组
   * @default SharedFormGroupDefaultId
   */
  group?: SharedFormGroupId<G>
  /**
   * 其他属性 \
   */
  extra?: E
}

/**
 * 表单字段项类型
 */
export type SharedFormFieldType<T extends string = never> =
  | T

/**
 * 表单字段项信息
 */
export type SharedFormFields<
  D extends SharedFormData,
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
   * 为空时表示默认分组 \
   * 默认用作 formClass 类名后缀 \
   */
  id: G
  /**
   * 分组名称 \
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
   * 默认值使用 id 作为后缀 \
   * NOTE 允许的字符为 a-z, A-Z, 0-9, 下划线, 中横线 \
   * 其它字符会被替换为下划线 \
   * @default 'shared-form-group-[id]'
   */
  formClass?: string
  /**
   * 当前分组的字段
   */
  fields: Partial<SharedFormFields<D, G, T, E>>
}

/**
 * 表单字段分组项名称 \
 * NOTE 默认也会被用于类名, 此时不支持的字符会在添加到类名前被替换为下划线
 */
export type SharedFormGroupId<G extends string = never> =
  | G
