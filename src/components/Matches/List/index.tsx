import { useSession } from 'next-auth/react'
import { FaHourglassHalf, FaCalendar, FaTrophy } from 'react-icons/fa'

import { Match, Bet } from 'types'
import { MatchInfo } from './MatchInfo'
import { MatchTeams } from './MatchTeams'

import styles from './styles.module.scss'
interface ListMatchesProps {
  matches: Match[]
  seletedType: string
}

interface ItemMatchProps extends Match {
  isAuth: boolean
  bet?: any
}

const ItemMatch = ({ isAuth, ...match }: ItemMatchProps) => (
  <article key={match._id} className={styles.match}>
    <MatchInfo {...match} />

    <MatchTeams {...match} isAuth={isAuth} />
    {match.status === 'finished' && isAuth && (
      <footer>
        <p>Resumo do pitaco:</p>
        <strong>
          {match.bet?.scoreTeamA} <span>X</span> {match.bet?.scoreTeamB}
        </strong>
        <div>
          <strong>+{match.bet?.points} PONTOS</strong>
        </div>
      </footer>
    )}
  </article>
)

export const ListMatches = ({ matches, seletedType }: ListMatchesProps) => {
  const { status, data } = useSession()
  const isAuth = status === 'authenticated'

  const isVisibleMatch = (type: string): boolean => {
    return !seletedType || type === seletedType
  }

  const matchesInProgress = matches.filter(m => m.status === 'progress')
  const matchesFinished = matches.filter(m => m.status === 'finished')

  return (
    <div className={styles.container}>
      {!!matchesInProgress.length && (
        <section>
          <h2>
            <span>
              <FaHourglassHalf size={20} />
            </span>
            JOGOS EM ANDAMENTO
          </h2>
          <div className={styles.matches}>
            {matchesInProgress.map(
              match =>
                isVisibleMatch(match.type) && (
                  <ItemMatch key={match._id} isAuth={isAuth} {...match} />
                )
            )}
          </div>
        </section>
      )}
      <section>
        <h2>
          <span>
            <FaCalendar size={20} />
          </span>
          PRÓXIMOS JOGOS
        </h2>
        <div className={styles.matches}>
          {matches
            .filter(m => m.status === 'active')
            .map(
              match =>
                isVisibleMatch(match.type) && (
                  <ItemMatch key={match._id} isAuth={isAuth} {...match} />
                )
            )}
        </div>
      </section>
      <section>
        <h2>
          <span>
            <FaTrophy size={22} />
          </span>
          JOGOS FINALIZADOS
        </h2>
        {matchesFinished.length ? (
          <div className={styles.matches}>
            {matchesFinished.map(
              match =>
                isVisibleMatch(match.type) && (
                  <ItemMatch
                    key={match._id}
                    isAuth={isAuth}
                    bet={data?.user.bets[match._id]}
                    {...match}
                  />
                )
            )}
          </div>
        ) : (
          <span>No momento não temos jogos finalizados</span>
        )}
      </section>
    </div>
  )
}
