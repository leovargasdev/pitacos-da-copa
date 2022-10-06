interface TeamProps {
  name: string
  image: string
  players: number
}

interface GameProps {
  date: string
  teamA: TeamProps
  teamB: TeamProps
  result: string
}

export const Game = ({ date, teamA, teamB, result }: GameProps) => (
  <li>
    <time>{date}</time>
    <strong>{teamA.name}</strong>X<strong>{teamB.name}</strong>
    <h2>Placar: {result}</h2>
  </li>
)
