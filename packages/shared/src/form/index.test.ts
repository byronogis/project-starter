import type { SharedFormData } from './type'
import { describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { defineSharedForm } from './index'

// 定义基本的表单字段类型
type BaseFieldType = 'text' | 'number' | 'array' | 'object' | 'select'

describe('defineSharedForm', () => {
  // 基本表单配置测试
  it('should handle basic form fields', () => {
    interface TestForm extends SharedFormData {
      name: string
      age: number
    }

    const form = defineSharedForm<TestForm, never, BaseFieldType>({
      fields: {
        name: {
          name: 'name',
          label: '姓名',
          type: 'text',
          schema: z.string(),
        },
        age: {
          name: 'age',
          label: '年龄',
          type: 'number',
          schema: z.number(),
        },
      },
    })

    expect(form.groupList).toHaveLength(1)
    expect(form.groupList[0]!.id).toBe('_default')
    expect(Object.keys(form.groupList[0]!.fields!)).toHaveLength(2)
    expect(form.groupList[0]!.fields!.name!.fieldPath).toBe('name')
    expect(form.groupList[0]!.fields!.name!.gridArea).toBe('name')
    expect(form.groupList[0]!.fields!.age!.fieldPath).toBe('age')
    expect(form.groupList[0]!.fields!.age!.gridArea).toBe('age')
  })

  // 分组功能测试
  it('should handle grouped fields', () => {
    interface TestForm extends SharedFormData {
      name: string
      age: number
      address: string
    }

    const form = defineSharedForm<TestForm, 'basic' | 'contact', BaseFieldType>({
      fields: {
        name: {
          name: 'name',
          label: '姓名',
          type: 'text',
          schema: z.string(),
          groupId: 'basic',
        },
        age: {
          name: 'age',
          label: '年龄',
          type: 'number',
          schema: z.number(),
          groupId: 'basic',
        },
        address: {
          name: 'address',
          label: '地址',
          type: 'text',
          schema: z.string(),
          groupId: 'contact',
        },
      },
      groups: {
        basic: {
          id: 'basic',
          label: '基本信息',
          priority: 2,
        },
        contact: {
          id: 'contact',
          label: '联系方式',
          priority: 1,
        },
      },
    })

    expect(form.groupList).toHaveLength(2)
    expect(form.groupList[0]!.id).toBe('basic')
    expect(form.groupList[1]!.id).toBe('contact')
    expect(form.groupList[0]!.fields!.name!.fieldPath).toBe('name')
    expect(form.groupList[0]!.fields!.name!.gridArea).toBe('name')
    expect(form.groupList[1]!.fields!.address!.fieldPath).toBe('address')
    expect(form.groupList[1]!.fields!.address!.gridArea).toBe('address')
  })

  // 数组字段测试
  it('should handle array fields', () => {
    interface TestForm extends SharedFormData {
      hobbies: Array<{ name: string, level: number }>
    }

    const form = defineSharedForm<TestForm, never, BaseFieldType>({
      fields: {
        hobbies: {
          name: 'hobbies',
          label: '爱好',
          type: 'array',
          schema: z.array(z.object({ name: z.string(), level: z.number() })),
          isArray: true,
          arrayFields: {
            name: {
              name: 'name',
              label: '爱好名称',
              type: 'text',
              schema: z.string(),
            },
            level: {
              name: 'level',
              label: '熟练度',
              type: 'number',
              schema: z.number(),
            },
          },
        },
      },
    })

    expect(form.groupList[0]!.fields!.hobbies!.fieldPath).toBe('hobbies')
    expect(form.groupList[0]!.fields!.hobbies!.gridArea).toBe('hobbies')
    expect(form.groupList[0]!.fields!.hobbies!.isArray).toBe(true)
    expect(Object.keys(form.groupList[0]!.fields!.hobbies!.arrayFields!)).toHaveLength(2)
    expect(form.groupList[0]!.fields!.hobbies!.arrayFields!.name!.fieldPath).toBe('hobbies[].name')
    expect(form.groupList[0]!.fields!.hobbies!.arrayFields!.name!.gridArea).toBe('hobbies___name')
    expect(form.groupList[0]!.fields!.hobbies!.arrayFields!.level!.fieldPath).toBe('hobbies[].level')
    expect(form.groupList[0]!.fields!.hobbies!.arrayFields!.level!.gridArea).toBe('hobbies___level')
  })

  // 级联字段测试
  it('should handle cascade fields', () => {
    interface TestForm extends SharedFormData {
      user: {
        name: string
        age: number
      }
    }

    const form = defineSharedForm<TestForm, never, BaseFieldType>({
      fields: {
        user: {
          name: 'user',
          label: '用户信息',
          type: 'object',
          schema: z.object({ name: z.string(), age: z.number() }),
          isCascade: true,
          cascadeFields: {
            name: {
              name: 'name',
              label: '姓名',
              type: 'text',
              schema: z.string(),
            },
            age: {
              name: 'age',
              label: '年龄',
              type: 'number',
              schema: z.number(),
            },
          },
        },
      },
    })

    expect(form.groupList[0]!.fields!.user!.fieldPath).toBe('user')
    expect(form.groupList[0]!.fields!.user!.gridArea).toBe('user')
    expect(form.groupList[0]!.fields!.user!.isCascade).toBe(true)
    expect(form.groupList[0]!.fields!.user!.cascadeFields!.name!.fieldPath).toBe('user.name')
    expect(form.groupList[0]!.fields!.user!.cascadeFields!.name!.gridArea).toBe('user_name')
    expect(form.groupList[0]!.fields!.user!.cascadeFields!.age!.fieldPath).toBe('user.age')
    expect(form.groupList[0]!.fields!.user!.cascadeFields!.age!.gridArea).toBe('user_age')
  })

  // 自定义配置测试
  it('should handle custom identify and groupDefaultId', () => {
    interface TestForm extends SharedFormData {
      name: string
    }

    const form = defineSharedForm<TestForm, never, BaseFieldType>({
      fields: {
        name: {
          name: 'name',
          label: '姓名',
          type: 'text',
          schema: z.string(),
        },
      },
      identify: 'test-form',
      groupDefaultId: 'main',
    })

    expect(form.groupList[0]!.id).toBe('main')
    expect(form.groupList[0]!.containerClass).toBe('test-form_main')
    expect(form.groupList[0]!.fields!.name!.fieldPath).toBe('name')
    expect(form.groupList[0]!.fields!.name!.gridArea).toBe('name')
  })

  // 添加自定义 gridArea 的测试
  it('should handle custom gridArea', () => {
    interface TestForm extends SharedFormData {
      email: string
    }

    const form = defineSharedForm<TestForm, never, BaseFieldType>({
      fields: {
        email: {
          name: 'email',
          label: '邮箱',
          type: 'text',
          schema: z.string(),
          gridArea: 'custom-email-area',
        },
      },
    })

    expect(form.groupList[0]!.fields!.email!.fieldPath).toBe('email')
    expect(form.groupList[0]!.fields!.email!.gridArea).toBe('custom-email-area')
  })

  // 嵌套级联字段测试
  it('should handle nested cascade fields', () => {
    interface TestForm extends SharedFormData {
      company: {
        info: {
          name: string
          address: string
        }
        contact: {
          phone: string
          email: string
        }
      }
    }

    const form = defineSharedForm<TestForm, never, BaseFieldType>({
      fields: {
        company: {
          name: 'company',
          label: '公司',
          type: 'object',
          schema: z.object({
            info: z.object({ name: z.string(), address: z.string() }),
            contact: z.object({ phone: z.string(), email: z.string() }),
          }),
          isCascade: true,
          cascadeFields: {
            info: {
              name: 'info',
              label: '基本信息',
              type: 'object',
              schema: z.object({ name: z.string(), address: z.string() }),
              isCascade: true,
              cascadeFields: {
                name: {
                  name: 'name',
                  label: '公司名称',
                  type: 'text',
                  schema: z.string(),
                },
                address: {
                  name: 'address',
                  label: '公司地址',
                  type: 'text',
                  schema: z.string(),
                },
              },
            },
            contact: {
              name: 'contact',
              label: '联系方式',
              type: 'object',
              schema: z.object({ phone: z.string(), email: z.string() }),
              isCascade: true,
              cascadeFields: {
                phone: {
                  name: 'phone',
                  label: '电话',
                  type: 'text',
                  schema: z.string(),
                },
                email: {
                  name: 'email',
                  label: '邮箱',
                  type: 'text',
                  schema: z.string(),
                },
              },
            },
          },
        },
      },
    })

    const companyField = form.groupList[0]!.fields!.company!
    expect(companyField.cascadeFields!.info!.cascadeFields!.name!.fieldPath).toBe('company.info.name')
    expect(companyField.cascadeFields!.info!.cascadeFields!.name!.gridArea).toBe('company_info_name')
    expect(companyField.cascadeFields!.contact!.cascadeFields!.email!.fieldPath).toBe('company.contact.email')
    expect(companyField.cascadeFields!.contact!.cascadeFields!.email!.gridArea).toBe('company_contact_email')
  })

  // 多层级数组字段测试
  it('should handle nested array fields', () => {
    interface TestForm extends SharedFormData {
      departments: Array<{
        name: string
        employees: Array<{
          name: string
          role: string
        }>
      }>
    }

    const form = defineSharedForm<TestForm, never, BaseFieldType>({
      fields: {
        departments: {
          name: 'departments',
          label: '部门',
          type: 'array',
          schema: z.array(z.object({
            name: z.string(),
            employees: z.array(z.object({ name: z.string(), role: z.string() })),
          })),
          isArray: true,
          arrayFields: {
            name: {
              name: 'name',
              label: '部门名称',
              type: 'text',
              schema: z.string(),
            },
            employees: {
              name: 'employees',
              label: '员工',
              type: 'array',
              schema: z.array(z.object({ name: z.string(), role: z.string() })),
              isArray: true,
              arrayFields: {
                name: {
                  name: 'name',
                  label: '员工姓名',
                  type: 'text',
                  schema: z.string(),
                },
                role: {
                  name: 'role',
                  label: '职位',
                  type: 'text',
                  schema: z.string(),
                },
              },
            },
          },
        },
      },
    })

    const deptField = form.groupList[0]!.fields!.departments!
    expect(deptField.arrayFields!.name!.fieldPath).toBe('departments[].name')
    expect(deptField.arrayFields!.name!.gridArea).toBe('departments___name')
    expect(deptField.arrayFields!.employees!.arrayFields!.name!.fieldPath).toBe('departments[].employees[].name')
    expect(deptField.arrayFields!.employees!.arrayFields!.name!.gridArea).toBe('departments___employees___name')
    expect(deptField.arrayFields!.employees!.arrayFields!.role!.fieldPath).toBe('departments[].employees[].role')
    expect(deptField.arrayFields!.employees!.arrayFields!.role!.gridArea).toBe('departments___employees___role')
  })

  // 混合嵌套测试
  it('should handle mixed nested fields (cascade + array)', () => {
    interface TestForm extends SharedFormData {
      organization: {
        name: string
        branches: Array<{
          location: string
          teams: Array<{ name: string }>
        }>
      }
    }

    const form = defineSharedForm<TestForm, never, BaseFieldType>({
      fields: {
        organization: {
          name: 'organization',
          label: '组织',
          type: 'object',
          schema: z.object({
            name: z.string(),
            branches: z.array(z.object({
              location: z.string(),
              teams: z.array(z.object({ name: z.string() })),
            })),
          }),
          isCascade: true,
          cascadeFields: {
            name: {
              name: 'name',
              label: '组织名称',
              type: 'text',
              schema: z.string(),
            },
            branches: {
              name: 'branches',
              label: '分支机构',
              type: 'array',
              schema: z.array(z.object({
                location: z.string(),
                teams: z.array(z.object({ name: z.string() })),
              })),
              isArray: true,
              arrayFields: {
                location: {
                  name: 'location',
                  label: '地址',
                  type: 'text',
                  schema: z.string(),
                },
                teams: {
                  name: 'teams',
                  label: '团队',
                  type: 'array',
                  schema: z.array(z.object({ name: z.string() })),
                  isArray: true,
                  arrayFields: {
                    name: {
                      name: 'name',
                      label: '团队名称',
                      type: 'text',
                      schema: z.string(),
                    },
                  },
                },
              },
            },
          },
        },
      },
    })

    const orgField = form.groupList[0]!.fields!.organization!
    expect(orgField.cascadeFields!.name!.fieldPath).toBe('organization.name')
    expect(orgField.cascadeFields!.name!.gridArea).toBe('organization_name')
    const branchField = orgField.cascadeFields!.branches!
    expect(branchField.arrayFields!.location!.fieldPath).toBe('organization.branches[].location')
    const teamField = branchField.arrayFields!.teams!
    expect(teamField.arrayFields!.name!.fieldPath).toBe('organization.branches[].teams[].name')
    expect(teamField.arrayFields!.name!.gridArea).toBe('organization_branches___teams___name')
  })

  // 不合法字符替换测试
  it('should sanitize illegal characters in gridArea', () => {
    interface TestForm extends SharedFormData {
      'user/name': string
      '@email': string
    }

    const form = defineSharedForm<TestForm, never, BaseFieldType>({
      fields: {
        'user/name': {
          name: 'user/name',
          label: '用户名',
          type: 'text',
          schema: z.string(),
        },
        '@email': {
          name: '@email',
          label: '邮箱',
          type: 'text',
          schema: z.string(),
        },
      },
    })

    expect(form.groupList[0]!.fields!['user/name']!.gridArea).toBe('user_name')
    expect(form.groupList[0]!.fields!['@email']!.gridArea).toBe('_email')
  })

  // 验证缺少配置的警告
  it('should warn when array/cascade fields missing configuration', () => {
    const consoleSpy = vi.spyOn(console, 'warn')
    interface TestForm extends SharedFormData {
      items: Array<{ name: string }>
      users: Array<{ name: string }>
      company: { name: string }
      branch: { name: string }
    }

    defineSharedForm<TestForm, 'data' | 'info', BaseFieldType>({
      fields: {
        items: {
          name: 'items',
          label: '项目',
          type: 'array',
          schema: z.array(z.object({ name: z.string() })),
          isArray: true,
          // 缺少 arrayFields
        },
        users: {
          name: 'users',
          label: '用户列表',
          type: 'array',
          schema: z.array(z.object({ name: z.string() })),
          isArray: true,
          groupId: 'data',
          // 缺少 arrayFields
        },
        company: {
          name: 'company',
          label: '公司',
          type: 'object',
          schema: z.object({ name: z.string() }),
          isCascade: true,
          // 缺少 cascadeFields
        },
        branch: {
          name: 'branch',
          label: '分公司',
          type: 'object',
          schema: z.object({ name: z.string() }),
          isCascade: true,
          groupId: 'info',
          // 缺少 cascadeFields
        },
      },
      groups: {
        data: {
          id: 'data',
          label: '数据组',
        },
        info: {
          id: 'info',
          label: '信息组',
        },
      },
    })

    expect(consoleSpy).toHaveBeenCalledTimes(4)
    expect(consoleSpy).toHaveBeenCalledWith(
      '[Form] "_default:items" is marked as array but missing arrayFields configuration.',
    )
    expect(consoleSpy).toHaveBeenCalledWith(
      '[Form] "data:users" is marked as array but missing arrayFields configuration.',
    )
    expect(consoleSpy).toHaveBeenCalledWith(
      '[Form] "_default:company" is marked as cascade but missing cascadeFields configuration.',
    )
    expect(consoleSpy).toHaveBeenCalledWith(
      '[Form] "info:branch" is marked as cascade but missing cascadeFields configuration.',
    )
  })

  // Select类型和额外选项测试
  it('should handle select type with options in extra', () => {
    interface TestForm extends SharedFormData {
      gender: string
      role: string
    }

    interface SelectExtra {
      options: Array<{
        label: string
        value: string | number
      }>
    }

    const form = defineSharedForm<TestForm, never, BaseFieldType, SelectExtra>({
      fields: {
        gender: {
          name: 'gender',
          label: '性别',
          type: 'select',
          schema: z.string(),
          extra: {
            options: [
              { label: '男', value: 'male' },
              { label: '女', value: 'female' },
              { label: '其他', value: 'other' },
            ],
          },
        },
        role: {
          name: 'role',
          label: '角色',
          type: 'select',
          schema: z.string(),
          extra: {
            options: [
              { label: '管理员', value: 'admin' },
              { label: '用户', value: 'user' },
              { label: '访客', value: 'guest' },
            ],
          },
        },
      },
    })

    const fields = form.groupList[0]!.fields!
    expect(fields.gender!.type).toBe('select')
    expect(fields.gender!.extra!.options).toHaveLength(3)
    expect(fields.gender!.extra!.options[0]).toEqual({ label: '男', value: 'male' })

    expect(fields.role!.type).toBe('select')
    expect(fields.role!.extra!.options).toHaveLength(3)
    expect(fields.role!.extra!.options[0]).toEqual({ label: '管理员', value: 'admin' })
  })
})
