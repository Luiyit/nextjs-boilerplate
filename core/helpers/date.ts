import { DateTime } from 'luxon'

export function format(date:string, locale: 'en' | 'es' = "en"): string {
  return DateTime.fromISO(date).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' }, { locale })
}