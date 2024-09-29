/**
 * 文件上传处理
 */
export const exampleFileUploadProcessCST: SakaiFormFieldFileUploadProcess = async (
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
export const exampleFormFieldsInfoCST: SakaiFormFieldInfo<
  ExampleItemWithForm,
  ExampleFormFieldsGroup
> = {
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
    extra: {
      fileUploadProcess: exampleFileUploadProcessCST,
    },
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

const exampleFormFieldGroups: ExampleFormFieldsGroup[] = [
  '_default',
  'contacts',
]

// <SakaiFormItem, ExampleFormFieldsGroup>
export const exampleFormFieldsInfoByGroupCST: ExampleFormFieldInfoGroupItem[] = (exampleFormFieldGroups)
  .map((id) => {
    const fields = Object.values(exampleFormFieldsInfoCST)
      .filter(j => (j.group ?? '_default') === id)
      .reduce((acc, cur) => {
        return {
          ...acc,
          [cur.name]: cur,
        }
      }, {})

    const _item = {
      id,
      fields,
      formClass: `fields-group-example-${id}`,
    }

    return _item
  })
