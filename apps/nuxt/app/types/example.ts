export type ExampleFormFieldInfo = PrimoFormFields<ExampleItemWithForm, ExampleFormFieldsGroup>

export type ExampleItemWithForm = PrimoFormData<ExampleItem>

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
