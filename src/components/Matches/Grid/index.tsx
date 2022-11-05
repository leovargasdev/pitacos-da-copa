import { IoMdFootball } from 'react-icons/io'
import { CardTeam } from 'components/CardTeam'

import { Match } from 'types'
import styles from './styles.module.scss'
import { formatDate } from 'utils/format/date'

interface PageProps {
  matches: Match[]
}

export const GridMatches = ({ matches }: PageProps) => (
  <section className={styles.matchs}>
    {matches.map(match => (
      <article key={match._id} className={styles.match}>
        <header className={styles.match__header}>
          <div>
            <span>{match.type}</span>
            <time dateTime={new Date(match.date).toISOString()}>
              {formatDate(match.date, 'normal')}
            </time>
          </div>

          <button className={styles.bet} onClick={() => console.log(match)}>
            <IoMdFootball />
            PITACO
          </button>
        </header>

        <div className={styles.match__content}>
          <CardTeam {...match.teamA} isFinished={match.status === 'finished'} />
          <CardTeam {...match.teamB} isFinished={match.status === 'finished'} />
        </div>
      </article>
    ))}
  </section>
)
