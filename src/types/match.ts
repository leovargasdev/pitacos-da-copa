export interface Match {
  _id: string
  teamA: {
    id: string
    score: number
  }
  teamB: {
    id: string
    score: number
  }
  type: string
  date: Date
  status: 'active' | 'finished'
}
