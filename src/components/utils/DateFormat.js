import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'

const locales = { fr }

export function dateFormat({ date, preset, locale, options = {} }) {
  const computedOptions = { ...options }

  if (locale && locales[locale]) {
    computedOptions.locale = locales[locale]
  }

  return format(parseISO(date), preset, computedOptions)
}

export default function DateFormat(props) {
  return dateFormat(props)
}
