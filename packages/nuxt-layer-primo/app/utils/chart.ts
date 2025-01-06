/* eslint-disable unused-imports/no-unused-vars */
import type { ChartOptions } from 'chart.js'

/**
 * global (base)
 */
export function primoChartOptionsGlobalGenerator(options: PrimoChartGeneratorOptions): ChartOptions {
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
export function primoChartOptionsBarGenerator(options: PrimoChartGeneratorOptions): ChartOptions<'bar'> {
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
export function primoChartOptionsPieGenerator(options: PrimoChartGeneratorOptions): ChartOptions<'pie'> {
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
export function primoChartOptionsLineGenerator(options: PrimoChartGeneratorOptions): ChartOptions<'line'> {
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
export function primoChartOptionsPolarAreaGenerator(options: PrimoChartGeneratorOptions): ChartOptions<'polarArea'> {
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
export function primoChartOptionsRadarGenerator(options: PrimoChartGeneratorOptions): ChartOptions<'radar'> {
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
