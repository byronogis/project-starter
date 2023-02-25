import type { ComputedRef } from 'vue'

export type OriginDateType =
  | 'year'
  | 'month'
  | 'date'
  | 'dates'
  | 'week'
  | 'datetime'
  | 'datetimerange'
  | 'daterange'
  | 'monthrange'

export type DateType = 'halfyear' | 'quarteryear' | 'halfyearrange' | 'quarteryearrange' | Partial<OriginDateType>

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
  modelValue: ComputedRef<string>
  'onUpdate:modelValue'?: (value: string | number) => void
  placeholder: string

  // range extra
  modelValueStart?: ComputedRef<string[]>
  placeholderStart?: string
  modelValueEnd?: ComputedRef<string[]>
  placeholderEnd?: string
  separator?: string
}

export interface Attrs extends InputAttrs {
  //
}

export type DatePickertType = 'quarteryear' | 'halfyear' | 'quarteryearrange' | 'halfyearrange'

export interface Props {
  type: DatePickertType
}
