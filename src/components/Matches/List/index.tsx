import Image from 'next/image'
import { isPast } from 'date-fns'
import { useSession } from 'next-auth/react'
import { BsCheckCircleFill } from 'react-icons/bs'

import { Match } from 'types'
import { useBet } from 'hook/useBet'
import { formatDate } from 'utils/format/date'

import styles from './styles.module.scss'
interface PageProps {
  matches: Match[]
}

export const ListMatches = ({ matches }: PageProps) => {
  const { handleOpenBet } = useBet()
  const { status, data } = useSession()

  const isDisableBet = (matchDate: string): boolean => {
    if (status !== 'authenticated') {
      return true
    }

    return isPast(new Date(matchDate))
  }

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
            {match.status === 'finished' && (
              <span className={styles.status}>PARTIDA ENCERRADA</span>
            )}

            <div className={styles.team}>
              <div className={styles.team__image}>
                <Image
                  src={match.teamA.image}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <strong>{match.teamA.name}</strong>
              <span>{match.isBet ? match.teamA.score : '2'}</span>
            </div>

            <span className={styles.versus}>VS</span>

            <div className={`${styles.team} ${styles.reverse}`}>
              <div className={styles.team__image}>
                <Image
                  src={match.teamB.image}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <strong>{match.teamB.name}</strong>
              <span>{match.isBet ? match.teamB.score : '5'}</span>
            </div>
          </div>

          {match.status === 'active' ? (
            <>
              <button
                type="button"
                onClick={() => handleOpenBet(match)}
                disabled={isDisableBet(match.date)}
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
            </>
          ) : (
            <div className={styles.match__resume}>
              {data?.user.bets[match._id] && (
                <p
                  className={styles.bet__points}
                  title="Total de pontos marcados no palpite"
                >
                  <strong>{data?.user.bets[match._id].points}</strong>
                  <small>pontos</small>
                </p>
              )}

              <div>
                <strong>Resultado</strong>
                <p>
                  <span>{match.result.scoreTeamA}</span>x
                  <span>{match.result.scoreTeamB}</span>
                </p>
              </div>
            </div>
          )}
        </article>
      ))}
    </section>
  )
}
