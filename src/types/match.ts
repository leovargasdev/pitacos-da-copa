import { Team } from './team'

export type Winner = 'draw' | 'teamA' | 'teamB'
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
  winnerTeam: Winner
  result: {
    scoreTeamA: number
    scoreTeamB: number
  }
}
