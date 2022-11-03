import { addHours, isPast } from 'date-fns'
import type { NextApiResponse, NextApiRequest } from 'next'

import { BetModel, connectMongoose, disconnectMongoose } from 'service/mongoose'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
    return
  }

  const { user_id, ...bet } = req.body

  const matchDate = addHours(new Date(bet.match_date), 2)

  if (isPast(matchDate)) {
    return res.status(401).send('The betting period has ended')
  }

  if (!user_id) {
    return res.status(401).send('Unauthorized')
  }

  try {
    let winnerTeam = 'draw'

    if (bet.scoreTeamA > bet.scoreTeamB) winnerTeam = 'teamA'
    else if (bet.scoreTeamA < bet.scoreTeamB) winnerTeam = 'teamB'

    await connectMongoose()

    const newBet = { ...bet, user_id, winnerTeam }

    const isBet = await BetModel.findOneAndUpdate(
      { user_id, match_id: bet.match_id },
      newBet
    )

    if (!isBet) {
      await BetModel.create(newBet)
    }

    await disconnectMongoose()

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.log(err)

    return res.status(500).send('Internal Server Error')
  }
}
