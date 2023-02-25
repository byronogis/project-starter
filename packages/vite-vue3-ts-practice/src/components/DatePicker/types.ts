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

export type DatePickertType = 'quarteryear' | 'halfyear' | 'quarteryearrange' | 'halfyearrange'
