import { Bet, Match, Winner } from 'types'

export const calculetePoints = (bet: Bet, match: Match): number => {
  let points = 0

  if (bet.winnerTeam === match.winnerTeam) {
    points += 3
  }

  if (bet.scoreTeamA === match.teamA.score) {
    points += 5
  }

  if (bet.scoreTeamB === match.teamB.score) {
    points += 5
  }

  return points
}

export const getWinner = (scoreTeamA: number, scoreTeamB: number): Winner => {
  if (scoreTeamA > scoreTeamB) {
    return 'teamA'
  } else if (scoreTeamA < scoreTeamB) {
    return 'teamB'
  }

  return 'draw'
}
