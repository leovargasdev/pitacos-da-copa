import { Types } from 'mongoose'
import { Winner } from './match'

export interface Bet {
  _id: Types.ObjectId
  user_id: Types.ObjectId
  match_id: Types.ObjectId
  points: number
  scoreTeamA: number
  scoreTeamB: number
  winnerTeam: Winner
  public: boolean
}
