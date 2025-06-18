import type { SetRequired } from 'type-fest'
import type {
  SharedFormField,
  SharedFormFields,
  SharedFormGroup,
  SharedFormGroups,
} from './type'
import { sanitizeString } from '../index'

export type * from './type'

export function define<
  D extends object,
  G extends string = never,
  T extends string = never,
  E = Record<string, any>,
>(options: DefineSharedFormOptions<D, G, T, E>) {
  type _SharedFormField = SharedFormField<keyof D & string, D[keyof D & string], G, T, E>
  type _SharedFormFieldWithDefaultKeys = Extract<keyof _SharedFormField, 'label' | 'readonly' | 'disable' | 'hidden' | 'custom' | 'fieldPath' | 'gridArea' | 'isArray' | 'isCascade'>
  type _SharedFormFieldResolved = SetRequired<_SharedFormField, _SharedFormFieldWithDefaultKeys | 'groupId'>

  type _SharedFormGroup = SharedFormGroup<D, G, T, E>
  type _SharedFormGroupResolved = Required<_SharedFormGroup>

  const {
    fields,
    groups = {},
    groupDefaultId = '_default',
    identify = 'shared-form',
  } = options ?? {}

  const resolvedFieldsAndGroups = Object.values<_SharedFormField>(fields as _SharedFormField[])
    .reduce<{
    fields: Record<keyof D & string, _SharedFormFieldResolved>
    groups: Record<G, _SharedFormGroupResolved>
  }>((acc, field) => {
      if (!field) {
        return acc
      }

      const _gid = (field.groupId || groupDefaultId) as G

      acc.groups[_gid] ??= _resolveGroup({
        // @ts-expect-error 类型“G”无法用于索引类型“{}”。ts(2536)
        ...groups[_gid],
        id: _gid,
      })

      const _resolvedField = _resolveField(field, _gid)

      acc.groups[_gid].fields[field.name] = _resolvedField
      acc.fields[field.name] = _resolvedField

      return acc
    }, {
      fields: {},
      groups: {},
    } as any)

  /**
   * 表单项分组列表 \
   * 根据优先级降序排序
   */
  const resolvedGroupList = Object.values<_SharedFormGroupResolved>(resolvedFieldsAndGroups.groups)
    .sort((a, b) => (b.sort) - (a.sort))

  /**
   * 解析字段信息 \
   * 1. 处理默认值 \
   */
  function _resolveField(rawField: _SharedFormField, _gid: G): _SharedFormFieldResolved {
    const _field: _SharedFormFieldResolved = {
      // 处理默认值
      label: rawField.name,
      readonly: false,
      disable: false,
      hidden: false,
      custom: false,
      fieldPath: rawField.name,
      gridArea: sanitizeString({ source: rawField.gridArea ?? rawField.fieldPath ?? rawField.name }),
      isArray: false,
      isCascade: false,
      groupId: _gid,
      ...rawField,
    }

    const {
      arrayFields,
      cascadeFields,
    } = _field

    if (arrayFields || cascadeFields) {
      const _fieldsKey = arrayFields ? 'arrayFields' : 'cascadeFields'
      const _fieldSeparator = arrayFields ? '[].' : '.'

      const _fieldPath = _field.fieldPath
      _field[_fieldsKey] = Object.values<_SharedFormField>(_field[_fieldsKey] as any)
        .reduce<Record<string, _SharedFormField>>((acc, _subField) => {
          _subField = {
            ..._subField,
            // 拼接字段路径
            fieldPath: `${_fieldPath}${_fieldSeparator}${_subField.name}`,
          }

          acc[_subField.name] = _resolveField(_subField, _gid)
          return acc
        }, {}) as any // 这里用 as any 临时解决类型问题，实际上这个类型是安全的
    }

    return _field
  }

  /**
   * 解析分组信息 \
   * 1. 处理默认值 \
   */
  function _resolveGroup(rawGroup: _SharedFormGroup): _SharedFormGroupResolved {
    return {
      label: rawGroup.label ?? rawGroup.id,
      sort: rawGroup.sort ?? rawGroup.priority ?? 0,
      priority: rawGroup.priority ?? 0,
      containerClass: sanitizeString({ source: rawGroup.containerClass ?? `${identify}_${rawGroup.id}` }),
      fields: rawGroup.fields ?? {},
      ...rawGroup,
    }
  }

  return {
    ...resolvedFieldsAndGroups,
    /**
     * 以组划分的字段信息
     */
    groupList: resolvedGroupList,
  }
}

export interface DefineSharedFormOptions<
  /**
   * 表单项类型
   */
  D extends object,
  /**
   * 表单分组
   */
  G extends string = never,
  /**
   * 表单项字段支持的类型 \
   */
  T extends string = never,
  /**
   * 表单字段额外配置
   */
  E = Record<string, any>,
> {
  /**
   * 表单字段信息
   */
  fields: Partial<SharedFormFields<D, G, T, E>>
  /**
   * 表单字段分组信息
   */
  groups?: Partial<SharedFormGroups<D, G, T, E>>
  /**
   * 修改默认分组标识 \
   * @default '_default'
   */
  groupDefaultId?: string
  /**
   * 表单标识 \
   * @default 'shared-form'
   */
  identify?: string

}

export type DefineSharedFormReturns = ReturnType<typeof define>
