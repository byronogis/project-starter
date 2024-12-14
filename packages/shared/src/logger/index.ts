import {
  consola,
  // createConsola,
} from 'consola'
import { date } from '../date'

export const logger = consola.withTag(`${date().format('YYYY-MM-DD HH:mm:ss')}`)
