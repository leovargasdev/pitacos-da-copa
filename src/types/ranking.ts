import { User } from './'

export interface Ranking {
  _id: string
  points: number
  user: User
}
