/**
 * 文件上传处理
 */
export const userFileUploadProcessCST: CrudFormFieldFileUploadProcess = async (
  cxt,
  { signal },
) => {
  return await new Promise((resolve, _reject) => {
    console.log('userFileUploadProcessCST', cxt, signal)
    const url = URL.createObjectURL(cxt[1])

    resolve({
      url,
    })
  })
}

/**
 * 表单字段信息
 */
export const userFormFieldsInfoCST: UserFormFieldsInfoWithCrud = {
  id: {
    name: 'id',
    label: 'ID',
    type: 'text',
    schema: toTypedSchema(z.string().trim().optional()),
    disable: true,
    group: '_default',
  },
  name: {
    name: 'name',
    label: 'Name',
    type: 'text',
    schema: toTypedSchema(z.string().trim()),
    group: '_default',
  },
  avatar: {
    name: 'avatar',
    label: 'Avatar',
    type: 'image',
    schema: toTypedSchema(z.string().trim()),
    group: '_default',
    fileUploadProcess: userFileUploadProcessCST,
  },
  contacts: {
    name: 'contacts',
    label: 'Contacts',
    group: 'contacts',
    schema: toTypedSchema(z.array(z.object({
      email: z.string(),
      phone: z.string(),
      website: z.string(),
    }))),
    fieldArray: true,
    fieldArrayItemFormFieldInfos: {
      email: {
        name: 'email',
        label: 'Email',
        type: 'text',
        schema: toTypedSchema(z.string()),
      },
      phone: {
        name: 'phone',
        label: 'Phone',
        type: 'text',
        schema: toTypedSchema(z.string()),
      },
      website: {
        name: 'website',
        label: 'Website',
        type: 'text',
        schema: toTypedSchema(z.string()),
      },
    },

  },
}

const userFormFieldGroups: UserFormFieldsGroup[] = [
  '_default',
  'contacts',
]

export const userFormFieldsInfoByGroupCST: UserFormFieldsInfoWithCrudGroupItem[] = (userFormFieldGroups)
  .map((title) => {
    const fields = Object.values(userFormFieldsInfoCST)
      .filter(j => (j.group ?? '_default') === title)

    const _item: UserFormFieldsInfoWithCrudGroupItem = {
      title,
      fields,
      formClass: `component-crud-form-fields-group-user-${title}`,
    } as any

    return _item
  })
