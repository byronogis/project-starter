import {
  consola,
  // createConsola,
} from 'consola'
import { date } from '..'

export function loggerWithTime(formatStr: string = 'yyyy-MM-dd HH:mm:ss') {
  return consola.withTag(`${date.format(new Date(), formatStr)}`)
}

export const logger = consola
