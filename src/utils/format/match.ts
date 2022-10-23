import {
  connectMongoose,
  disconnectMongoose,
  MatchModel
} from 'service/mongoose'
import { Match, TeamId } from 'types'
import teams from 'data/teams.json'

type TypeList = 'normal' | 'detailed'

export const getMatches = async (typeList: TypeList): Promise<Match[]> => {
  await connectMongoose()
  const matches = await MatchModel.find()
  await disconnectMongoose()

  if (typeList === 'normal') {
    return matches.map(match => ({
      ...match._doc,
      _id: match._id.toString(),
      date: String(match.date)
    }))
  }

  return matches.map(match => ({
    ...match._doc,
    teamA: {
      score: match.teamA.score,
      ...teams[match.teamA.id as TeamId]
    },
    teamB: {
      score: match.teamB.score,
      ...teams[match.teamB.id as TeamId]
    },
    _id: match._id.toString(),
    date: String(match.date)
  }))
}
