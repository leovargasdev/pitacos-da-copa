import Image from 'next/image'
import { BsCheckCircleFill } from 'react-icons/bs'

import { Match } from 'types'
import { useBet } from 'hook/useBet'
import { formatDate } from 'utils/format/date'

import styles from './styles.module.scss'
import { useSession } from 'next-auth/react'
interface PageProps {
  matches: Match[]
}

export const ListMatches = ({ matches }: PageProps) => {
  const { handleOpenBet } = useBet()
  const { status } = useSession()

  return (
    <section className={styles.matches}>
      {matches.map(match => (
        <article key={match._id} className={styles.match}>
          <div className={styles.match__info}>
            <strong>{match.type.replace('-', ' ')}</strong>

            <time className={styles.match__date}>
              {formatDate(match.date, 'normal')}
            </time>
          </div>

          <div className={styles.match__content}>
            <div className={styles.team}>
              <div className={styles.team__image}>
                <Image
                  src={match.teamA.image}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <strong>{match.teamA.name}</strong>
              <span>{match.teamA.score}</span>
            </div>

            <span>VS</span>

            <div className={`${styles.team} ${styles.reverse}`}>
              <div className={styles.team__image}>
                <Image
                  src={match.teamB.image}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <strong>{match.teamB.name}</strong>
              <span>{match.teamB.score}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleOpenBet(match)}
            disabled={status !== 'authenticated'}
          >
            {match.isBet ? 'Atualizar' : 'Adicionar'} pitaco
          </button>

          <small
            aria-disabled={!match.isBet}
            className={styles.match__bet}
            title={match.isBet ? 'Pitaco salvo' : 'Ainda não fez o pitaco'}
          >
            <BsCheckCircleFill />
          </small>
        </article>
      ))}
    </section>
  )
}
