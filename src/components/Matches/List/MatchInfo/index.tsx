import { Match } from 'types'
import { isPast } from 'date-fns'
import { formatDate } from 'utils/format/date'

import styles from './styles.module.scss'

export const MatchInfo = (match: Match) => (
  <div className={styles.match__info}>
    <strong>{match.type.replace('-', ' ')}</strong>

    <time>{formatDate(match.date, 'normal')}</time>

    {match.status === 'finished' && <span>PONTUAÇÃO GERADA</span>}

    {match.status === 'active' && isPast(new Date(match.date)) && (
      <span>EM ANDAMENTO</span>
    )}
  </div>
)
