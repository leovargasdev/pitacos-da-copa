import Image from 'next/image'
import { Match } from 'types'

import styles from './styles.module.scss'

export const MatchTeams = (match: Match) => (
  <div className={styles.match__teams}>
    <div className={styles.team}>
      <div className={styles.team__image}>
        <Image
          src={match.teamA.image}
          layout="fill"
          objectFit="cover"
          alt={`Bandeira do time ${match.teamA.name}`}
        />
      </div>

      <strong>{match.teamA.name}</strong>
      <span>{match.teamA.score}</span>
    </div>

    <span className={styles.versus}>X</span>

    <div className={`${styles.team} ${styles.reverse}`}>
      <div className={styles.team__image}>
        <Image
          src={match.teamB.image}
          layout="fill"
          objectFit="cover"
          alt={`Bandeira do time ${match.teamB.name}`}
        />
      </div>

      <strong>{match.teamB.name}</strong>
      <span>{match.teamB.score}</span>
    </div>
  </div>
)
