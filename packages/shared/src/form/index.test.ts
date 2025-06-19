import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { define as defineSharedForm } from './index'

// 定义基本的表单字段类型
type BaseFieldType = 'text' | 'number' | 'array' | 'object' | 'select'

describe('defineSharedForm', () => {
  // 基本表单配置测试
  it('should handle basic form fields', () => {
    interface TestForm {
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
    expect(form.groupList[0]!.fields!.age!.fieldPath).toBe('age')
  })

  // 分组功能测试
  it('should handle grouped fields', () => {
    interface TestForm {
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
          sort: 2,
        },
        contact: {
          id: 'contact',
          label: '联系方式',
          sort: 1,
        },
      },
    })

    expect(form.groupList).toHaveLength(2)
    expect(form.groupList[0]!.id).toBe('basic')
    expect(form.groupList[1]!.id).toBe('contact')
    expect(form.groupList[0]!.fields!.name!.fieldPath).toBe('name')
    expect(form.groupList[1]!.fields!.address!.fieldPath).toBe('address')
  })

  // 数组字段测试
  it('should handle array fields', () => {
    interface TestForm {
      hobbies: Array<{ name: string, level: number }>
    }

    const form = defineSharedForm<TestForm, never, BaseFieldType>({
      fields: {
        hobbies: {
          name: 'hobbies',
          label: '爱好',
          type: 'array',
          schema: z.array(z.object({ name: z.string(), level: z.number() })),
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
    expect(Object.keys(form.groupList[0]!.fields!.hobbies!.arrayFields!)).toHaveLength(2)
    expect(form.groupList[0]!.fields!.hobbies!.arrayFields!.name!.fieldPath).toBe('hobbies[].name')
    expect(form.groupList[0]!.fields!.hobbies!.arrayFields!.level!.fieldPath).toBe('hobbies[].level')
  })

  // 级联字段测试
  it('should handle cascade fields', () => {
    interface TestForm {
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
    expect(form.groupList[0]!.fields!.user!.cascadeFields!.name!.fieldPath).toBe('user.name')
    expect(form.groupList[0]!.fields!.user!.cascadeFields!.age!.fieldPath).toBe('user.age')
  })

  // 自定义配置测试
  it('should handle custom identify and groupDefaultId', () => {
    interface TestForm {
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
    expect(form.groupList[0]!.fields!.name!.fieldPath).toBe('name')
  })

  // 添加自定义 gridArea 的测试
  it('should handle custom gridArea', () => {
    interface TestForm {
      email: string
    }

    const form = defineSharedForm<TestForm, never, BaseFieldType>({
      fields: {
        email: {
          name: 'email',
          label: '邮箱',
          type: 'text',
          schema: z.string(),
        },
      },
    })

    expect(form.groupList[0]!.fields!.email!.fieldPath).toBe('email')
  })

  // 嵌套级联字段测试
  it('should handle nested cascade fields', () => {
    interface TestForm {
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
          cascadeFields: {
            info: {
              name: 'info',
              label: '基本信息',
              type: 'object',
              schema: z.object({ name: z.string(), address: z.string() }),
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
    expect(companyField.cascadeFields!.contact!.cascadeFields!.email!.fieldPath).toBe('company.contact.email')
  })

  // 多层级数组字段测试
  it('should handle nested array fields', () => {
    interface TestForm {
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
    expect(deptField.arrayFields!.employees!.arrayFields!.name!.fieldPath).toBe('departments[].employees[].name')
    expect(deptField.arrayFields!.employees!.arrayFields!.role!.fieldPath).toBe('departments[].employees[].role')
  })

  // 混合嵌套测试
  it('should handle mixed nested fields (cascade + array)', () => {
    interface TestForm {
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
    const branchField = orgField.cascadeFields!.branches!
    expect(branchField.arrayFields!.location!.fieldPath).toBe('organization.branches[].location')
    const teamField = branchField.arrayFields!.teams!
    expect(teamField.arrayFields!.name!.fieldPath).toBe('organization.branches[].teams[].name')
  })

  // Select类型和额外选项测试
  it('should handle select type with options in extra', () => {
    interface TestForm {
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
