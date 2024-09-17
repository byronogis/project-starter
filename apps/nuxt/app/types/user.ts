export type UserItemWithCrud = UserItem & CrudItem

export type UserFormFieldsInfoWithCrud = CrudFormFieldsInfo<
  UserItemWithCrud,
  UserFormFieldsGroup
>
export type UserFormFieldsInfoWithCrudGroupItem = CrudFormFieldsInfoGroupItem<
  UserItemWithCrud,
  UserFormFieldsGroup
>

export type UserFormFieldsGroup =
  | '_default'
  | 'contacts'

export interface UserItem {
  id: string
  name: string
  avatar: string
  contacts: {
    email: string
    phone: string
    website: string
  } []
}
