import teams from 'data/teams.json'

export type TeamId = keyof typeof teams

export interface Team {
  id: TeamId
  name: string
  image: string
}
