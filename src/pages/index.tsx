import { GetServerSideProps, NextPage } from 'next'

import { Match } from 'types'
import { GridMatches, ListMatches } from 'components/Matches'

interface PageProps {
  matchs: Match[]
}

const HomePage: NextPage<PageProps> = ({ matchs }) => (
  <div>
    <ListMatches />
    {/* <span style={{ height: 100, display: 'block' }} />
    <GridMatches /> */}
  </div>
)

export const getServerSideProps: GetServerSideProps = async () => {
  // await connectMongoose()

  // const matchs = await MatchModel.find()

  // const aa = matchs.map(match => ({
  //   ...match._doc,
  //   _id: match._doc._id.toString(),
  //   date: match._doc.date.toString(),
  //   createdAt: match._doc.createdAt.toString(),
  //   updatedAt: match._doc.updatedAt.toString()
  // }))

  return { props: {} }
}

export default HomePage
