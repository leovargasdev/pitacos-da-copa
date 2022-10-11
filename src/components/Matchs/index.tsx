import { IoMdFootball } from 'react-icons/io'
import { BsFillCalendarFill } from 'react-icons/bs'
import { CardTeam } from 'components/CardTeam'

import matchs from 'data/matchs.json'

import styles from './styles.module.scss'

export const Matchs = () => (
  <section className={styles.matchs}>
    {matchs.map(match => (
      <article key={match.date} className={styles.match}>
        <header className={styles.match__header}>
          <span>Grupo A</span>
          <time>
            <BsFillCalendarFill size={14} /> Dom 15/07 12h00
          </time>
        </header>

        <div className={styles.match__content}>
          <CardTeam {...match.teamA} isFinished={match.status === 'finished'} />
          <CardTeam {...match.teamB} isFinished={match.status === 'finished'} />
        </div>

        <button className={styles.bet}>Dar palpite</button>
      </article>
    ))}
  </section>
)
