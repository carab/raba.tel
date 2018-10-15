import { format } from 'date-fns'

export default function DateFormat({ date, preset }) {
  return format(date, preset)
}
