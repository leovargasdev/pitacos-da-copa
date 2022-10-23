import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

const dateFnsOptions = {
  locale: ptBR
}

const FORMATS = {
  normal: "EEEEEE dd/MM HH'h'mm"
}

type TypeFormat = keyof typeof FORMATS

export const formatDate = (value: string | Date, type: TypeFormat): string => {
  const date = typeof value === 'string' ? new Date(value) : value

  return format(date, FORMATS[type], dateFnsOptions)
}
