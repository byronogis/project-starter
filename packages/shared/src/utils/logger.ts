import {
  consola,
  // createConsola,
} from 'consola/browser'
import { date } from './date'

export const logger = consola.withTag(`${date().format('YYYY-MM-DD HH:mm:ss')}`)
