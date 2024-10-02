/* eslint-disable unused-imports/no-unused-vars */
import type { ChartOptions } from 'chart.js'

/**
 * global (base)
 */
export function sakaiChartOptionsGlobalGenerator(options: SakaiChartGeneratorOptions): ChartOptions {
  const {
    textColor,
    textColorSecondary,
    surfaceBorderColor,
  } = options

  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
  }
}

/**
 * bar
 */
export function sakaiChartOptionsBarGenerator(options: SakaiChartGeneratorOptions): ChartOptions<'bar'> {
  const {
    textColor,
    textColorSecondary,
    surfaceBorderColor,
  } = options

  return {
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorderColor,
        },
        border: {
          display: false,
        },
      },
    },
  }
}

/**
 * pie
 */
export function sakaiChartOptionsPieGenerator(options: SakaiChartGeneratorOptions): ChartOptions<'pie'> {
  const {
    textColor,
    textColorSecondary,
    surfaceBorderColor,
  } = options

  return {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
    },
  }
}

/**
 * line
 */
export function sakaiChartOptionsLineGenerator(options: SakaiChartGeneratorOptions): ChartOptions<'line'> {
  const {
    textColor,
    textColorSecondary,
    surfaceBorderColor,
  } = options

  return {
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorderColor,
        },
        border: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorderColor,
        },
        border: {
          display: false,
        },
      },
    },
  }
}

/**
 * polarArea
 */
export function sakaiChartOptionsPolarAreaGenerator(options: SakaiChartGeneratorOptions): ChartOptions<'polarArea'> {
  const {
    textColor,
    textColorSecondary,
    surfaceBorderColor,
  } = options

  return {
    scales: {
      r: {
        grid: {
          color: surfaceBorderColor,
        },
      },
    },
  }
}

/**
 * radar
 */
export function sakaiChartOptionsRadarGenerator(options: SakaiChartGeneratorOptions): ChartOptions<'radar'> {
  const {
    textColor,
    textColorSecondary,
    surfaceBorderColor,
  } = options

  return {
    scales: {
      r: {
        grid: {
          color: textColorSecondary,
        },
      },
    },
  }
}
