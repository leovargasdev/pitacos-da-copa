import { GetServerSideProps, NextPage } from 'next'

import { Match } from 'types'
import { SEO } from 'components/SEO'
import { BetProvider } from 'hook/useBet'
import { getMatches } from 'utils/format/match'
import { GridMatches, ListMatches } from 'components/Matches'

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
  const matches = await getMatches('detailed')
  return { props: { matches } }
}

export default HomePage
