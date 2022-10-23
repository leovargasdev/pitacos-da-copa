import { Types } from 'mongoose'

export interface Bet {
  _id: Types.ObjectId
  user_id: Types.ObjectId
  match_id: Types.ObjectId
  points: number
  scoreTeamA: number
  scoreTeamB: number
  winnerTeam: string
}
