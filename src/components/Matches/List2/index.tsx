import { useSession } from 'next-auth/react'

import { Match } from 'types'
import { MatchInfo } from './MatchInfo'
import { MatchTeams } from './MatchTeams'

import styles from './styles.module.scss'
interface ListMatchesProps {
  matches: Match[]
  seletedType: string
}

export const ListMatches = ({ matches, seletedType }: ListMatchesProps) => {
  const { status } = useSession()
  const isAuth = status === 'authenticated'

  return (
    <section className={styles.matches}>
      {matches.map(
        match =>
          (!seletedType || match.type === seletedType) && (
            <article key={match._id} className={styles.match}>
              <MatchInfo {...match} />

              <MatchTeams {...match} isAuth={isAuth} />

              {match.status === 'finished' && isAuth && (
                <footer>
                  <p>Resumo do pitaco:</p>
                  <strong>
                    2 <span>VS</span> 2
                  </strong>
                  <div>
                    <strong>+5 PONTOS</strong>
                  </div>
                </footer>
              )}
            </article>
          )
      )}
    </section>
  )
}
