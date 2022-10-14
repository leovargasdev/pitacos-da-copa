import { NextPage } from 'next'

import { GridMatches, ListMatches } from 'components/Matches'

const HomePage: NextPage = () => (
  <div>
    <ListMatches />
    <span style={{ height: 100, display: 'block' }} />
    <GridMatches />
  </div>
)

export default HomePage
