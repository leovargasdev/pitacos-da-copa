import Image from 'next/image'
import { GetServerSideProps } from 'next'
import {
  BetModel,
  connectMongoose,
  MatchModel,
  UserModel
} from 'service/mongoose'

import { Match, User } from 'types'
import { SEO } from 'components/SEO'
import { BetsUser } from 'components/BetsUser'
import { getInfoTeams } from 'utils/format/match'

import styles from './styles.module.scss'

interface PageProps {
  matches: Match[]
  user: User
  totalPoints: number
}

const UserPublicBets = ({ matches, user, totalPoints }: PageProps) => (
  <div className={styles.container}>
    <SEO
      tabName={`Pitacos do ${user.name}`}
      title={`Veja a lista dos pitacos do usuário ${user.name}`}
    />

    <div className={styles.user}>
      <div className={styles.user__image}>
        <Image
          src={user.image}
          layout="fill"
          objectFit="cover"
          alt={`Imagem de perfil do usuário ${user.name}`}
        />
      </div>
      <strong>{user.name}</strong>
      <p>{totalPoints} PONTOS</p>
    </div>

    <BetsUser matches={matches} />
  </div>
)

interface ParamsProps {
  user_id: string
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let user = null
  const { user_id } = params as unknown as ParamsProps

  await connectMongoose()

  try {
    user = await UserModel.findOne({ _id: user_id })
  } catch (err) {
    console.log(err)
  }

  if (!user) {
    return {
      props: {},
      redirect: {
        destination: '/ranking',
        permanent: false
      }
    }
  }

  const bets = await BetModel.find({
    user_id,
    public: true
  })

  let totalPoints = 0
  const matches = await MatchModel.find({ status: 'finished' })

  const userMatches = bets.map(bet => {
    const matchId = String(bet.match_id)
    let match = matches.find(m => String(m._id) === matchId)
    match = getInfoTeams(match)
    totalPoints += bet.points

    return {
      ...match,
      points: bet.points,
      teamA: { ...match.teamA, score: bet.scoreTeamA },
      teamB: { ...match.teamB, score: bet.scoreTeamB }
    }
  })

  return {
    props: {
      totalPoints,
      matches: userMatches,
      user: {
        name: user.name,
        image: user.image,
        groups: user.groups
      }
    }
  }
}

export default UserPublicBets
