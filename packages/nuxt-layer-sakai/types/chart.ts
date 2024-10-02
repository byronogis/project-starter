export type SakaiChartType =
  | 'pie'
  | 'bar'
  | 'line'
  | 'polarArea'
  | 'radar'

export interface SakaiChartGeneratorOptions {
  textColor: string
  textColorSecondary: string
  surfaceBorderColor: string
}
