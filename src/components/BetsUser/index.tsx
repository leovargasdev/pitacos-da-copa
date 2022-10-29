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
            <span>{match.result.scoreTeamA}</span>
            vs
            <span>{match.result.scoreTeamB}</span>
          </div>
          <p>{match.points} pontos</p>
        </header>

        <MatchTeams {...match} />
      </article>
    ))}
  </section>
)
