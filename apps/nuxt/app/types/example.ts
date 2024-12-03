export type ExampleFormFieldInfo = SakaiFormFields<ExampleItemWithForm, ExampleFormFieldsGroup>

export type ExampleItemWithForm = SakaiFormData<ExampleItem>

export type ExampleFormFieldsGroup =
  | 'contacts'

export interface ExampleItem {
  id: string
  name: string
  avatar: string
  contacts: {
    email: string
    phone: string
    website: string
  } []
}
