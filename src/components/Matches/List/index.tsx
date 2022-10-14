import Image from 'next/image'
import matches from 'data/matches.json'
import teams from 'data/teams.json'

import styles from './styles.module.scss'

export const ListMatches = () => (
  <section className={styles.matches}>
    {matches.map(match => (
      <article key={match.date} className={styles.match}>
        <time className={styles.match__date}>
          Dom, 12/12
          <br />
          14h30min
        </time>

        <div className={styles.team}>
          <div className={styles.team__image}>
            <Image
              src={teams[match.teamA.id].image}
              layout="fill"
              objectFit="cover"
            />
          </div>

          <strong>{teams[match.teamA.id].name}</strong>
          <span>{match.teamB.score}</span>
        </div>

        <span>VS</span>

        <div className={`${styles.team} ${styles.reverse}`}>
          <div className={styles.team__image}>
            <Image
              src={teams[match.teamB.id].image}
              layout="fill"
              objectFit="cover"
            />
          </div>

          <strong>{teams[match.teamB.id].name}</strong>
          <span>{match.teamB.score}</span>
        </div>

        <div className={styles.box}>
          <button type="button">Salvar pitaco</button>
        </div>
      </article>
    ))}
  </section>
)
