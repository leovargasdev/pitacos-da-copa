import { Match } from 'types'
import { formatDate } from 'utils/format/date'
import { MatchTeams } from './MatchTeams'

import styles from './styles.module.scss'

interface BetsUserProps {
  matches: Match[]
}

export const BetsUser = ({ matches }: BetsUserProps) => (
  <section className={styles.matches}>
    {matches.map(match => (
      <article key={match._id} className={styles.match}>
        <header>
          <time>{formatDate(match.date, 'normal')}</time>
          <div className={styles.match__result}>
            Resultado:
            <span>{match.result.scoreTeamA}</span>x
            <span>{match.result.scoreTeamB}</span>
          </div>
        </header>

        <div className={styles.content}>
          <MatchTeams {...match} />
          <span className={styles.bet__points}>
            <b>{match.points}</b>
            pontos
          </span>
        </div>
      </article>
    ))}
  </section>
)
