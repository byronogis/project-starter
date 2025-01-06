import type { ChartOptions } from 'chart.js'

export const PrimoChartOptionsGeneratorsCST: {
  [K in PrimoChartType]: (o: PrimoChartGeneratorOptions) => ChartOptions<K>
} = {
  bar: primoChartOptionsBarGenerator,
  pie: primoChartOptionsPieGenerator,
  line: primoChartOptionsLineGenerator,
  polarArea: primoChartOptionsPolarAreaGenerator,
  radar: primoChartOptionsRadarGenerator,
}
