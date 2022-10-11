export interface Match {
  _id: string
  team_a: string
  team_b: string
  score_team_a: number
  score_team_b: number
  type: string // group-a, group-b, final, semifinal ...
  date: Date
}
