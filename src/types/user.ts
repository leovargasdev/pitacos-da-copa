import { Types } from 'mongoose'

export type UserRole = 'admin' | 'participant'

interface Bet {
  [key: string]: {
    points: number
    scoreTeamA: number
    scoreTeamB: number
  }
}

export interface User {
  _id: Types.ObjectId
  name: string
  description: string
  email: string
  image: string
  role: UserRole
  groups: string[]
  bets: Bet
}
