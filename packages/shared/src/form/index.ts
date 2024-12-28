import type {
  SharedFormData,
  SharedFormField,
  SharedFormFields,
  SharedFormGroup,
  SharedFormGroups,
} from './type'
import { sanitizeString } from '../index'

export type * from './type'

export function define<
  D extends SharedFormData,
  G extends string = never,
  T extends string = never,
  E = Record<string, any>,
>(options: DefineSharedFormOptions<D, G, T, E>) {
  type _SharedFormField = SharedFormField<Extract<keyof D, string>, D[Extract<keyof D, string>], G, T, E>

  const {
    fields,
    groups = {},
    groupDefaultId = '_default',
    identify = 'shared-form',
  } = options ?? {}

  /**
   * 生成表单项分组信息 \
   * 根据优先级降序排序
   */
  function _generateGroupList() {
    const _groups = (Object.values(fields) as _SharedFormField[])
      .reduce<Record<string, SharedFormGroup<D, G, T, E>>>((acc, field) => {
        const _gid = (field.groupId ?? groupDefaultId) as G

        acc[_gid] ??= {
          id: _gid,
        }
        acc[_gid].fields ??= {}
        acc[_gid].fields[field.name] = _standardField(field, _gid)

        return acc
      }, groups)

    return Object.values(_groups)
      .map(g => ({
        ...g,
        label: g.label ?? g.id,
        priority: g.priority ?? 0,
        containerClass: sanitizeString(g.containerClass ?? `${identify}_${g.id}`),
      })) // 处理默认值
      .sort((a, b) => (b.priority!) - (a.priority!))
  }

  /**
   * 规范字段信息
   */
  function _standardField(rawField: _SharedFormField, _gid: G): _SharedFormField {
    const _field: _SharedFormField & Required<Omit<
      _SharedFormField,
    'initialValue' | 'placeholder' | 'arrayFields' | 'cascadeFields' | 'extra'
    >> = {
      // 处理默认值
      disable: false,
      hidden: false,
      custom: false,
      fieldPath: rawField.fieldPath ?? rawField.name,
      gridArea: sanitizeString(rawField.gridArea ?? rawField.fieldPath ?? rawField.name),
      isArray: false,
      isCascade: false,
      groupId: _gid,
      ...rawField,
    }

    const {
      isArray,
      isCascade,
    } = _field

    if (isArray || isCascade) {
      const _fieldsType = isArray ? 'array' : 'cascade'
      const _fieldsKey = isArray ? 'arrayFields' : 'cascadeFields'
      const _fieldSeparator = isArray ? '[].' : '.'

      if (!_field[_fieldsKey]) {
        console.warn(
          `[Form] "${_gid}:${_field.fieldPath}" is marked as ${_fieldsType} but missing ${_fieldsKey} configuration.`,
        )
      }
      else {
        const _fieldPath = _field.fieldPath
        _field[_fieldsKey] = (Object.values(_field[_fieldsKey]) as _SharedFormField[])
          .reduce<Record<string, _SharedFormField>>((acc, _subField) => {
            _subField = {
              ..._subField,
              // 拼接字段路径
              fieldPath: `${_fieldPath}${_fieldSeparator}${_subField.name}`,
            }

            acc[_subField.name] = _standardField(_subField, _gid)
            return acc
          }, {}) as any // 这里用 as any 临时解决类型问题，实际上这个类型是安全的
      }
    }

    return _field
  }

  return {
    /**
     * 以组划分的字段信息
     */
    groupList: _generateGroupList(),
  }
}

export interface DefineSharedFormOptions<
  /**
   * 表单项类型
   */
  D extends SharedFormData,
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
  groups?: Partial<SharedFormGroups<D, G, T, E>> | undefined
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
