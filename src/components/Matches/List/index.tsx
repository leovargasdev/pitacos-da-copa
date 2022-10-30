import { isPast } from 'date-fns'
import { useSession } from 'next-auth/react'
import { BsFillBookmarkStarFill, BsFillBookmarkXFill } from 'react-icons/bs'
import { BiMessageSquareAdd } from 'react-icons/bi'

import { Match } from 'types'
import { useBet } from 'hook/useBet'
import { MatchInfo } from './MatchInfo'
import { MatchTeams } from './MatchTeams'

import styles from './styles.module.scss'
interface PageProps {
  matches: Match[]
  seletedType: string
}

export const ListMatches = ({ matches, seletedType }: PageProps) => {
  const { handleOpenBet } = useBet()
  const { status, data } = useSession()

  const isDisableBet = (matchDate: string): boolean => {
    return isPast(new Date(matchDate)) || status !== 'authenticated'
  }

  return (
    <section className={styles.matches}>
      {matches.map(
        match =>
          (!seletedType || match.type === seletedType) && (
            <article key={match._id} className={styles.match}>
              <MatchInfo {...match} />

              <MatchTeams {...match} />

              {match.status === 'active' && !isPast(new Date(match.date)) && (
                <>
                  <div className={styles.bet__button}>
                    {match.isBet ? (
                      <small title="Pitaco salvo">
                        <BsFillBookmarkStarFill size={12} /> Pitaco salvo
                      </small>
                    ) : (
                      <small aria-disabled="true" title={'Partida sem pitaco'}>
                        <BsFillBookmarkXFill size={12} /> Partida sem pitaco
                      </small>
                    )}

                    <button
                      type="button"
                      onClick={() => handleOpenBet(match)}
                      disabled={isDisableBet(match.date)}
                    >
                      {match.isBet ? 'Atualizar' : 'Adicionar'} pitaco
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenBet(match)}
                    className={styles['bet__button-mobile']}
                  >
                    <BiMessageSquareAdd size={32} />
                  </button>
                </>
              )}

              {match.status === 'finished' && (
                <div className={styles.match__resume}>
                  <p
                    className={styles.bet__points}
                    title="Total de pontos marcados no palpite"
                  >
                    <strong>{data?.user.bets[match._id]?.points || 0}</strong>
                    <small>pontos</small>
                  </p>

                  <div>
                    <strong>Resultado</strong>
                    <p>
                      <span>{match.result.scoreTeamA}</span>
                      vs
                      <span>{match.result.scoreTeamB}</span>
                    </p>
                  </div>
                </div>
              )}
            </article>
          )
      )}
    </section>
  )
}
