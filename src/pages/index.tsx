import { GetServerSideProps, NextPage } from 'next'

import teams from 'data/teams.json'
import matchesMock from 'data/matches.json'

import { Match, TeamId } from 'types'
import { BetProvider } from 'hook/useBet'
import { GridMatches, ListMatches } from 'components/Matches'
import { SEO } from 'components/SEO'

interface PageProps {
  matches: Match[]
}

const HomePage: NextPage<PageProps> = ({ matches }) => (
  <BetProvider>
    <SEO
      tabName="Página inicial"
      title="Pitacos da copa 2022"
      description="Quer descobrir quem é o melhor palpiteiro entre os seus amigos, parentes ou colegas da firma? Pitacos da Copa é um prático gerenciador de bolões online."
    />
    <ListMatches matches={matches} />
    <span style={{ height: 100, display: 'block' }} />
    <GridMatches matches={matches} />
  </BetProvider>
)

export const getServerSideProps: GetServerSideProps = async () => {
  const result = matchesMock.map(match => ({
    ...match,
    teamA: {
      score: match.teamA.score,
      ...teams[match.teamA.id as TeamId]
    },
    teamB: {
      score: match.teamB.score,
      ...teams[match.teamB.id as TeamId]
    },
    date: match.date
  }))

  return { props: { matches: result } }
}

export default HomePage
