export type ExampleFormFieldInfo = PrimoFormFields<ExampleItemWithForm, ExampleFormFieldsGroup>

export type ExampleItemWithForm = PrimoFormData<ExampleItem>

export type ExampleFormFieldsGroup =
  | 'basic' // 基础信息
  | 'profile' // 个人资料
  | 'settings' // 系统设置
  | 'contacts' // 联系方式

export interface ExampleItem {
  id: string
  name: string
  avatar: string
  description: string
  tags: string[]
  birthday: number // 应改为 number 类型，因为我们存储的是时间戳
  score: number
  settings: {
    theme: string
    notifications: boolean
  }
  contacts: {
    email: string
    phone: string
    website: string
  }[]
}
