import { Types } from 'mongoose'

export type UserRole = 'admin' | 'participant'

interface Bet {
  [key: string]: {
    scoreTeamA: number
    scoreTeamB: number
  }
}

export interface User {
  _id: Types.ObjectId
  name: string
  email: string
  image: string
  role: UserRole
  score: number
  bets: Bet
}
