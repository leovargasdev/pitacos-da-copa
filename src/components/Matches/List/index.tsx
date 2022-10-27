import { isPast } from 'date-fns'
import { useSession } from 'next-auth/react'
import { BsCheckCircleFill } from 'react-icons/bs'
import { BiMessageSquareAdd } from 'react-icons/bi'

import { Match } from 'types'
import { useBet } from 'hook/useBet'
import { MatchInfo } from './MatchInfo'
import { MatchTeams } from './MatchTeams'

import styles from './styles.module.scss'
interface PageProps {
  matches: Match[]
}

export const ListMatches = ({ matches }: PageProps) => {
  const { handleOpenBet } = useBet()
  const { status, data } = useSession()

  const isDisableBet = (matchDate: string): boolean => {
    return isPast(new Date(matchDate)) || status !== 'authenticated'
  }

  return (
    <section className={styles.matches}>
      {matches.map(match => (
        <article key={match._id} className={styles.match}>
          <MatchInfo {...match} />

          <MatchTeams {...match} />

          {match.status === 'active' && !isPast(new Date(match.date)) && (
            <>
              <button
                type="button"
                onClick={() => handleOpenBet(match)}
                disabled={isDisableBet(match.date)}
                className={styles.bet__button}
              >
                {match.isBet ? 'Atualizar' : 'Adicionar'} pitaco
              </button>

              <button
                type="button"
                onClick={() => handleOpenBet(match)}
                // disabled={isDisableBet(match.date)}
                className={styles['bet__button-mobile']}
              >
                <BiMessageSquareAdd size={32} />
              </button>

              <small
                aria-disabled={!match.isBet}
                className={styles.bet__status}
                title={match.isBet ? 'Pitaco salvo' : 'Ainda não fez o pitaco'}
              >
                <BsCheckCircleFill />
              </small>
            </>
          )}

          {match.status === 'finished' && (
            <div className={styles.match__resume}>
              <p
                className={styles.bet__points}
                title="Total de pontos marcados no palpite"
              >
                <strong>{data?.user.bets[match._id]?.points || 13}</strong>
                <small>pontos</small>
              </p>

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
