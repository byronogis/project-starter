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
  },
  name: {
    name: 'name',
    label: 'Name',
    type: 'text',
    schema: (z.string().trim()),
    initialValue: 'Anon',
  },
  avatar: {
    name: 'avatar',
    label: 'Avatar',
    type: 'image',
    schema: (z.string().trim()),
    extra: {
      fileUploadProcess: exampleFileUploadProcessCST,
    },
  },
  contacts: {
    name: 'contacts',
    label: 'Contacts',
    groupId: 'contacts',
    type: '_array',
    schema: (z.array(z.object({
      email: z.string(),
      phone: z.string(),
      website: z.string(),
    }))),
    isArray: true,
    arrayFields: {
      email: {
        name: 'email',
        label: 'Email',
        type: 'text',
        schema: (z.string()),
        initialValue: 'foo@bar.zag',
      },
      phone: {
        name: 'phone',
        label: 'Phone',
        type: 'text',
        schema: (z.string().max(11)),
      },
      website: {
        name: 'website',
        label: 'Website',
        type: 'text',
        schema: (z.string()),
      },
    },

  },
}
