import { GetServerSideProps, NextPage } from 'next'
import { useEffect } from 'react'

import { GridMatches, ListMatches } from 'components/Matches'

import { Match, TeamId } from 'types'
import teams from 'data/teams.json'
import matchesMock from 'data/matches.json'
import { Pitaco } from 'components/Pitaco'

interface PageProps {
  matches: Match[]
}

const HomePage: NextPage<PageProps> = ({ matches }) => (
  <div>
    <ListMatches matches={matches} />
    <span style={{ height: 100, display: 'block' }} />
    <GridMatches matches={matches} />

    <Pitaco />
  </div>
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
