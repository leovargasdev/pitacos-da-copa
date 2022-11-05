import { Match } from 'types'
import { formatDate } from 'utils/format/date'

import styles from './styles.module.scss'

export const MatchInfo = (match: Match) => (
  <div className={styles.match__info}>
    <strong>{match.type.replace('-', ' ')}</strong>

    <time>{formatDate(match.date, 'normal')}</time>
  </div>
)
