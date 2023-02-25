export interface ViewItem {
  label: string
  year: number
  quarteryear?: number
  quarteryearrange?: number
  halfyear?: number
  halfyearrange?: number
  current: boolean
  active: boolean
  disabled?: boolean
}

export interface InputAttrs {
  modelValue: string | number
  'onUpdate:modelValue'?: (value: string | number) => void
  placeholder: string | number
}

export interface Attrs extends InputAttrs {
  //
}

export type DatePickertType = 'quarteryear' | 'halfyear' | 'quarteryearrange' | 'halfyearrange'

export interface Props {
  type: DatePickertType
}
