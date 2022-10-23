import { Match } from 'types'
import Image from 'next/image'
import styles from './styles.module.scss'
import { useBet } from 'hook/useBet'

interface PageProps {
  matches: Match[]
}

export const ListMatches = ({ matches }: PageProps) => {
  const { handleOpenBet } = useBet()

  return (
    <section className={styles.matches}>
      {matches.map(match => (
        <article key={match._id} className={styles.match}>
          <time className={styles.match__date}>
            Dom, 12/12
            <br />
            14h30min
          </time>

          <div className={styles.team}>
            <div className={styles.team__image}>
              <Image src={match.teamA.image} layout="fill" objectFit="cover" />
            </div>

            <strong>{match.teamA.name}</strong>
            <span>{match.teamA.score}</span>
          </div>

          <span>VS</span>

          <div className={`${styles.team} ${styles.reverse}`}>
            <div className={styles.team__image}>
              <Image src={match.teamB.image} layout="fill" objectFit="cover" />
            </div>

            <strong>{match.teamB.name}</strong>
            <span>{match.teamB.score}</span>
          </div>

          <div className={styles.box}>
            <button type="button" onClick={() => handleOpenBet(match)}>
              Meu pitaco
            </button>
          </div>
        </article>
      ))}
    </section>
  )
}
