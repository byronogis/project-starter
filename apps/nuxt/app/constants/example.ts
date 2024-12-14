/**
 * 文件上传处理
 */
export const exampleFileUploadProcessCST: PrimoFormFieldFileUploadProcess = async (
  cxt,
  { signal },
) => {
  return await new Promise((resolve, _reject) => {
    console.log('exampleFileUploadProcessCST', cxt, signal)
    const url = URL.createObjectURL(cxt[1])

    resolve({
      url,
    })
  })
}

/**
 * 表单字段信息
 */
export const exampleFormFieldsInfoCST: ExampleFormFieldInfo = {
  id: {
    name: 'id',
    label: 'ID',
    type: 'text',
    schema: (z.string().trim().optional()),
    disable: true,
    groupId: 'basic',
  },
  name: {
    name: 'name',
    label: '姓名',
    type: 'text',
    schema: (z.string().trim().min(2).max(20)),
    initialValue: 'Anon',
    placeholder: '请输入姓名',
    groupId: 'basic',
  },
  description: {
    name: 'description',
    label: '描述',
    type: 'textarea',
    schema: (z.string().max(500)),
    placeholder: '请输入描述信息',
    extra: {
      props: {
        rows: 4,
        maxlength: 500,
        showCount: true,
      },
    },
    groupId: 'profile',
  },
  avatar: {
    name: 'avatar',
    label: '头像',
    type: 'image',
    schema: (z.string().trim()),
    extra: {
      fileUploadProcess: exampleFileUploadProcessCST,
      uploaderProps: {
        allowMultiple: false,
        acceptedFileTypes: ['image/*'],
        maxFileSize: '5MB',
      },
    },
    groupId: 'basic',
  },
  tags: {
    name: 'tags',
    label: '标签',
    type: 'multi-select',
    schema: (z.array(z.string()).min(1)),
    initialValue: [],
    extra: {
      options: [
        { label: '前端', value: 'frontend' },
        { label: '后端', value: 'backend' },
        { label: '设计', value: 'design' },
        { label: '运维', value: 'ops' },
      ],
    },
    groupId: 'profile',
  },
  birthday: {
    name: 'birthday',
    label: '生日',
    type: 'datetime',
    schema: (z.number()), // 应该使用 number 而不是 string，因为日期选择器返回时间戳
    extra: {
      props: {
        dateFormat: 'yy-mm-dd',
        showTime: false,
      },
    },
    groupId: 'profile',
  },
  score: {
    name: 'score',
    label: '评分',
    type: 'slider',
    schema: (z.number().min(0).max(100)),
    initialValue: 60,
    extra: {
      props: {
        min: 0,
        max: 100,
        step: 1,
        showTooltip: true,
      },
    },
    groupId: 'profile',
  },
  settings: {
    name: 'settings',
    label: '设置',
    type: '_cascade',
    schema: (z.object({
      theme: z.string(),
      notifications: z.boolean(),
    })),
    isCascade: true,
    cascadeFields: {
      theme: {
        name: 'theme',
        label: '主题',
        type: 'select',
        schema: (z.string()),
        initialValue: 'light',
        extra: {
          options: [
            { label: '明亮', value: 'light' },
            { label: '暗黑', value: 'dark' },
            { label: '系统', value: 'system' },
          ],
        },
      },
      notifications: {
        name: 'notifications',
        label: '通知',
        type: 'select', // 应该改为更合适的类型，比如新增一个 'switch' 类型
        schema: (z.boolean()),
        initialValue: true,
        extra: {
          props: {
            type: 'switch',
          },
        },
      },
    },
    groupId: 'settings',
  },
  contacts: {
    name: 'contacts',
    label: '联系方式',
    groupId: 'contacts',
    type: '_array',
    schema: (z.array(z.object({
      email: z.string().email('请输入有效的邮箱地址'),
      phone: z.string().regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码'),
      website: z.string().url('请输入有效的网址'),
    }))),
    isArray: true,
    arrayFields: {
      email: {
        name: 'email',
        label: '邮箱',
        type: 'text',
        schema: (z.string().email('请输入有效的邮箱地址')),
        placeholder: 'example@domain.com',
      },
      phone: {
        name: 'phone',
        label: '电话',
        type: 'text',
        schema: (z.string().regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码')),
        placeholder: '请输入手机号',
      },
      website: {
        name: 'website',
        label: '网站',
        type: 'text',
        schema: (z.string().url('请输入有效的网址')),
        placeholder: 'https://example.com',
      },
    },
  },
}
