export type ExampleFormFieldInfo = SakaiFormFieldInfo<ExampleItemWithForm, ExampleFormFieldsGroup>

export type ExampleFormFieldInfoGroupItem = SakaiFormFieldsInfoGroupItem<ExampleItemWithForm, ExampleFormFieldsGroup>

export type ExampleItemWithForm = ExampleItem & SharedFormItem

// export type ExampleFormFieldsInfoWithForm = SharedFormFieldsInfo<
//   ExampleItemWithForm,
//   ExampleFormFieldsGroup
// >
// export type ExampleFormFieldsInfoWithFormGroupItem = SharedFormFieldsInfoGroupItem<
//   ExampleItemWithForm,
//   ExampleFormFieldsGroup
// >

export type ExampleFormFieldsGroup =
  | '_default'
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
