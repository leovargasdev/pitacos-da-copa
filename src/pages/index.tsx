import Image from 'next/image'
import { GetServerSideProps, NextPage } from 'next'
import { HiOutlineClock, HiCalendar } from 'react-icons/hi'

import api from 'service/api'
import { MatchModel, connectMongoose } from 'service/mongoose'

import { Match } from 'types'
import teams from 'data/team.json'
import matchsMock from 'data/matchs.json'
import { Matchs } from 'components/Matchs'

interface PageProps {
  matchs: Match[]
}

const HomePage: NextPage<PageProps> = ({ matchs }) => (
  <div>
    <Matchs />
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

  return {
    props: {
      matchs: matchsMock
    }
  }
}

export default HomePage
