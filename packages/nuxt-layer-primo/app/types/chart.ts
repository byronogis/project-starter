export type PrimoChartType =
  | 'pie'
  | 'bar'
  | 'line'
  | 'polarArea'
  | 'radar'

export interface PrimoChartGeneratorOptions {
  textColor: string
  textColorSecondary: string
  surfaceBorderColor: string
}
