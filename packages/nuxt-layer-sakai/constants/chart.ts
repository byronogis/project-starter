import type { ChartOptions } from 'chart.js'

export const SakaiChartOptionsGeneratorsCST: {
  [K in SakaiChartType]: (o: SakaiChartGeneratorOptions) => ChartOptions<K>
} = {
  bar: sakaiChartOptionsBarGenerator,
  pie: sakaiChartOptionsPieGenerator,
  line: sakaiChartOptionsLineGenerator,
  polarArea: sakaiChartOptionsPolarAreaGenerator,
  radar: sakaiChartOptionsRadarGenerator,
}
