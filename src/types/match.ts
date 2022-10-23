import { Team } from './team'

interface TeamMatch extends Team {
  score: number
}

export interface Match {
  _id: string
  teamA: TeamMatch
  teamB: TeamMatch
  type: string
  date: string
  status: 'active' | 'finished'
  isBet: boolean
}
