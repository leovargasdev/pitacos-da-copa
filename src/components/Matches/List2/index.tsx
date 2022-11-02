import { useSession } from 'next-auth/react'

import { Match } from 'types'
import { MatchInfo } from './MatchInfo'
import { MatchTeams } from './MatchTeams'

import styles from './styles.module.scss'
interface PageProps {
  matches: Match[]
  seletedType: string
}

export const ListMatches = ({ matches, seletedType }: PageProps) => {
  const { status } = useSession()

  return (
    <section className={styles.matches}>
      {matches.map(
        match =>
          (!seletedType || match.type === seletedType) && (
            <article key={match._id} className={styles.match}>
              <MatchInfo {...match} />

              <MatchTeams {...match} isAuth={status === 'authenticated'} />
            </article>
          )
      )}
    </section>
  )
}
