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
  user_id?: number
  bet?: any
}

const ItemMatch = ({ isAuth, user_id = 0, ...match }: ItemMatchProps) => (
  <article key={match._id} className={styles.match}>
    <MatchInfo {...match} />

    <MatchTeams {...match} isAuth={isAuth} user={user_id} />
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

  console.log(data?.user.bets)

  return (
    <div className={styles.container}>
      <section>
        <h2>
          <span>
            <FaHourglassHalf size={20} />
          </span>
          JOGOS EM ANDAMENTO:
        </h2>
        <div className={styles.matches}>
          {matches
            .filter(m => m.status === 'progress')
            .map(
              match =>
                isVisibleMatch(match.type) && (
                  <ItemMatch
                    key={match._id}
                    isAuth={isAuth}
                    user_id={Number(data?.user._id)}
                    {...match}
                  />
                )
            )}
        </div>
      </section>
      <section>
        <h2>
          <span>
            <FaCalendar size={20} />
          </span>
          PRÓXIMOS JOGOS:
        </h2>
        <div className={styles.matches}>
          {matches
            .filter(m => m.status === 'active')
            .map(
              match =>
                isVisibleMatch(match.type) && (
                  <ItemMatch
                    key={match._id}
                    isAuth={isAuth}
                    user_id={Number(data?.user._id)}
                    {...match}
                  />
                )
            )}
        </div>
      </section>
      <section>
        <h2>
          <span>
            <FaTrophy size={22} />
          </span>
          JOGOS FINALIZADOS:
        </h2>
        <div className={styles.matches}>
          {matches
            .filter(m => m.status === 'finished')
            .map(
              match =>
                isVisibleMatch(match.type) && (
                  <ItemMatch
                    key={match._id}
                    isAuth={isAuth}
                    user_id={Number(data?.user._id)}
                    bet={data?.user.bets[match._id]}
                    {...match}
                  />
                )
            )}
        </div>
      </section>
    </div>
  )
}
