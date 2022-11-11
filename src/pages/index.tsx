import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { GetStaticProps, NextPage } from 'next'

import { Match } from 'types'
import { SEO } from 'components/SEO'
import { getMatches } from 'utils/format/match'
import { FilterTypeMatch } from 'components/Form'
import { GridMatches, ListMatches, ViewControl } from 'components/Matches'

import styles from 'styles/home.module.scss'

interface PageProps {
  matches: Match[]
}

const HomePage: NextPage<PageProps> = ({ matches: matchesDefault }) => {
  const { status, data } = useSession()
  const [seletedType, setSeletedType] = useState<string>('')
  const [matches, setMatches] = useState(matchesDefault)

  useEffect(() => {
    if (status === 'authenticated') {
      const userBets = data.user.bets

      if (userBets && Object.keys(userBets).length > 0) {
        setMatches(
          matchesDefault.map(match => {
            const isBet = userBets[match._id]

            if (isBet) {
              return {
                ...match,
                isBet: true,
                teamA: { ...match.teamA, score: isBet.scoreTeamA },
                teamB: { ...match.teamB, score: isBet.scoreTeamB }
              }
            }

            return match
          })
        )
      }
    }
  }, [status])

  const onFilterType = (type: string): void => {
    setSeletedType(state => (state === type ? '' : type))
  }

  return (
    <>
      <SEO
        tabName="Página inicial"
        title="Pitacos da copa 2022"
        description="Quer descobrir quem é o melhor palpiteiro entre os seus amigos, parentes ou colegas da firma? Faça login na nossa plataforma e comece a palpitar os jogos da copa do mundo de 2022"
      />
      <div className={styles.info}>
        <div className={styles.info__text}>
          <h1>Lista dos jogos</h1>
          <p>Navegue pelos jogos e faça os seus pitacos!</p>
        </div>

        <FilterTypeMatch onFilter={onFilterType} />
        <ViewControl />
      </div>

      <ListMatches matches={matches} seletedType={seletedType} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const matches = await getMatches('detailed')

  return {
    props: { matches },
    revalidate: 60 * 60 * 2
  }
}

export default HomePage
