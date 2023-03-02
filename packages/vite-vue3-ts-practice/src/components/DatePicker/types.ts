import type { DateModelType } from 'element-plus'

type Trigger = 'click' | 'focus' | 'hover' | 'contextmenu'

type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

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

export type ExtraDateType =
  | 'quarteryear'
  | 'halfyear'
  | 'quarteryearrange'
  | 'halfyearrange'

export type DateType = OriginDateType | ExtraDateType

export type DatePickerPanelType = 'year' | 'halfyear' | 'quarteryear'

// export type ModelValue = number[] | number[][]

export interface DatePickerPanelItem {
  label: string
  year: number
  quarteryear?: number
  quarteryearrange?: number
  halfyear?: number
  halfyearrange?: number
  isToday: boolean
  isCurrent: boolean
  isDisabled?: boolean
}

export interface DatePickerEnhancedProps {
  type: DateType
  modelValue: DateModelType | [DateModelType, DateModelType]
  popperClass?: string
  placeholder?: string

  // range extra
  startPlaceholder?: string
  endPlaceholder?: string
  rangeSeparator?: string
}

export type DatePickerEnhancedPropsRequired = Required<DatePickerEnhancedProps>

// export interface InputProps {
//   // value: string
//   placeholder: string
//   // 'onUpdate:modelValue'?: (value: string) => void

//   // range extra
//   modelValueStart?: string[]
//   placeholderStart?: string
//   modelValueEnd?: string[]
//   placeholderEnd?: string
//   separator?: string
// }

export interface PopoverProps {
  trigger?: Trigger
  placement?: Placement
  hideAfter?: number
  transition?: string
  visible?: boolean
  popperClass?: string
}

// export interface DatePickerProps extends InputProps {
// export interface DatePickerProps extends InputProps, PopoverProps {
//   type: DateType
//   // modelValue: number[] | number[][]
//   modelValue: number[]
// }

// export interface DatePickerProps {
//   popperClass?: string
//   placeholder: string
//   modelValue: DateModelType | DateModelType[]
//   type:
//   | 'quarteryear'
//   | 'halfyear'
//   | 'quarteryearrange'
//   | 'halfyearrange'
// }

// export interface DatePickerRangeProps extends Omit<DatePickerProps, 'modelValue'> {
//   modelValue: number[][]
// }

// 0 第一块面板 1 第二块面板
export type Range = 0 | 1

// export interface Props {
//   type: ExtraDateType
// }
