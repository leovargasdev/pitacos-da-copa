import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { GetStaticProps, NextPage } from 'next'

import { Match } from 'types'
import { SEO } from 'components/SEO'
import { BetProvider } from 'hook/useBet'
import { getMatches } from 'utils/format/match'
import { GridMatches, ListMatches } from 'components/Matches'

import styles from 'styles/home.module.scss'

interface PageProps {
  matches: Match[]
}

const HomePage: NextPage<PageProps> = ({ matches: matchesDefault }) => {
  const { data } = useSession()
  const [seletedType, setSeletedType] = useState<string>('')
  const [matches, setMatches] = useState(matchesDefault)

  useEffect(() => {
    const userBets = data?.user.bets

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
  }, [data?.user])

  const updateMatch = (matchUpdate: any) => {
    setMatches(state =>
      state.map(match => {
        if (match._id === matchUpdate.match_id) {
          return {
            ...match,
            isBet: true,
            teamA: { ...match.teamA, score: matchUpdate.scoreTeamA },
            teamB: { ...match.teamB, score: matchUpdate.scoreTeamB }
          }
        }

        return match
      })
    )
  }

  const onFilterType = (type: string): void => {
    setSeletedType(state => (state === type ? '' : type))
  }

  return (
    <BetProvider updateMatch={updateMatch}>
      <SEO
        tabName="Página inicial"
        title="Pitacos da copa 2022"
        description="Quer descobrir quem é o melhor palpiteiro entre os seus amigos, parentes ou colegas da firma? Faça login na nossa plataforma e comece a palpitar os jogos da copa do mundo de 2022"
      />
      <div className={styles.filters}>
        {[
          'grupo-a',
          'grupo-b',
          'grupo-c',
          'grupo-d',
          'grupo-e',
          'grupo-f',
          'grupo-g',
          'grupo-h'
        ].map(type => (
          <button
            key={type}
            type="button"
            onClick={() => onFilterType(type)}
            aria-label={`Botão para filtrar os jogos do tipo ${type.replace(
              '-',
              ' '
            )}`}
            aria-pressed={type === seletedType}
          >
            {type.replace('-', ' ')}
          </button>
        ))}
      </div>
      <ListMatches matches={matches} seletedType={seletedType} />
    </BetProvider>
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
