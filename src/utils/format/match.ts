import { isPast } from 'date-fns'

import {
  connectMongoose,
  disconnectMongoose,
  MatchModel
} from 'service/mongoose'
import { Match, TeamId } from 'types'
import teams from 'data/teams.json'

type TypeList = 'normal' | 'detailed'

interface GetInfoProps {
  _doc: any
}

export const getInfoTeams = ({ _doc: match }: GetInfoProps): Match => {
  const date = new Date(match.date)

  const isProgress = isPast(date) && match.status === 'active'

  return {
    ...match,
    teamA: {
      score: match.teamA.score,
      ...teams[match.teamA.id as TeamId]
    },
    teamB: {
      score: match.teamB.score,
      ...teams[match.teamB.id as TeamId]
    },
    result: {
      scoreTeamA: match.teamA.score,
      scoreTeamB: match.teamB.score
    },
    _id: match._id.toString(),
    date: String(match.date),
    isBet: false,
    status: isProgress ? 'progress' : match.status
  }
}

export const getMatches = async (typeList: TypeList): Promise<Match[]> => {
  await connectMongoose()
  const matches = await MatchModel.find(
    {},
    {},
    { sort: { status: 1, date: 1 } }
  )
  await disconnectMongoose()

  if (typeList === 'normal') {
    return matches.map(match => ({
      ...match._doc,
      _id: match._id.toString(),
      date: String(match.date)
    }))
  }

  return matches.map(getInfoTeams)
}
